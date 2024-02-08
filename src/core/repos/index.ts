import type FactoryRepo from "./FactoryRepo";
import type ProductRepo from "./ProductRepo";

declare global {
  interface AppContext {
    repos: {
      Factory: FactoryRepo;
      Product: ProductRepo;
    };
  }
}
