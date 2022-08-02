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

export const editBlog = async (blogId: string, title?: string, message?: string) => {
  await prisma.blog.update({
    data: {
      title,
      message,
    },
    where: {
      id: blogId,
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

export const getBlogById = async (blogId: string) =>
  await prisma.blog.findUnique({
    where: {
      id: blogId,
    },
  });

export const deleteBlog = async (blogId: string) => {
  await prisma.blog.delete({
    where: {
      id: blogId,
    },
  });
};
