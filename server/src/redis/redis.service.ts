import { ServerConstants } from "../common/constants/server.constants";
import { HttpStatus } from "../common/enum/status";
import AppError from "../common/interface/AppError";
import { v4 as uuidv4 } from "uuid";

import redis from "./redis";
import { Response } from "express";
import { UserSession } from "../common/types/identity";
export class RedisService {
  /**
   * Creates a session in redis. Expiration is 1 hour. Session Id is to be sent back as cookie
   * @param sessionId
   * @param userId
   */
  static async setSession(sessionId: string, userId: string) {
    try {
      await redis.hset(ServerConstants.REDIS.KEY_NAME, sessionId, userId);
      redis.expire(
        ServerConstants.REDIS.KEY_NAME,
        ServerConstants.REDIS.EXPIRATION_IN_SECONDS
      );
    } catch (error) {
      console.warn(`new err`, error);
      throw new AppError(
        "Error setting session",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Retrieve an active session based on sessionId. This will be derived from cookie
   * @param sessionId
   * @returns
   */
  static async getSession(sessionId: string) {
    return await redis.hget(ServerConstants.REDIS.KEY_NAME, sessionId);
  }

  /**
   * Self explanatory
   * @param sessionId
   * @returns
   */
  static async deleteSession(sessionId: string) {
    return await redis.hdel("sessions", sessionId);
  }

  static generateSessionId() {
    return uuidv4();
  }

  static async setAndReturnSession(res: Response, user: UserSession) {
    const sessionId = this.generateSessionId();
    await this.setSession(sessionId, JSON.stringify(user.id)).then(() => {
      res
        .cookie(
          ServerConstants.COOKIE.KEY,
          sessionId,
          ServerConstants.COOKIE.CONFIG
        )
        .status(HttpStatus.OK)
        .json(user);
    });
  }
}
