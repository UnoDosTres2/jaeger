import type User from "../business/entities/User";
import { UserRole } from "../business/entities/User";
import type UserRepo from "../business/repos/UserRepo";

export default class UserRepoMemory implements UserRepo {
  #arr: Array<User>;

  constructor() {
    this.#arr = [
      {
        id: "1",
        username: "john.doe",
        email: "john@does.co",
        password:
          "$2y$10$B22cchaklVxJ4j.moQ02O.ZFym8B47AnYMEOuGtb7C30sfDQRn1US", // 12345
        role: UserRole.ADMIN,
      },

      {
        id: "2",
        username: "jane.doe",
        email: "jane@does.co",
        password:
          "$2y$10$B22cchaklVxJ4j.moQ02O.ZFym8B47AnYMEOuGtb7C30sfDQRn1US", // 12345
        role: UserRole.AUTHOR,
      },

      {
        id: "3",
        username: "baby.doe",
        email: "baby@does.co",
        password:
          "$2y$10$B22cchaklVxJ4j.moQ02O.ZFym8B47AnYMEOuGtb7C30sfDQRn1US", // 12345
        role: UserRole.MODERATOR,
      },

      //
    ];
  }

  /** @throws {ExternalError} */
  async findByUsername(_username: string): Promise<User | null> {
    return this.#arr.find(({ username }) => username === _username) ?? null;
  }

  /** @throws {ExternalError} */
  async findByEmail(_email: string): Promise<User | null> {
    return this.#arr.find(({ email }) => email === _email) ?? null;
  }

  /** @throws {ExternalError} */
  async findByUsernameOrEmail(usernameOrEmail: string): Promise<User | null> {
    return (
      this.#arr.find(
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
    return !!this.#arr.findIndex(
      ({ username, email }) => username === _username || email === _email,
    );
  }

  /** @throws {ExternalError} */
  async findById(_id: string): Promise<User | null> {
    return this.#arr.find(({ id }) => id === _id) ?? null;
  }

  /** @throws {ExternalError} */
  async findAllUsers(): Promise<Array<User>> {
    return this.#arr;
  }
}
