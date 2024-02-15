import type CoreError from "./core/errors/CoreError";
import {
  LogLevel,
  LoggerConfig,
  default as LoggerService,
} from "./LoggerService";

export default class ConsoleLogger implements LoggerService {
  #config: LoggerConfig;

  constructor(config: LoggerConfig) {
    this.#config = config;
  }

  info(message: string): void {
    if (this.#config.level >= LogLevel.INFO) {
      process.stdout.write(
        `{"level":"info","time":${Date.now()},"info":"${message}"}\n`,
      );
    }
  }

  warning(message: string): void {
    if (this.#config.level >= LogLevel.WARNING) {
      process.stdout.write(
        `{"level":"warning","time":${Date.now()},"warning":"${message}"}\n`,
      );
    }
  }

  error(messageOrCoreError: string | CoreError): void {
    if (this.#config.level >= LogLevel.ERROR) {
      // NOTE Calling `.toString()` is essential here (to explicitly serialize CoreError)
      process.stderr.write(
        `{"level":"error","time":${Date.now()},"error":${messageOrCoreError.toString()}}\n`,
      );
    }
  }
}
