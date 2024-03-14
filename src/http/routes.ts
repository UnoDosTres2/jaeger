import type Router from "@koa/router";

import type { KoaExtendedContext, KoaExtendedState } from "./types";

export type RouterWithContext = Router<KoaExtendedState, KoaExtendedContext>;

export default (router: RouterWithContext): void => {
  router.get("/", async (ctx, next) => {
    ctx.body = "Hello World!";

    await next();
  });

  router.get("/users", async (ctx, next) => {
    // FIXME use the use-case here - NOT the repo directly (MAYBE HATTA VE HATTA buradaki (app)context type'ında `repos` olmasın)

    // TODO what happens if we DO NOT `await` here?
    const allUsers = await ctx.repos.User.findAllUsers();

    ctx.body = allUsers;

    await next();
  });
};
