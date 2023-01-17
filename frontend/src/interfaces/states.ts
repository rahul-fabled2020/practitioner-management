import { User } from './interfaces';

export interface AuthState {
  user: User | null;
  accessToken: string;
  isLoading: boolean;
}
