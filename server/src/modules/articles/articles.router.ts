import { Router } from "express";
import * as articlesController from "./articles.controller";
const router = Router();

router.get("/", articlesController.retrieveArticles);

export default router;
