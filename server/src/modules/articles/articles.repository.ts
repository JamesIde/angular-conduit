import { PrismaClient } from "@prisma/client";
import { CreateArticle } from "../../common/types/article";

const prisma = new PrismaClient();
export async function retrieveAllArticles() {
  return await prisma.articles.findMany({
    include: {
      author: true,
    },
  });
}

export async function retrieveArticleBySlug(slug: string) {
  return await prisma.articles.findFirst({
    where: {
      slug,
    },
    include: {
      author: true,
    },
  });
}

export async function createArticle(article: CreateArticle) {
  return await prisma.articles.create({
    data: {
      title: article.title,
      description: article.description,
      body: article.body,
      slug: article.slug,
      tags: article.tags,
      authorId: article.authorId,
    },
  });
}
