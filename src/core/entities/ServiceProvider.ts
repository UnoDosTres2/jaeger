import { z } from "zod";

export const Schema = z.object({
  id: z.string(),
  address: z.string(),
  name: z.string(),
  phone: z.string().optional(),
  longitude: z.number(),
  latitude: z.number(),
});

type _Type = z.infer<typeof Schema>;

export default _Type;
