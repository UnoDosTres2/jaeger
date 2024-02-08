import { z } from "zod";
import { Schema as CommentSchema } from "../entities/Comment";
import { Schema as ProductSchema } from "../entities/Product";
import InputError from "../errors/InputError";

const InputSchema = z.object({
  id: z.string(),
  //
});
export type Input = z.infer<typeof InputSchema>;

const OutputSchema = z
  .object({
    rating: z.number().min(1).max(5).optional(),
    comments: z.array(CommentSchema),
  })
  .merge(ProductSchema);
type Output = z.infer<typeof OutputSchema>;

export default (context: UseCaseContext) =>
  async function GetProductProfile(input: Input): Promise<Output | null> {
    // FIXME move this somewhere else (e.g. endpoint function)
    const inputParseResult = InputSchema.safeParse(input);
    if (!inputParseResult.success) {
      throw InputError.fromZodError(inputParseResult.error);
    }

    // TODO BURADAN DEVAM ET (ERO)
    const product = await context.repos.product.findById(input.id);
  };
