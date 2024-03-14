import type User from "../../business/entities/User";
// import { RepoBackingService } from "../../integration_tests/RepoBackingService";
import {
  type _type as MysqlType,
  type Config as MysqlConfig,
  default as initialize_mysql,
} from "./mysql";
import { default as initialize_memory } from "./memory";
//

declare global {
  interface AppBackingServices {
    // memory: Record<string, RepoBackingService<unknown>>;
    memory: {
      user: Array<User>;
      //
    };
    mysql: MysqlType;
    //
  }
}

// FIXME find out if here is the right place for it
declare global {
  interface AppConfig {
    mysql: MysqlConfig;
    //
  }
}

/** @throws {ExternalError || InternalError} */
export default async function initialize(
  config: AppConfig,
): Promise<[TeardownFn, AppBackingServices]> {
  const [teardown_mysql, mysql] = await initialize_mysql(config.mysql);
  //

  const memory = await initialize_memory();

  return [
    async () => {
      await teardown_mysql();
      //
    },
    {
      _isBackingServices: true,

      mysql,
      memory,
      //
    },
  ];
}
