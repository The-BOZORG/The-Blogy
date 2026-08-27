export interface ApiResponseType<T = any> {
  statusCode: number;
  data: T;
  message?: string;
  success: boolean;
}

export interface GoogleUserData {
  googleId: string;
  email: string;
  username: string;
}

export interface IUser {
  username: string;
  email: string;
  password: string | null;
  role: 'ADMIN' | 'USER' | 'AUTHOR';
  status: 'PENDING' | 'VERIFIED';
  isActive: 'ACTIVE' | 'BANNED' | 'MUTE';
}

export interface UserData {
  username: string;
  email: string;
  password: string | null;
}

export interface IOtpData {
  email: string;
}
