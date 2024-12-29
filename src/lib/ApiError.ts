class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(
    statusCode: number,
    message: string,
    isOperational = true,
    stack = ''
  ) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Capture stack trace if not provided
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }

    // Set the name of the error as the class name (optional but useful for debugging)
    this.name = this.constructor.name;
  }
}

export default ApiError;
