import { Dayjs } from 'dayjs';
import { Mode } from '../constants/constant';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
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
  _id?: string;
  fullName: string;
  email: string;
  contact: string;
  dob: Date | number | Dayjs;
  photographUrl?: string;
  workingDays: string[];
  startTime: Date | number | Dayjs;
  endTime: Date | number | Dayjs;
  address?: string;
  gender: Gender;
  notes?: string;
  isICUSpecialist?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DialogOptions {
  data?: any;
  mode?: Mode;
  isOpened: boolean;
}
