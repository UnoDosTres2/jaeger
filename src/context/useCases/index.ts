import makeFindAllUsers from "../../business/useCases/FindAllUsers";

export type UseCases = {
  Users: {
    findAllUsers: ReturnType<typeof makeFindAllUsers>; // FIXME [FXTHFCKNGTYP1]: get this type automatically
    //
  };
  //
};

declare global {
  interface AppContext {
    useCases: UseCases;
  }
}

export default async function initialize(
  context: Omit<AppContext, "useCases">,
): Promise<UseCases> {
  const findAllUsers = makeFindAllUsers(context);
  //

  return {
    Users: {
      findAllUsers,
      //
    },
    //
  };
}
