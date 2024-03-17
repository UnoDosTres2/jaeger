import User from "../entities/User";

export type Output = Array<Omit<User, "password">>; // FIXME [ADLSAHDKSA]

// FIXME [FXTHFCKNGTYP1] by making it a named `function` - not an anonymous one
export default (context: UseCaseContext) =>
  function findAllUsers(): Promise<Output> {
    return context.repos.User.findAllUsers(); // FIXME DECIDE how to apply some hooks, middlewares, etc... when and if we don't want apply some before / after "conditions", e.g. to not to get "password" field (and not to declare it again and again)
  };
