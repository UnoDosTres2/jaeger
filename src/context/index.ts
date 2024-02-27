// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type ExternalError from "../core/errors/ExternalError";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type InternalError from "../core/errors/InternalError";

// import { default as initializeDbs } from "./dbs";
import { default as initializeBackingServices } from "./backingServices";
import { default as initializeRepos } from "./repos";
import { default as initializeServices } from "./services";
import { type UseCases, default as initializeUseCases } from "./useCases";

/** @throws {ExternalError || InternalError} */
export default async (
  config: AppConfig,
): Promise<[TeardownFn, AppContext & { useCases: UseCases }]> => {
  const [teardownBackingServices, backingServices] =
    await initializeBackingServices(config);
  const repos = initializeRepos(backingServices);
  const [teardownServices, services] = await initializeServices(config);
  const useCases = initializeUseCases({
    _isContext: true,
    repos,
    services,
  });

  //

  return [
    async () => {
      // FIXME return Promise.all
      await teardownBackingServices();
      await teardownServices();
    },
    {
      _isContext: true,

      repos,
      services,
      useCases,
    },
  ];
};
