import type { LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { requireUserId } from '~/utils/example/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
  const exampleApp = true;
  await requireUserId(request);
  if (exampleApp) return redirect('/example');
  return redirect('/home');
};
