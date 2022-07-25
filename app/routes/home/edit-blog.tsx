import { FormField } from '~/components/form-field';
import { useState } from 'react';
import type { ActionFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { requireUserId } from '~/utils/auth.server';
import { createBlog } from '~/utils/blog.server';
import { Modal } from '~/components/modal';

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const form = await request.formData();
  const title = form.get('title');
  const message = form.get('message');

  if (typeof message !== 'string' || typeof title !== 'string') {
    return json({ error: `Invalid Form Data` }, { status: 400 });
  }
  if (!message.length) {
    return json({ error: `Please provide a message.` }, { status: 400 });
  }

  await createBlog(title, message, userId);
  return redirect('/home');
};

const EditBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setFormData((form: any) => ({
      ...form,
      [field]: event.target.value,
    }));
  };

  return (
    <Modal isOpen className="w-2/3 p-10 flex flex-col justify-center">
      <form method="POST">
        <FormField
          htmlFor="title"
          label="Title"
          value={formData.title}
          onChange={(e) => handleInputChange(e, 'title')}
        />
        <FormField
          htmlFor="message"
          label="Message"
          value={formData.message}
          onChange={(e) => handleInputChange(e, 'message')}
        />
        <button
          type="submit"
          className="rounded-xl mt-2 bg-yellow-300 px-3 py-2 text-blue-600 font-semibold transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
        >
          Delete
        </button>
      </form>
    </Modal>
  );
};

export default EditBlog;
