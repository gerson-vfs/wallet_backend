export class UserAlreadyExistsError extends Error {
  constructor() {
    super('Account already exists');
  }
}
