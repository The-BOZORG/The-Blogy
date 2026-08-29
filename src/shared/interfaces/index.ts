export interface ApiResponseType<T = any> {
  statusCode: number;
  data: T;
  message?: string;
  success: boolean;
}

export interface UserData {
  username: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'USER' | 'AUTHOR';
  status: 'PENDING' | 'VERIFIED';
  isActive: 'ACTIVE' | 'BANNED' | 'MUTE';
}
