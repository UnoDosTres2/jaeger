import cors from "@koa/cors";
import Router from "@koa/router";
import Koa from "koa";

export default (config: Config, context: AppContext): (() => Promise<void>) => {
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

  return koa;
};
