import { z } from "zod";
import {
  default as ServiceProvider,
  Schema as ServiceProviderSchema,
} from "../entities/ServiceProvider";
import ExternalError from "../errors/ExternalError";

export const InputSchema = ServiceProviderSchema.omit({
  id: true,
});

export type Input = z.infer<typeof InputSchema>;

//TODO change ExternalError to InputError
export default (context: UseCaseContext) =>
  function createServiceProvider(input: Input): ServiceProvider {
    if (input.name.length < 5) {
      const err = new Error();
      err.message = "Name is too short";
      throw new ExternalError(err);
    }
    if (input.address.length < 10) {
      const err = new Error();
      err.message = "Name is too short";
      throw new ExternalError(err);
    }
    const newServiceProvider = context.repos.ServiceProvider.save(input);

    return newServiceProvider;
  };
