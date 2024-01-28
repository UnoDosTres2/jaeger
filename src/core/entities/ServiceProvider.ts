import { z } from "zod";

export const Schema = z.object({
  id: z.string(),
  address: z.string(),
  name: z.string(),
  phone: z.string().optional(),
});

type _Type = z.infer<typeof Schema>;

export default _Type;
