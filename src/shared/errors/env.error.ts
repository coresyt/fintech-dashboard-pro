/**
 * Custom error class for environment variable-related errors.
 * Extends the built-in Error class to provide more context.
 */
export class EnvError extends Error {
  public envName: string;
  
  constructor(message: string, envName: string) {
    super(`${message}\nEnvironment Variable: ${envName}`);
    
    this.envName = envName;

    Object.setPrototypeOf(this, EnvError.prototype);
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, EnvError);
    }
  }
}