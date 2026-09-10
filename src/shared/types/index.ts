import { UserData } from '../interfaces';

export type SerializeError = {
  message: string;
  statusCode: number;
  details?: unknown;
};

export type UserResponse = Omit<UserData, 'password'>;
