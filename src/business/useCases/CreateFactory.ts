import { z } from "zod";
import {
  default as Factory,
  Schema as FactorySchema,
} from "../entities/Factory";

export const InputSchema = FactorySchema.omit({
  id: true,
});
export type Input = z.infer<typeof InputSchema>;

export default (context: UseCaseContext) =>
  function createFactory(input: Input): Factory {
    const newFactory = context.repos.Factory.save(input);

    // MAYBE send email

    return newFactory;
  };
