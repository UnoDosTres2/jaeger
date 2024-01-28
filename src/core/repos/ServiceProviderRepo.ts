import type ServiceProvider from "../entities/ServiceProvider";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type ExternalError from "../errors/ExternalError";

export default interface ServiceProviderRepo {
  /** @throws {ExternalError} */
  save(entity: Omit<ServiceProvider, "id">): ServiceProvider;
}
