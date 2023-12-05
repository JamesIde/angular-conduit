import { User } from "@prisma/client";

export type UserRegistration = Omit<User, "id" | "createdAt" | "updatedAt"> & {
  password: string;
};

export type UserLogin = Pick<User, "email"> & {
  password: string;
};

export type UserSession = Pick<
  User,
  "id" | "bio" | "name" | "username" | "createdAt" | "email" | "image"
>;
