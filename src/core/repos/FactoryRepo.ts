import type Factory from "../entities/Factory";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type ExternalError from "../errors/ExternalError";

// FIXME move this to somewhere else
declare global {
  interface AppContext {
    repos: {
      Factory: FactoryRepo; // Foo
    };
  }
}

export default interface FactoryRepo {
  /** @throws {ExternalError} */
  save(entity: Omit<Factory, "id">): Factory;
}
