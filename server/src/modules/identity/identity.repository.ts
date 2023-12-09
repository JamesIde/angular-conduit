import { PrismaClient, User } from "@prisma/client";
import { UserSession } from "../../common/types/identity";

const prisma = new PrismaClient();

export async function createUser(user: any): Promise<UserSession> {
  return await prisma.user.create({
    data: {
      email: user.email,
      username: user.username,
      name: user.name,
      Credentials: {
        create: {
          password: user.password,
        },
      },
    },
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      bio: true,
      createdAt: true,
      image: true,
    },
  });
}

export async function findUserByEmail(email: string) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  return user ? true : false;
}

export async function findUserByUsername(username: string) {
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });
  return user ? true : false;
}

export async function findUserById(id: string) {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });
  return user ? true : false;
}

export async function retrieveUserByEmail(email: string): Promise<UserSession> {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      bio: true,
      createdAt: true,
      image: true,
    },
  });
  return user;
}

export async function retrieveUserPasswordByEmail(email: string) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
    select: {
      Credentials: {
        select: {
          password: true,
        },
      },
    },
  });
  return user;
}

export async function updateProfilePicture(userId: string, imageUrl: string) {
  return await prisma.user.update({
    data: {
      image: imageUrl,
    },
    where: {
      id: userId,
    },
  });
}

export async function updateUserBio(userId: string, bio: string) {
  return await prisma.user.update({
    data: {
      bio,
    },
    where: {
      id: userId,
    },
  });
}
