import type FactoryRepo from "./FactoryRepo";
import type ServiceProviderRepo from "./ServiceProviderRepo";

declare global {
  interface AppContext {
    repos: {
      Factory: FactoryRepo;
      ServiceProvider: ServiceProviderRepo;
    };
  }
}
