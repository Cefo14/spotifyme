export class AccessTokenMissingError extends Error {
  constructor(message: string = 'Access token is missing') {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
