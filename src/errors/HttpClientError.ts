export class HttpClientError extends Error {
  public readonly response;

  constructor(message: string, response: Response) {
    super(message);
    this.name = new.target.name;
    this.response = response;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
