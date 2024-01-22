import { z } from "zod";
import {
  default as Factory,
  Schema as FactorySchema,
} from "../entities/Factory";

export const InputSchema = FactorySchema.omit({
  id: true,
});
type Input = z.infer<typeof InputSchema>;

type Output = Factory;

export default (context: UseCaseContext) =>
  function CreateFactory(input: Input): Output {
    const newFactory = context.repos.Factory.save(input);

    // MAYBE send email
    // TODO BURADA KALDIK - BU USE-CASE'İ TEST ET

    return newFactory;
  };
