import User from "../entities/User";

export default (context: UseCaseContext) =>
  function findAllUsers(): Promise<Array<User>> {
    return context.repos.User.findAllUsers();
  };
