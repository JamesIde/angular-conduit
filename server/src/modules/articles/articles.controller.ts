import { Request, Response, NextFunction } from "express";
import * as articlesRepository from "./articles.repository";
import { HttpStatus } from "../../common/enum/status";
import { CreateArticle } from "../../common/types/article";
import AppError from "../../common/interface/AppError";
export async function retrieveArticles(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Eventually this will be quite a big endpoint as the UI will pass query params that will fetch different
    // articles based on the query params. For now, we will just return all articles
    const articles = await articlesRepository.retrieveAllArticles();
    console.log(articles);
    res.status(HttpStatus.OK).json(articles);
  } catch (error) {
    next(error);
  }
}

export async function createArticle(
  req: Request<{}, {}, CreateArticle>,
  res: Response,
  next: NextFunction
) {
  try {
    const article = {
      ...req.body,
      authorId: req.userId,
    } as CreateArticle;

    const newArticle = await articlesRepository.createArticle(req.body);

    if (!newArticle) {
      console.warn(`An error occured creating article for ${req.userId}`);
      throw new AppError(
        "An error occured creating article for ${req.userId}",
        HttpStatus.INTERNAL_SERVER_ERROR,
        req.body
      );
    }

    res.status(HttpStatus.CREATED);
  } catch (error) {
    next(error);
  }
}
