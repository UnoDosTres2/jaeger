import User from "../entities/User";

export default (context: UseCaseContext) =>
  async function findAllUsers(): Promise<Array<User>> {
    const users = await context.repos.User.findAllUsers();

    return users;
  };
