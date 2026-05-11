import { createRouter } from '@tanstack/react-router';

import { rootRoute } from '../routes/root.route';
import { authRoute } from '../routes/auth/auth.route';
import { loginRoute } from '../routes/auth/login.route';
import { signupRoute } from '../routes/auth/signup.route';
import { homeRoute } from '../routes/home/home.route';
import { indexRoute } from '../routes/index.route';

const routeTree = rootRoute.addChildren([
  indexRoute,
  homeRoute,
  authRoute.addChildren([loginRoute, signupRoute]),
]);

export const router = createRouter({
  routeTree,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
