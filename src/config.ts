import { LogLevel } from "./LoggerService";

const config: AppConfig = {
  _isConfig: true,

  gracefulShutdownTimeoutMs: toNumberWithDefault(
    process.env.APP_GRACEFUL_SHUTDOWN_TIMEOUT_MS,
    4_000,
  ),

  http: {
    host: process.env.APP_HOST || "127.0.0.1",
    port: toNumberWithDefault(process.env.APP_PORT, 8080),
    exposeStacktrace: !!process.env.APP_EXPOSE_STACKTRACE || false,
  },

  logger: {
    level: toNumberWithDefault(process.env.APP_LOG_LEVEL, LogLevel.INFO),
  },

  //
};

export default config;

/**
 * Try to parse the given string as number. If it fails
 * to parse returns the given default value.
 *
 * @param {string} str The string to try to parse as number
 * @param {number} defaultValue If parsing fails the number to return as default
 * @param {number} radix
 * @returns {number}
 */
function toNumberWithDefault(
  str: string | undefined,
  defaultValue: number,
  radix = 10,
): number {
  if (str === undefined) {
    return defaultValue;
  }

  const parsed = Number.parseInt(str, radix);

  if (Number.isNaN(parsed)) {
    // eslint-disable-next-line no-console
    console.log(
      JSON.stringify({
        level: "warning",
        time: Date.now(),
        warning: `Using default value (${defaultValue}) for the config due to invalid environment variable.`,
      }),
    );

    return defaultValue;
  }

  return parsed;
}
