import { Request, Response, NextFunction } from "express";
import { RedisService } from "../redis/redis.service";
import { ServerConstants } from "../common/constants/server.constants";
import AppError from "../common/interface/AppError";
import { HttpStatus } from "../common/enum/status";

export async function sessionValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.cookies[ServerConstants.COOKIE.KEY]) {
      throw new AppError("No identity presented", HttpStatus.UNAUTHORIZED);
    }
    const sessionId = req.cookies[ServerConstants.COOKIE.KEY];
    const session = await RedisService.getSession(sessionId);

    if (!session) {
      throw new AppError("Invalid identity presented", HttpStatus.UNAUTHORIZED);
    }
    req.userId = JSON.parse(session);

    next();
  } catch (error) {
    next(error);
  }
}
