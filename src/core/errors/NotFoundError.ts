import CoreError from "./CoreError";

export default class NotFoundError extends CoreError {
  protected name = NotFoundError.name;

  constructor(resourceName: string) {
    super();

    this.payload = {
      resourceName,
    };
  }
}
