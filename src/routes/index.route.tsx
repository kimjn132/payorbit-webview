import { Navigate, createRoute } from '@tanstack/react-router';

import { useAuthStore } from '../features/auth/stores/authStore';
import { rootRoute } from './root.route';

function IndexRedirect() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return <Navigate to={isAuthenticated ? '/home' : '/auth/login'} replace />;
}

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: IndexRedirect,
});
