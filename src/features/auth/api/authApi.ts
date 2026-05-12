import { apiRequest } from '../../../shared/api/apiClient';
import type { AuthUser } from '../stores/authStore';

export type LoginRequest = {
  phoneNumber: string;
  password: string;
};

export type SignupRequest = {
  name: string;
  phoneNumber: string;
  password: string;
};

export type AuthSession = {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
};

export function login(payload: LoginRequest, signal?: AbortSignal) {
  return apiRequest<AuthSession>('/auth/login', {
    method: 'POST',
    body: payload,
    signal,
  });
}

export function signup(payload: SignupRequest, signal?: AbortSignal) {
  return apiRequest<void>('/auth/signup', {
    method: 'POST',
    body: payload,
    signal,
  });
}
