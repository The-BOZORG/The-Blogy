import { UserData } from '../interfaces';

export type RegisterData = {
  username: string;
  email: string;
  password: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type SerializeError = {
  message: string;
  statusCode: number;
  details?: unknown;
};

export type UserResponse = Omit<UserData, 'password'>;
