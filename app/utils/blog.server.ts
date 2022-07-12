import { prisma } from '~/utils/prisma.server';

export const createBlog = async (title: string, message: string, userId: string) => {
  await prisma.blog.create({
    data: {
      title,
      message,
      author: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export const getRecentBlogs = async () =>
  await prisma.blog.findMany({
    take: 10,
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      title: true,
      message: true,
      author: {
        select: {
          profile: true,
        },
      },
    },
  });
