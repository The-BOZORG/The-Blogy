export class ApiError extends Error {
  public statusCode: number;

  constructor(message: string, status: number) {
    super(message);
    this.statusCode = status;
  }

  public serializeError() {
    throw new Error('this method should be overwritten');
  }
}
