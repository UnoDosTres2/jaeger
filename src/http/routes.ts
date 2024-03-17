import type Router from "@koa/router";

import type { KoaExtendedContext, KoaExtendedState } from "./types";

export type RouterWithContext = Router<KoaExtendedState, KoaExtendedContext>;

export default (router: RouterWithContext): void => {
  router.get("/", async (ctx, next) => {
    ctx.body = "Hello World!";

    await next();
  });

  router.get("/users", async (ctx, next) => {
    const allUsers = await ctx.useCases.Users.findAllUsers();

    // TODO MAYBE ensure the return type (the one that the `ctx.body` set to)
    ctx.body = allUsers;

    await next();
  });
};
