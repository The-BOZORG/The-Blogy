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

/* 

return res.status(200).json(
  ApiResponse(200, user, 'User fetched successfully'),
);

*/
