import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../common/enum/status";
import AppError from "../common/interface/AppError";
import ErrorResponse from "../common/interface/ErrorResponse";
import pg from "postgres";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from "@prisma/client/runtime/library";

export function errorHandler(
  err:
    | AppError
    | pg.PostgresError
    | PrismaClientKnownRequestError
    | PrismaClientUnknownRequestError
    | PrismaClientInitializationError
    | Error,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) {
  let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  let messages = Array<string>();

  if (err instanceof AppError) {
    console.log("Error - ", err.message);
    if (err.payload) {
      console.log(JSON.stringify(err.payload));
    }
    statusCode = err.statusCode;
    messages.push(err.message);
  } else if (err instanceof pg.PostgresError) {
    console.log(`Database error -`, err);
    messages.push("An error occurred while processing your request.");
  } else if (err instanceof PrismaClientKnownRequestError) {
    console.log(`Database error -`, err);
    messages.push("An error occurred while processing your request.");
  } else if (err instanceof PrismaClientUnknownRequestError) {
    console.log(`Database error -`, err);
    messages.push("An error occurred while processing your request.");
  } else {
    console.log(err);
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    messages.push("An unknown error occurred.");
  }

  res.status(statusCode).json({
    messages,
  });
}
