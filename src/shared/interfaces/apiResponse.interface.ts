export interface ApiResponseType<T = any> {
  statusCode: number;
  data: T;
  message?: string;
  success: boolean;
}
