import type Koa from "koa";

export type Config = {
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
} & Omit<AppContext, "repos">;
