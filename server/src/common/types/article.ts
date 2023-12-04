import { Articles } from "@prisma/client";

export type CreateArticle = Omit<
  Articles,
  "id" | "createdAt" | "updatedAt" | "favouriteCount"
> & {
  authorId: string;
};
