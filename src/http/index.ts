import cors from "@koa/cors";
import Router from "@koa/router";
import type { Server } from "http";
import Koa from "koa";

import { makeErrorTransformer } from "./middlewares";
import initializeRoutes from "./routes";

type Config = {
  host: string;
  port: number;
  exposeStacktrace: boolean;
};

declare global {
  interface AppConfig {
    http: Config;
  }
}

export type KoaExtendedState = Koa.DefaultState & AppKoaState;
export type KoaExtendedContext = Koa.DefaultContext & {
  /**
   * @deprecated Use the keyword `throw` instead; e.g. `throw new CoreError`
   */
  throw: never;
} & AppContext;

export default (
  server: Server,
  config: Config,
  context: AppContext,
): (() => Promise<void>) => {
  const koa = new Koa<KoaExtendedState, KoaExtendedContext>();
  const router = new Router<KoaExtendedState, KoaExtendedContext>();

  Object.defineProperties(
    koa.context,
    Object.fromEntries(
      Object.entries(context).map(([key, value]) => [
        key,
        { value, writable: false },
      ]),
    ),
  );

  initializeRoutes(router);

  koa.use(makeErrorTransformer(config.exposeStacktrace));
  koa.use(cors()); // FIXME prod'da napcaz bunu?
  koa.use(router.routes());
  koa.use(router.allowedMethods());
  //

  server.addListener("request", koa.callback());
  return async () => {
    server.removeListener("request", koa.callback());
  };
};
