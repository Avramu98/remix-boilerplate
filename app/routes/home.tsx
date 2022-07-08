import type { LoaderFunction } from '@remix-run/node';
import { requireUserId } from '~/utils/auth.server';
import { Layout } from '~/components/layout';

export const loader: LoaderFunction = async ({ request, params }) => {
  await requireUserId(request);
  return null;
};

export default function Home() {
  return (
    <Layout>
      {/* // <Outlet /> */}

      <div className="text-center p-6 bg-gray-300">
        <form action="/logout" method="post">
          <button
            type="submit"
            className="rounded-xl bg-yellow-300 font-semibold text-blue-600 px-3 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
          >
            Sign Out
          </button>
        </form>
      </div>
    </Layout>
  );
}
