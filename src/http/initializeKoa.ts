import cors from "@koa/cors";
import Router from "@koa/router";
import Koa from "koa";

import { makeErrorTransformer } from "./middlewares";
import initializeRoutes from "./routes";
import type { Config, KoaExtendedContext, KoaExtendedState } from "./types";

export default (
  config: Config,
  context: AppContext,
): Koa<KoaExtendedState, KoaExtendedContext> => {
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
  koa.use(async (ctx, next) => {
    // TODO move this to middlewares directory

    await next();

    if (typeof ctx.body === "object") {
      ctx.body = {
        data: ctx.body,
        // errors: undefined,
      };
    }
  });
  //

  return koa;
};
