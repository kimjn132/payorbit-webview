import { Navigate, createRoute } from '@tanstack/react-router';

import { rootRoute } from './root.route';

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <Navigate to="/auth/login" replace />,
});
