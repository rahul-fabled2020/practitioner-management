import { SignInPayload } from '../interfaces/interfaces';
import { httpWithoutInterceptors } from '../utils/http';

export function refreshAccessToken() {
  return httpWithoutInterceptors.post('/api/auth/refresh');
}

export function signIn(payload: SignInPayload) {
  return httpWithoutInterceptors.post('/api/auth/signin', payload);
}
