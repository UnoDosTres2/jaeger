import { type ZodError, type ZodIssue } from "zod";
import CoreError from "./CoreError";

export type ErroneousField = {
  /**
   * The path of the field that is erroneous.
   */
  path: string;
  /**
   * The constraint that was violated; e.g. "required", "short", "alphanumeric", etc.
   */
  constraint: string;
  value?: unknown;
};
export type ErroneousFields = Array<ErroneousField>;

export default class InputError extends CoreError {
  protected name = InputError.name;

  constructor(fields: ErroneousField | ErroneousFields, message?: string) {
    super();

    this.payload = {
      fields: Array.isArray(fields) ? fields : [fields],
    };
    this.message = message;
  }

  static fromZodError(error: ZodError): InputError {
    const fields = error.issues.map(zodIssueToInputErrorField);

    return new InputError(fields);
  }
}

function zodIssueToInputErrorField(zodIssue: ZodIssue): ErroneousField {
  switch (zodIssue.code) {
    case "invalid_type": {
      if (/* message == "Required" */ zodIssue.received == "undefined") {
        return {
          path: zodIssue.path.join("."),
          constraint: "required",
        };
      }

      return {
        path: zodIssue.path.join("."),
        constraint: "type",
      };
    }

    //
  }

  throw new Error(`Unrecognized Zod issue code: "${zodIssue.message}".`);
}
