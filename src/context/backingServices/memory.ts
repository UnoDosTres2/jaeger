import type User from "../../business/entities/User";
// import { RepoBackingService } from "../../integration_tests/RepoBackingService";

// class Clazz<T> extends Array<T> implements RepoBackingService<T> {
//   async populate(records: T[]): Promise<void> {
//     this.splice(0, this.length, ...records);
//   }

//   async unmake(): Promise<void> {
//     this.splice(0, this.length);
//   }
// }

export default async (): Promise<{
  user: Array<User>;
}> => {
  return {
    user: new Array<User>(),
    // factory: new Array<Factory>(),
    //
  };
};
