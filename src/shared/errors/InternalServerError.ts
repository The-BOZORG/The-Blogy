import { SerializeError } from '../types/serializeError';
import { ApiError } from './apiError';
import { StatusCodes } from 'http-status-codes';

//500
export class InternalServerError extends ApiError {
  constructor(message: string, details?: any) {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR, details);
    this.name = 'internal-server-error';
  }

  public serializeError(): SerializeError {
    return {
      message: this.message,
      statusCode: this.statusCode,
      details: this.details,
    };
  }
}
