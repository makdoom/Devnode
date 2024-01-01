class ApiError extends Error {
  statusCode: number;
  success: boolean;

  constructor(statusCode: number = 500, message: string) {
    // Calling the base class constructor with the error message
    super(message);

    // Set the prototype explicitly to ensure instanceof works correctly
    Object.setPrototypeOf(this, ApiError.prototype);

    // Set the status code & success
    this.statusCode = statusCode;
    this.success = false;

    // Capture the error stack
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
