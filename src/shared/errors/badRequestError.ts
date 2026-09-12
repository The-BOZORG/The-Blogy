import { SerializeError } from '../types';
import { ApiError } from './apiError';
import { StatusCodes } from 'http-status-codes';

//400
export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
    this.name = 'bad-request';
  }

  public serializeError(): SerializeError {
    return {
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}
