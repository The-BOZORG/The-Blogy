import { SerializeError } from '../types';
import { ApiError } from './apiError';
import { StatusCodes } from 'http-status-codes';

//403
export class AuthorizedError extends ApiError {
  constructor(message: string) {
    super(message, StatusCodes.FORBIDDEN);
    this.name = 'forbidden';
  }

  public serializeError(): SerializeError {
    return {
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}
