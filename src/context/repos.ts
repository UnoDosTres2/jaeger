// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type InternalError from "../core/errors/InternalError";

import FactoryRepo from "../core/repos/FactoryRepo";
import FactoryRepoMysql from "../repos/FactoryRepoMysql";

type Repos = {
  // User: UserRepo;
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

/** @throws {InternalError} */
export default function initialize(backingServices: AppBackingServices): Repos {
  const repos: Repos = {
    // User: new UserRepoMongo(backingServices),
    // Token: new TokenRepoMongo(backingServices),
    // Company: new CompanyRepoMongo(backingServices),
    // Templates: new TemplatesRepoMongo(backingServices),
    Factory: new FactoryRepoMysql(backingServices.mysql),
    //
  };

  return repos;
}
