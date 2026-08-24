import { SerializeError } from '@/shared/types/serializeError';
import { ApiError } from './apiError';
import { StatusCodes } from 'http-status-codes';

//401
export class AuthenticatedError extends ApiError {
  constructor(message: string, details?: any) {
    super(message, StatusCodes.UNAUTHORIZED, details);
    this.name = 'UNAUTHORIZED';
  }

  public serializeError(): SerializeError {
    return {
      message: this.message,
      statusCode: this.statusCode,
      details: this.details,
    };
  }
}
