export enum Gender {
  MALE = 'male',
  FEMAILE = 'female',
  OTHER = 'other',
}

export interface User {
  name: string;
  email: string;
}

export interface SignUpPayload extends User {
  password: string;
  rePassword: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface Practitioner {
  fullName: string;
  email: string;
  contact: string;
  dob: Date;
  photographUrl?: string;
  workingDays: string[];
  startTime: Date;
  endTime: Date;
  address?: string;
  gender: Gender;
  notes?: string;
  isICUSpecialist?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
