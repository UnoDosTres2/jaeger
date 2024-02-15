import type CoreError from "./core/errors/CoreError";

export enum LogLevel {
  OFF = 0,
  ERROR = 4,
  WARNING = 5,
  INFO = 7,
  VERBOSE = 8,
}

export type LoggerConfig = {
  level: LogLevel;
};

declare global {
  interface AppConfig {
    logger: LoggerConfig;
  }
}

export default interface LoggerService {
  // TODO set log level
  info(message: string): void;
  warning(message: string): void;
  error(messageOrCoreError: string | CoreError): void;
  //
}
