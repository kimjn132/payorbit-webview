import { useMutation } from '@tanstack/react-query';

import { signup } from '../api/authApi';
import type { SignupRequest } from '../api/authApi';

export function useSignupMutation() {
  return useMutation<void, Error, SignupRequest>({
    mutationFn: (payload) => signup(payload),
  });
}
