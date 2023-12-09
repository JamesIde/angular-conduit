import express from "express";

import identityRouter from "./modules/identity/identity.router";
import articleRouter from "./modules/articles/articles.router";

import { ServerConfig } from "./config/server.config";
import { errorHandler } from "./middlewares/errorHandler";

import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { notFound } from "./middlewares/notFound";
import { sessionValidator } from "./middlewares/sessionValidator";
import { ServerConstants } from "./common/constants/server.constants";
const app = express();

app.use(helmet());
app.use(cookieParser());

app.use(rateLimit(ServerConfig.RATE_LIMITER));
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
    exposedHeaders: "Set-Cookie",
  })
);

app.use(ServerConfig.ROUTER_V1_PREFIX("identity"), identityRouter);
app.use(ServerConfig.ROUTER_V1_PREFIX("articles"), articleRouter);
app.use(errorHandler);
app.use(notFound);

export default app;
