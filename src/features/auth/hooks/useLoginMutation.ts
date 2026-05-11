import { useMutation } from '@tanstack/react-query';

import { login } from '../api/authApi';
import type { AuthSession, LoginRequest } from '../api/authApi';
import { useAuthStore } from '../stores/authStore';

export function useLoginMutation() {
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation<AuthSession, Error, LoginRequest>({
    mutationFn: (payload) => login(payload),
    onSuccess: (session) => {
      setSession(session);
    },
  });
}
