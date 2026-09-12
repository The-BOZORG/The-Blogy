import { SerializeError } from '../types';
import { ApiError } from './apiError';
import { StatusCodes } from 'http-status-codes';

//409
export class ConflictError extends ApiError {
  constructor(message: string) {
    super(message, StatusCodes.CONFLICT);
    this.name = 'conflict';
  }

  public serializeError(): SerializeError {
    return {
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}
