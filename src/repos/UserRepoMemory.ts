import type User from "../business/entities/User";
import type UserRepo from "../business/repos/UserRepo";
// import { type RepoBackingService } from "../integration_tests/RepoBackingService";

export default class UserRepoMemory implements UserRepo {
  #mem: Array<User>;

  constructor({ memory }: AppBackingServices) {
    this.#mem = memory.user;
  }

  /** @throws {ExternalError} */
  async findByUsername(_username: string): Promise<User | null> {
    return this.#mem.find(({ username }) => username === _username) ?? null;
  }

  /** @throws {ExternalError} */
  async findByEmail(_email: string): Promise<User | null> {
    return this.#mem.find(({ email }) => email === _email) ?? null;
  }

  /** @throws {ExternalError} */
  async findByUsernameOrEmail(usernameOrEmail: string): Promise<User | null> {
    return (
      this.#mem.find(
        ({ username, email }) =>
          username == usernameOrEmail || email === usernameOrEmail,
      ) ?? null
    );
  }

  /** @throws {ExternalError} */
  async checkIfUsernameOrEmailExists(
    _username: string,
    _email: string,
  ): Promise<boolean> {
    return !!this.#mem.findIndex(
      ({ username, email }) => username === _username || email === _email,
    );
  }

  /** @throws {ExternalError} */
  async findById(_id: string): Promise<User | null> {
    return this.#mem.find(({ id }) => id === _id) ?? null;
  }

  /** @throws {ExternalError} */
  async findAllUsers(): Promise<Array<User>> {
    return this.#mem;
  }
}
