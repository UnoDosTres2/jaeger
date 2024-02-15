type TeardownFn = () => Promise<void>;

/**
 * Populate it by;
 * ```
 * declare global {
 *  interface AppContext {
 *    // some name and type pair(s), e.g.;
 *    // services: Services;
 *  }
 * }
 * ```
 */
interface AppContext {
  _isContext: true;
}

/**
 * Populate it by;
 * ```
 * declare global {
 *  interface AppConfig {
 *    // some name and type pair(s), e.g.;
 *    // server: {
 *    //   http: HttpServerConfig;
 *    // };
 *  }
 * }
 * ```
 */
interface AppConfig {
  _isConfig: true;

  gracefulShutdownTimeoutMs: number;
}

type UseCaseContext = Omit<AppContext, "useCases">;
