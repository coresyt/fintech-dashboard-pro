/**
 * Custom error class for jwt-related errors.
 * Extends the built-in Error class to provide more context.
 */
export class JwtError extends Error {
  constructor(message: string) {
    super(`${message}\n`);
    
    Object.setPrototypeOf(this, JwtError.prototype);
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, JwtError);
    }
  }
}