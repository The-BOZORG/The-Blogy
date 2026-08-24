import { SerializeError } from '@/shared/types/serializeError';
import { ApiError } from './apiError';
import { StatusCodes } from 'http-status-codes';

//409
export class ConflictError extends ApiError {
  constructor(message: string, details?: any) {
    super(message, StatusCodes.CONFLICT, details);
    this.name = 'conflict';
  }

  public serializeError(): SerializeError {
    return {
      message: this.message,
      statusCode: this.statusCode,
      details: this.details,
    };
  }
}
