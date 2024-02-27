import CoreError from "./CoreError";

export default class ExternalError extends CoreError {
  protected name = ExternalError.name;

  constructor(cause: Error) {
    super();

    this.payload = {
      cause: {
        name: cause.name,
        message: cause.message,
        stack: cause.stack, // MAYBE structure case stack
      },
    };
  }
}
