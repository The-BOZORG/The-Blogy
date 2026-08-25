export interface IUser {
  username: string;
  email: string;
  password: string | null;
  role: 'ADMIN' | 'USER' | 'AUTHOR';
  status: 'PENDING' | 'VERIFIED';
  isActive: 'ACTIVE' | 'BANNED' | 'MUTE';
}
