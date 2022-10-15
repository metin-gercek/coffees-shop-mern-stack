export default class ApiError extends Error {
  constructor(statusCode, message, source) {
    super();
  }
}

export class NotFoundError extends ApiError {
  constructor(message = "Not Found", statusCode = 404, source) {
    super(statusCode, message, source);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = "Forbidden", statusCode = 403, source) {
    super(statusCode, message, source);
  }
}

export class InternalServerError extends ApiError {
  constructor(message = "Internal Server Error", statusCode = 500, source) {
    super(statusCode, message, source);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized Request", statusCode = 401, source) {
    super(statusCode, message, source);
  }
}

export class BadRequestError extends ApiError {
  constructor(message = "Bad Request", statusCode = 400, source) {
    super(statusCode, message, source);
  }
}
