import { Request, Response, NextFunction } from "express";
import { AuthUtilityService } from "../authUtility/auth.utility.service";
import { ServerConstants } from "../common/constants/server.constants";
import AppError from "../common/interface/AppError";
import { HttpStatus } from "../common/enum/status";
import * as identityRepository from "../modules/identity/identity.repository";
export async function tokenValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.headers["authorization"]) {
      const token = req.headers["authorization"].split(" ")[1];
      const decodedToken = await AuthUtilityService.verifyToken(token);

      const isValidUser = await identityRepository.findUserById(
        decodedToken.id
      );

      if (!isValidUser) {
        throw new AppError(
          "Invalid identity presented",
          HttpStatus.UNAUTHORIZED
        );
      }
      req.userId = decodedToken.id;
    } else {
      throw new AppError("No identity presented", HttpStatus.UNAUTHORIZED);
    }

    next();
  } catch (error) {
    next(error);
  }
}
