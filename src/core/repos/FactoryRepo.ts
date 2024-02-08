import type Factory from "../entities/Factory";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type ExternalError from "../errors/ExternalError";

export default interface FactoryRepo {
  /** @throws {ExternalError} */
  save(entity: Omit<Factory, "id">): Factory;
}
