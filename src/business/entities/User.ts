import { z } from "zod";

export enum UserRole {
  ADMIN = "adm",
  AUTHOR = "atr",
  MODERATOR = "mod",
  USER = "usr",
  VISITOR = "vst",
}

export const Schema = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  password: z.string(),
  role: z.nativeEnum(UserRole),
});

// MAYBE have separate schemas per user role after fixing below;
// Schema.extend({
//   role: UserRole.ADMIN,
// });

type _Type = z.infer<typeof Schema>;

export default _Type;
