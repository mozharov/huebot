export class AppError extends Error {
  constructor(
    public override message = 'Internal Server Error',
    public statusCode = 500,
    public code = ErrorCodes.INTERNAL_ERROR,
    public expose = false,
  ) {
    super(message)
    this.name = AppError.name
  }
}

export enum ErrorCodes {
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}
