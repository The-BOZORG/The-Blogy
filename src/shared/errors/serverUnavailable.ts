import { SerializeError } from '@/shared/types/serializeError';
import { ApiError } from './apiError';
import { StatusCodes } from 'http-status-codes';

//503
export class ServiceUnavailableError extends ApiError {
  constructor(message: string, details?: any) {
    super(message, StatusCodes.SERVICE_UNAVAILABLE, details);
    this.name = 'BadRequest';
  }

  public serializeError(): SerializeError {
    return {
      message: this.message,
      statusCode: this.statusCode,
      details: this.details,
    };
  }
}
