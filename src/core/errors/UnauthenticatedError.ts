import CoreError from "./CoreError";

export default class UnauthenticatedError extends CoreError {
  protected name = UnauthenticatedError.name;

  constructor(message?: string) {
    super();

    this.message = message;
  }
}
