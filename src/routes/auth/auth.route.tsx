import { createRoute } from '@tanstack/react-router';

import { AuthLayout } from '../../features/auth/components/AuthLayout';
import { rootRoute } from '../root.route';

export const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'auth',
  component: AuthLayout,
});
