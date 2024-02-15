// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type ExternalError from "../core/errors/ExternalError";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type InternalError from "../core/errors/InternalError";
import { default as initializeDb } from "./db";
import { default as initializeRepos } from "./repos";
import { default as initializeServices } from "./services";
import { default as initializeUseCases } from "./useCases";

/** @throws {ExternalError || InternalError} */
export default async (config: AppConfig): Promise<[TeardownFn, AppContext]> => {
  const [teardownDb, mongoClient] = await initializeDb(config);
  const repos = initializeRepos(mongoClient);
  const services = initializeServices(config);
  const useCases = initializeUseCases({
    _isContext: true,
    repos,
    services,
  });

  //

  return [
    async () => {
      await teardownDb();
      // MAYBE teardown services (but omit logger, to be able to log shutdown messages)
    },
    {
      _isContext: true,

      repos,
      services,
      useCases,
    },
  ];
};
