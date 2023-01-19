import { Practitioner, User } from './interfaces';

export interface AuthState {
  user: User | null;
  accessToken: string;
  isLoading: boolean;
}

export interface PractitionerState {
  practitioners: Practitioner[];
  isLoading: boolean;
}
