import { SignInPayload, SignUpPayload } from '../interfaces/interfaces';
import { httpWithoutInterceptors } from '../utils/http';

export function refreshAccessToken() {
  return httpWithoutInterceptors.post('/api/auth/refresh');
}

export function signIn(payload: SignInPayload) {
  return httpWithoutInterceptors.post('/api/auth/signin', payload);
}

export function signUp(payload: SignUpPayload) {
  return httpWithoutInterceptors.post('/api/auth/signup', payload);
}
