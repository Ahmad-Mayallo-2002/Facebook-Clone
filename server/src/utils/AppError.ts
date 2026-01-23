class AppError extends Error {
  constructor(
    public msg: string,
    public statusCode: number,
    public error: string,
  ) {
    super(msg);
    this.statusCode = statusCode || 500;
    this.error = error;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export default AppError;