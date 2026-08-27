import { SerializeError } from '../types';
import { ApiError } from './apiError';
import { StatusCodes } from 'http-status-codes';

//404
export class NotFoundError extends ApiError {
  constructor(message: string, details?: any) {
    super(message, StatusCodes.NOT_FOUND, details);
    this.name = 'notFound';
  }

  public serializeError(): SerializeError {
    return {
      message: this.message,
      statusCode: this.statusCode,
      details: this.details,
    };
  }
}
