class CustomError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;

    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name;

    // Capture the stack trace (excluding the constructor call)
    Error.captureStackTrace(this, this.constructor);
  }
}
export { CustomError };
