import { z } from "zod";

export const Schema = z.object({
  id: z.string(),
  domain: z.string(), // e.g. "ema-tech.net"
  address: z.string(),
  name: z.string(),
  phone: z.string().optional(),
  // vergiNo: z.number().optional(),
  // users: z.array(FactoryUserSchema).min(1).optional(),
  //
});

type _Type = z.infer<typeof Schema>;

export default _Type;
