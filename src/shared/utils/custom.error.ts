export class CustomError extends Error {
  public readonly statusCode: number;

  private constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }

  static badRequest(message: string) {
    return new CustomError(message, 400);
  }

  static unauthorized(message: string) {
    return new CustomError(message, 401);
  }

  static notFound(message: string) {
    return new CustomError(message, 404);
  }

  static internal(message: string) {
    return new CustomError(message, 500);
  }
}
