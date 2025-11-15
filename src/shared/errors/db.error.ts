/**
 * Custom error class for database-related errors.
 * Extends the built-in Error class to provide more context.
 */
export class DatabaseError extends Error {
  constructor(message: string) {
    super(`${message}\n`);
    
    Object.setPrototypeOf(this, DatabaseError.prototype);
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DatabaseError);
    }
  }
}
