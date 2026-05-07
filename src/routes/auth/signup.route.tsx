import { createRoute } from '@tanstack/react-router';

import { SignupPage } from '../../features/auth/pages/SignupPage';
import { authRoute } from './auth.route';

export const signupRoute = createRoute({
  getParentRoute: () => authRoute,
  path: 'signup',
  component: SignupPage,
});
