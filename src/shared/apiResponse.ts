import { ApiResponseType } from '@/shared/interfaces/apiResponse.interface';

export function ApiResponse<T>(
  statusCode: number,
  data: T,
  message = 'Success',
): ApiResponseType<T> {
  return {
    statusCode,
    data,
    message,
    success: statusCode < 400,
  };
}
