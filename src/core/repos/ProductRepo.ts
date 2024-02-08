import type Product from "../entities/Product";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type ExternalError from "../errors/ExternalError";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type NotFoundError from "../errors/NotFoundError";

export default interface ProductRepo {
  /** @throws {ExternalError} */
  save(entity: Omit<Product, "id">): Product;
  /** @throws {NotFoundError} */
  getById(id: string): Product;
}
