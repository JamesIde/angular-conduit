import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../../common/enum/status";
import { RedisService } from "../../redis/redis.service";
import * as bcrypt from "bcrypt";
import * as identityRepository from "./identity.repository";
import * as fileService from "../files/file.service";
import AppError from "../../common/interface/AppError";
import {
  UserLogin,
  UserRegistration,
  UserSession,
} from "../../common/types/identity";
export async function registerUser(
  req: Request<{}, {}, UserRegistration>,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, name, password, username } = req.body;
    // TODO zod schema validation ignored for now
    if (!email || !name || !password || !username) {
      console.warn("Invalid request body");
      throw new AppError(
        "Error adding user to domain",
        HttpStatus.BAD_REQUEST,
        req.body
      );
    }

    const [emailExists, usernameExists] = await Promise.all([
      identityRepository.findUserByEmail(email),
      identityRepository.findUserByUsername(username),
    ]);

    if (emailExists) {
      console.warn("Email already exists");
      throw new AppError(
        "Error adding user to domain",
        HttpStatus.BAD_REQUEST,
        req.body
      );
    }

    if (usernameExists) {
      console.warn(`Username already exists`);
      throw new AppError(
        "Error adding user to domain",
        HttpStatus.BAD_REQUEST,
        req.body
      );
    }

    const hashPwd = await bcrypt.hash(password, 10);

    const newUser = {
      ...req.body,
      password: hashPwd,
    };
    let user = {} as UserSession;
    user = await identityRepository.createUser(newUser);

    if (!user) {
      console.log(`Couldn't create user`);
      throw new AppError(
        "Error adding user to domain",
        HttpStatus.INTERNAL_SERVER_ERROR,
        req.body
      );
    }

    return RedisService.setAndReturnSession(res, user);
  } catch (error) {
    next(error);
  }
}

export async function loginUser(
  req: Request<{}, {}, UserLogin>,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.warn("Invalid request body on login", req.body);
      throw new AppError(
        "An error occured retrieving user from domain",
        HttpStatus.BAD_REQUEST
      );
    }

    const userPwd = await identityRepository.retrieveUserPasswordByEmail(email);

    if (!userPwd) {
      console.warn("User not found", email);
      throw new AppError(
        "An error occured retrieving user from domain",
        HttpStatus.BAD_REQUEST
      );
    }

    const comparePwd = await bcrypt.compare(
      password,
      userPwd.Credentials[0].password
    );

    if (!comparePwd) {
      console.warn("Password incorrect");
      throw new AppError(
        "An error occured retrieving user from domain",
        HttpStatus.BAD_REQUEST
      );
    }

    const user = await identityRepository.retrieveUserByEmail(email);
    const login = {
      id: user.id,
      email: user.email,
      name: user.name,
      username: user.username,
      bio: user.bio,
      image: user.image,
    } as any;
    return RedisService.setAndReturnSession(res, login);
  } catch (error) {
    next(error);
  }
}

export async function checkEmailExists(
  req: Request<{}, {}, any>,
  res: Response,
  next: NextFunction
) {
  try {
    const { email } = req.body;

    let exists = false;

    if (!email) {
      res.json(200).json({ exists });
    }
    const user = await identityRepository.findUserByEmail(email);

    if (user) {
      exists = true;
    }
    res.status(HttpStatus.OK).json({ exists });
  } catch (error) {
    next(error);
  }
}

export async function checkUsernameExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username } = req.body;

    let exists = false;

    if (!username) {
      res.status(HttpStatus.OK).json({ exists });
    }
    const user = await identityRepository.findUserByUsername(username);

    if (user) {
      exists = true;
    }
    res.status(HttpStatus.OK).json({ exists });
  } catch (error) {
    next(error);
  }
}

export async function uploadProfilePicture(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const file = await fileService.uploadStreamAsync(req.file.buffer);

    if (!file.url || !file.created_at) {
      // Safety net - uploadStreamAsync contains error checking
      throw new AppError(
        `An error occured uploading image ${req.userId}`,
        HttpStatus.BAD_REQUEST
      );
    }
    const updatedUser = await identityRepository.updateProfilePicture(
      req.userId,
      file.url
    );

    if (!updatedUser) {
      throw new AppError(
        `An error occured updating user ${req.userId}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    return res.status(HttpStatus.OK).json({
      image: file.url,
    });
  } catch (error) {
    next(error);
  }
}
