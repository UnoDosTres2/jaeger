import CoreError from "./CoreError";

// FIXME Get rid off of this vague error, instead use specific one

export default class InternalError extends CoreError {
  protected name = InternalError.name;

  constructor(cause: string | Error) {
    super();

    this.payload = {
      cause:
        typeof cause == "string"
          ? cause
          : {
              name: cause.name,
              message: cause.message,
              stack: cause.stack, // MAYBE structure case stack
            },
    };
  }
}
