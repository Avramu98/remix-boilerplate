import type { LoaderFunction } from '@remix-run/node';
import { getUser } from '~/utils/auth.server';
import { Layout } from '~/components/layout';
import { Outlet, useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import { getProjects, getTasks } from '~/utils/meisterTask.server';

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await getUser(request);
  const meisterData = await getProjects();
  const meisterTasks = await getTasks(meisterData[1]);
  if (user) {
    return json({ user, meisterTasks });
  }
  return null;
};

const Home = () => {
  const { user, meisterTasks } = useLoaderData();
  const { firstName, lastName } = user.profile;
  console.log(meisterTasks);

  return (
    <Layout>
      <div className="p-6 bg-gray-300 flex md:justify-between lg:justify-between text-center justify-center  content-center flex-wrap items-center gap-3">
        <p>
          Logged in as <br /> {firstName} {lastName}
        </p>

        <form action="/logout" method="post">
          <button
            type="submit"
            className="rounded-xl bg-yellow-300 font-semibold text-blue-600 px-3 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
          >
            Sign Out
          </button>
        </form>
      </div>
      <Outlet />
    </Layout>
  );
};

export default Home;
