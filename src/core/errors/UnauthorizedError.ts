import CoreError from "./CoreError";

export default class UnauthorizedError extends CoreError {
  protected name = UnauthorizedError.name;

  constructor(message?: string) {
    super();

    this.message = message;
  }
}
