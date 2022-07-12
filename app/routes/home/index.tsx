import type { ActionFunction } from '@remix-run/node';
import { requireUserId } from '~/utils/auth.server';
import { getRecentBlogs } from '~/utils/blog.server';
import { json } from '@remix-run/node';
import { useLoaderData, useNavigate } from '@remix-run/react';

export const loader: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const blogs = await getRecentBlogs();
  return json({ userId, blogs });
};

const TestingHome = () => {
  const { blogs } = useLoaderData();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center content-center gap-4">
      <button
        onClick={() => navigate('/home/create-blog')}
        type="submit"
        className="rounded-xl mt-2 bg-yellow-300 px-3 py-2 text-blue-600 font-semibold transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
      >
        Create Blog
      </button>
      {blogs.map((blog: any) => {
        const { title, message, author } = blog;
        return (
          <div
            key={blog.id}
            className="w-full max-w-[80%] rounded-2xl p-5 border flex flex-col gap-4 bg-blue-800 shadow-lg"
          >
            <h1 className="underline text-white">
              {title.charAt(0).toUpperCase() + title.slice(1)}
            </h1>
            <p className="text-white">{message}</p>

            <p className="italic font-bold text-right">
              Created by {author?.profile?.firstName} {author?.profile?.lastName}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default TestingHome;
