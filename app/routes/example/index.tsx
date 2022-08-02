import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { redirect, json } from '@remix-run/node';
import { requireUserId } from '~/utils/example/auth.server';
import { deleteBlog, editBlog, getRecentBlogs } from '~/utils/example/blog.server';
import { Form, useLoaderData, useNavigate } from '@remix-run/react';
import { useState } from 'react';
import { FormField } from '~/components/form-field';

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const blogId = form.get('id');
  const title = form.get('title');
  const action = form.get('_action');

  if (action === 'delete') {
    await deleteBlog(blogId);
    return redirect('/example');
  }

  if (action === 'update') {
    await editBlog(blogId, title);
    return redirect('/example');
  }
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const blogs = await getRecentBlogs();
  return json({ userId, blogs });
};

const TestingHome = () => {
  const { blogs } = useLoaderData();
  const navigate = useNavigate();
  const [showFields, setShowFields] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  return (
    <div className="flex flex-col items-center content-center gap-4">
      <button
        onClick={() => navigate('/example/create-blog')}
        type="submit"
        className="rounded-xl mt-2 bg-yellow-300 px-3 py-2 text-blue-600 font-semibold transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
      >
        Create Blog
      </button>
      {blogs.map((blog: any) => {
        const { title, message, author, id } = blog;
        return (
          <div
            key={id}
            className="w-full max-w-[80%] rounded-2xl p-5 border flex flex-col gap-4 bg-blue-800 shadow-lg"
          >
            <Form
              onSubmit={() => {
                setCurrentBlog(null);
                setShowFields(false);
              }}
              method="post"
            >
              <input type="hidden" name="id" value={id} />
              {!showFields && currentBlog !== id && (
                <h1 className="underline text-white">
                  {title.charAt(0).toUpperCase() + title.slice(1)}
                </h1>
              )}
              {showFields && currentBlog === id && (
                <FormField
                  htmlFor="title"
                  label="Title"
                  defaultValue={title}
                  // onChange={(e) => handleInputChange(e, 'title')}
                />
              )}
              <p className="text-white">{message}</p>
              <p className="italic font-bold text-right">
                Created by {author?.profile?.firstName} {author?.profile?.lastName}
              </p>
              <div className="w-2/3 flex justify-between text-white">
                <button value="delete" name="_action" type="submit">
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentBlog(id);
                    setShowFields((prevState) => !prevState);
                  }}
                >
                  Edit
                </button>
                {showFields && currentBlog === id && (
                  <button value="update" name="_action" type="submit">
                    Confirm
                  </button>
                )}
              </div>
            </Form>
          </div>
        );
      })}
    </div>
  );
};

export default TestingHome;
