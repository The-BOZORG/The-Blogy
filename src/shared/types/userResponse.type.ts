import { IUser } from '../interfaces/IUser.interface';

export type UserResponse = Omit<IUser, 'password'>;
