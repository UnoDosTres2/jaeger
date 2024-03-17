import type User from "../entities/User";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type ExternalError from "../errors/ExternalError";

export default interface UserRepo {
  /** @throws {ExternalError} */
  findByUsername(username: string): Promise<User | null>;

  /** @throws {ExternalError} */
  checkIfUsernameOrEmailExists(
    username: string,
    email: string,
  ): Promise<boolean>;
  // ): Promise<"username" | "email" | null>;

  /** @throws {ExternalError} */
  findByUsernameOrEmail(usernameOrEmail: string): Promise<User | null>;

  /** @throws {ExternalError} */
  findById(id: string): Promise<User | null>;

  /** @throws {ExternalError} */
  findAllUsers(): Promise<Array<User>>; // FIXME export a type and use it here and here [ADLSAHDKSA]

  //
}
