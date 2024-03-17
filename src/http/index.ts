import type { Server } from "http";

import { type Config } from "./types";
import initializeKoa from "./initializeKoa";

export default (
  server: Server,
  config: Config,
  context: AppContext,
): (() => Promise<void>) => {
  const koa = initializeKoa(config, context);

  server.addListener("request", koa.callback());
  return async () => {
    server.removeListener("request", koa.callback());
  };
};
