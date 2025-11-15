/**
 * Custom error class for cors-related errors.
 * Extends the built-in Error class to provide more context.
 */
export class CorsError extends Error {
  public origin: string;
  
  constructor(message: string, origin: string) {
    super(`${message}\nEnvironment Variable: ${origin}`);
    
    this.origin = origin;

    Object.setPrototypeOf(this, CorsError.prototype);
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CorsError);
    }
  }
}