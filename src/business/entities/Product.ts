import { z } from "zod";

export const Schema = z.object({
  // TODO
});

type _Type = z.infer<typeof Schema>;

export default _Type;
