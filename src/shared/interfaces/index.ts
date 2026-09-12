export interface ApiResponseType<T = any> {
  statusCode: number;
  data: T;
  message?: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  sessionId: string;
  username: string;
  email: string;
  role: string;
  isActive: string;
}

export interface UserData {
  username: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'USER' | 'AUTHOR';
  status: 'PENDING' | 'VERIFIED';
  isActive: 'ACTIVE' | 'BANNED' | 'MUTE';
}

export interface UpdateUserData {
  username: string;
  email: string;
}

export interface UpdatePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface CreateBlogData {
  title: string;
  content: string;
  status: 'DRAFT' | 'PUBLISHED';
}

export interface BlogData {
  title: string;
  slug: string;
  content: string;
  banner: string | null;
  status: 'DRAFT' | 'PUBLISHED';
}
