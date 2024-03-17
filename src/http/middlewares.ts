import type { RouterContext } from "@koa/router";

// import { AccessToken } from "../business/entities/Token";
// import { UserRole } from "../business/entities/User";
import CoreError from "../business/errors/CoreError";
import ExternalError from "../business/errors/ExternalError";
import InputError from "../business/errors/InputError";
import InternalError from "../business/errors/InternalError";
import NotFoundError from "../business/errors/NotFoundError";
import UnauthenticatedError from "../business/errors/UnauthenticatedError";
import UnauthorizedError from "../business/errors/UnauthorizedError";
import type { KoaExtendedContext, KoaExtendedState } from "./types";

declare global {
  interface AppKoaState {
    // token?: AccessToken;
  }
}

type MiddlewareContext = RouterContext<KoaExtendedState, KoaExtendedContext>;

// FIXME convert koa router's method not allowed error to JSON (i.e. `{"error":{...}}`)

export const makeErrorTransformer = (exposeStackTrace = false) =>
  async function errorTransformer(
    ctx: MiddlewareContext,
    next: () => Promise<void>,
  ): Promise<void> {
    // Convert CoreError to HTTP response

    try {
      await next();
    } catch (err) {
      if (err instanceof CoreError) {
        let statusCode: number;
        if (err instanceof InputError) {
          statusCode = 400;
        } else if (err instanceof UnauthenticatedError) {
          /**
           * [401 Unauthorized](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401)
           * Although the HTTP standard specifies "unauthorized", semantically
           * this response means "unauthenticated". That is, the client must
           * authenticate itself to get the requested response.
           */
          statusCode = 401;
        } else if (err instanceof UnauthorizedError) {
          /**
           * [403 Forbidden](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403)
           * The client does not have access rights to the content; that is, it
           * is unauthorized, so the server is refusing to give the requested
           * resource. Unlike 401 Unauthorized, the client's identity is known
           * to the server.
           */
          statusCode = 403;
        } else if (err instanceof NotFoundError) {
          statusCode = 404;
        } else if (
          err instanceof InternalError ||
          err instanceof ExternalError
        ) {
          statusCode = 500;
        }
        //
        else {
          statusCode = 500;
        }

        ctx.res.statusCode = statusCode;
        ctx.res.end(
          `{"error":${err.toString(
            exposeStackTrace,
          )},"statusCode":${statusCode}}`,
        );
      } else {
        ctx.res.statusCode = 500;
        ctx.res.end(
          JSON.stringify({
            error: (err as Error).message,
            stack: exposeStackTrace ? (err as Error).stack : undefined,
          }),
        );
      }
    }
  };

// export async function decodeToken(
//   ctx: MiddlewareContext,
//   next: () => Promise<void>,
// ): Promise<void> {
//   let tokenStr = ctx.header.authorization;
//   if (!tokenStr || !tokenStr.startsWith("Bearer ")) {
//     // MAYBE log - authorization header exists but malformed

//     await next();
//     return;
//   }
//   tokenStr = tokenStr.substring(7 /* "Bearer ".length */);

//   const verifyResult = await ctx.services.Token.verifyAccessToken(tokenStr);
//   if (verifyResult.err) {
//     throw new UnauthenticatedError("invalid_token");
//   }
//   const token = verifyResult.val;

//   // FIXME uncomment before production
//   // if (await ctx.repos.Token.checkIfRevoked(token)) {
//   //   await next();
//   //   return;
//   // }

//   ctx.state = {
//     // TODO Decide if `token.sub` (JWT jargon) OR `actor.id` (decoded JWT, business-logic compatible)
//     //      Remember to alter `requireXXXToken` middlewares accordingly!
//     token,
//   };

//   await next();
// }

// export async function requireToken(
//   ctx: MiddlewareContext,
//   next: () => Promise<void>,
// ): Promise<void> {
//   if (!Object.prototype.hasOwnProperty.call(ctx.state, "token")) {
//     throw new UnauthenticatedError();
//   }

//   await next();
// }

// export async function requireCompanyToken(
//   ctx: MiddlewareContext,
//   next: () => Promise<void>,
// ): Promise<void> {
//   if (!Object.prototype.hasOwnProperty.call(ctx.state, "token")) {
//     throw new UnauthenticatedError();
//   }

//   if (ctx.state.token!.role == UserRole.SUPERADMIN) {
//     throw new UnauthorizedError();
//   }

//   await next();
// }
