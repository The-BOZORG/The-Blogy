import { IUser } from '../interfaces';

export type LoginData = {
  email: string;
  password: string;
};

export type SerializeError = {
  message: string;
  statusCode: number;
  details?: any;
};

export type UserResponse = Omit<IUser, 'password'>;
