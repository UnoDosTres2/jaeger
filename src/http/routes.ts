import type Router from "@koa/router";

import type { KoaExtendedContext, KoaExtendedState } from "./index";

export type RouterWithContext = Router<KoaExtendedState, KoaExtendedContext>;

export default (router: RouterWithContext): void => {
  router.get("/", async (ctx, next) => {
    ctx.body = "Hello World!";

    await next();
  });

  router.get("/users", async (ctx, next) => {
    // TODO what happens if we DO NOT `await` here?
    const allUsers = await ctx.repos.User.findAllUsers();

    ctx.body = allUsers;

    await next();
  });
};
