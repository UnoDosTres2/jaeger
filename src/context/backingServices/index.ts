import {
  type _type as MysqlType,
  type Config as MysqlConfig,
  default as initialize_mysql,
} from "./mysql";
//

declare global {
  interface AppBackingServices {
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
export default async (
  config: AppConfig,
): Promise<[TeardownFn, AppBackingServices]> => {
  const [teardown_mysql, mysql] = await initialize_mysql(config.mysql);
  //

  return [
    async () => {
      await teardown_mysql();
      //
    },
    {
      _isBackingServices: true,

      mysql,
      //
    },
  ];
};
