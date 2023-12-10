import { Response } from "express";
import { UserSession } from "../common/types/identity";

import { ServerConfig } from "../config/server.config";
import jsonwebtoken from "jsonwebtoken";
import AppError from "../common/interface/AppError";
import { HttpStatus } from "../common/enum/status";

export class TokenService {
  static async verifyToken(token: string) {
    try {
      const decodedToken = jsonwebtoken.verify(
        token,
        ServerConfig.JWT_SECRET
      ) as UserSession;
      return decodedToken;
    } catch (error) {
      console.warn(`Invalid token presented`);
      throw new AppError(
        "An error occured establishing your identity",
        HttpStatus.UNAUTHORIZED,
        error
      );
    }
  }

  static async setTokenAndReturnUser(res: Response, user: UserSession) {
    const { id, email, username, name } = user;

    try {
      const token = jsonwebtoken.sign(
        { id, email, username, name },
        ServerConfig.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      const response = {
        token,
        user,
      };

      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      throw new AppError(
        "An error occured generating token",
        HttpStatus.INTERNAL_SERVER_ERROR,
        error
      );
    }
  }
}
