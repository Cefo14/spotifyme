export class VerifierCodeMissingError extends Error {
  constructor(message: string = 'Verifier code is missing') {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
