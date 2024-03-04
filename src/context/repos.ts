// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type InternalError from "../business/errors/InternalError";

import UserRepo from "../business/repos/UserRepo";
import FactoryRepo from "../business/repos/FactoryRepo";
import FactoryRepoMysql from "../repos/FactoryRepoMysql";
import UserRepoMemory from "../repos/UserRepoMemory";

type Repos = {
  User: UserRepo;
  // Token: TokenRepo;
  // Company: CompanyRepo;
  // Templates: TemplatesRepo;
  Factory: FactoryRepo;
  //
};

declare global {
  interface AppContext {
    repos: Repos;
  }
}

// MAYBE throws BackingService[Initialization]Error - and we can get rid off this vague internal error
/** @throws {InternalError} */
export default function initialize(backingServices: AppBackingServices): Repos {
  const repos: Repos = {
    User: new UserRepoMemory(),
    // User: new UserRepoMongo(backingServices),
    // Token: new TokenRepoMongo(backingServices),
    // Company: new CompanyRepoMongo(backingServices),
    // Templates: new TemplatesRepoMongo(backingServices),
    Factory: new FactoryRepoMysql(backingServices.mysql),
    //
  };

  return repos;
}
