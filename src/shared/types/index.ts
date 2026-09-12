import { UserData } from '../interfaces';

export type SerializeError = {
  message: string;
  statusCode: number;
};

export type UserResponse = Omit<UserData, 'password'>;
