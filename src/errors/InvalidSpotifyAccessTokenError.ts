export class InvalidSpotifyAccessTokenError extends Error {
  constructor(message: string = 'Verifier code is missing') {
    super(message);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
