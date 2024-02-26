import { LogLevel } from "./LoggerService";

const config: AppConfig = {
  _isConfig: true,

  gracefulShutdownTimeoutMs: toNumberWithDefault(
    getEnvVar("GRACEFULSHUTDOWNTIMEOUTMS", "4000"),
    4_000,
  ),

  http: {
    host: getEnvVar("HTTP_HOST", "127.0.0.1"),
    port: toNumberWithDefault(getEnvVar("HTTP_PORT", "8080"), 8080),
    exposeStacktrace: !!process.env.APP_EXPOSE_STACKTRACE || false,
  },

  logger: {
    level: toNumberWithDefault(
      getEnvVar("LOGGER_LEVEL", LogLevel.INFO.toString()),
      LogLevel.INFO,
    ),
  },

  mysql: {
    database: getEnvVar("MYSQL_DATABASE"),
    host: getEnvVar("MYSQL_HOST", "127.0.0.1"),
    port: toNumberWithDefault(getEnvVar("MYSQL_PORT", "3306"), 3306),
    user: getEnvVar("MYSQL_USER"),
  },

  //
};

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType]: ObjectType[Key] extends object
    ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      /* `${Key}` */ "" | `${Key}_${NestedKeyOf<ObjectType[Key]>}`
    : Key;
}[keyof ObjectType];

type EnvName = Uppercase<NestedKeyOf<AppConfig>>;
function getEnvVar(
  name: Exclude<EnvName, "_ISCONFIG">,
  otherwise: string | null = null,
): string {
  const val = process.env[name];

  if (val) {
    return val;
  }

  if (!otherwise) {
    throw new Error(`Required environment variable "${name}" wasn't set.`);
  }

  return otherwise;
}

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
