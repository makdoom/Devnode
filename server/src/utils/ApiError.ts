class ApiError extends Error {
  success: boolean;
  statusCode: number;

  constructor(statusCode: number = 500, message: string) {
    // Calling the base class constructor with the error message
    super(message);

    // Set the prototype explicitly to ensure instanceof works correctly
    Object.setPrototypeOf(this, ApiError.prototype);

    // Set the status code & success
    this.success = false;
    this.statusCode = statusCode;

    // Capture the error stack
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
