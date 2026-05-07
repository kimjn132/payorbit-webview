import { createRoute } from '@tanstack/react-router';

import { LoginPage } from '../../features/auth/pages/LoginPage';
import { authRoute } from './auth.route';

export const loginRoute = createRoute({
  getParentRoute: () => authRoute,
  path: 'login',
  component: LoginPage,
});
