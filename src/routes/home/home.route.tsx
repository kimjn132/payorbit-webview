import { createRoute, redirect } from '@tanstack/react-router';

import { HomePage } from '../../features/home/pages/HomePage';
import { useAuthStore } from '../../features/auth/stores/authStore';
import { rootRoute } from '../root.route';

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'home',
  beforeLoad: () => {
    if (!useAuthStore.getState().isAuthenticated) {
      throw redirect({ to: '/auth/login', replace: true });
    }
  },
  component: HomePage,
});
