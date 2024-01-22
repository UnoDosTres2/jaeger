import type Factory from "../entities/Factory";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type ExternalError from "../errors/ExternalError";

declare global {
  interface AppContext {
    repos: {
      Factory: FactoryRepo;
    };
  }
}

export default interface FactoryRepo {
  /** @throws {ExternalError} */
  save(entity: Omit<Factory, "id">): Factory;
}
