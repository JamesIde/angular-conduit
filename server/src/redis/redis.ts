import { Redis } from "ioredis";
import { ServerConfig } from "../config/server.config";

const redis = new Redis(ServerConfig.REDIS.URL);

export default redis;
