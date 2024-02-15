import { createServer } from "http";

import config from "./config";
import initializeContext from "./context";
import ConsoleLogger from "./ConsoleLogger";
import attachHTTP from "./http";

async function start() {
  const [teardown, context] = await initializeContext(config);
  const logger = new ConsoleLogger(config.logger);

  logger.info("Started");

  const server = createServer();

  const detachHTTP = attachHTTP(server, config.http, context); // curl http://127.0.0.1:8080/

  // #region Graceful Shutdown

  let _gracefulShutdownInitiatedAt: number;
  async function gracefullyShutdown() {
    if (_gracefulShutdownInitiatedAt) {
      if (
        Date.now() - _gracefulShutdownInitiatedAt >=
        config.gracefulShutdownTimeoutMs
      ) {
        logger.warning("Graceful shutdown timed out, forcefully shutting down");

        // forcefully shutdown
        process.exit(1024);
      }

      return;
    }

    _gracefulShutdownInitiatedAt = Date.now();
    logger.info("Initiating graceful shutdown...");

    await detachHTTP();
    await new Promise<void>((resolve, reject) => {
      server.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
    await teardown();

    logger.info("Shutdown");
  }

  process.on("SIGTERM", gracefullyShutdown);

  // #endregion Graceful Shutdown

  // Start the server, start the app
  server.listen(config.http.port, config.http.host, () => {
    logger.info(`Listening on http://${config.http.host}:${config.http.port}`);
  });
}

start();
