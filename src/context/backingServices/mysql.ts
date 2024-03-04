import { default as mysql, type PoolOptions, type Pool } from "mysql2/promise";

export type Config = {
  database: string;
  host: string;
  port: number;
  user: string;
  password?: string;
};

export type _type = Pool;

export default async (config: Config): Promise<[TeardownFn, _type]> => {
  const poolOpts: PoolOptions = {
    database: config.database,
    user: config.user,
    host: config.host,
    port: config.port,
    //
  };

  if (config.password) {
    poolOpts.password = config.password;
  }

  const pool = mysql.createPool(poolOpts);

  // TODO find out if those 2 below are needed
  // await pool.connect();
  // await pool.ping();

  return [
    async () => {
      await pool.end();
    },
    pool,
  ];
};
