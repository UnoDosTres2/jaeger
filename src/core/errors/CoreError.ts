type StackTraceEntry = {
  file?: string;
  name?: string;
  line?: number;
  column?: number;
};
type StructuredStackTrace = Array<StackTraceEntry>;

type AsJSON = {
  name: string;
  stack: StructuredStackTrace;
  message?: string;
} & Record<string, unknown>;

export default abstract class CoreError {
  /**
   * If set the stack trace will be limited to this function.
   * This is generally the name of the function first ever
   * called when the application starts, **unless**
   * it's an anonymous one (i.e. IIFE). If so
   * setting this has no effect.
   *
   * Remember to use a unique name for the entry point across
   * the project (including `node_modules`).
   */
  static entryPointName?: string;
  #message?: string;
  #payload?: Record<string, unknown>;
  stack = captureStackTrace(2, CoreError.entryPointName);

  get message(): string | undefined {
    return this.#message;
  }

  protected set message(val: string | undefined) {
    this.#message = val;
  }

  get payload(): Record<string, unknown> | undefined {
    return this.#payload;
  }

  protected set payload(val: Record<string, unknown> | undefined) {
    this.#payload = val;
  }

  protected abstract get name(): string;

  /**
   * @param includeStackTrace `true` by default
   * @returns String representation of CoreError
   */
  toString(includeStackTrace = true): string {
    const result: Partial<AsJSON> = {
      name: this.name,
      message: this.#message,
      ...this.payload,
    };

    if (includeStackTrace) {
      result.stack = this.stack;
    }

    return JSON.stringify(result);
  }
}

// NOTE This is essential to make `CoreError instanceof Error === true`
Reflect.setPrototypeOf(CoreError.prototype, Error.prototype);

function captureStackTrace(
  skipFirstN = 0,
  stopAtFnName?: string,
): StructuredStackTrace {
  const _prepareStackTrace = Error.prepareStackTrace;

  Error.prepareStackTrace = (_, callSites) => {
    callSites.splice(0, 1 + skipFirstN);

    const result = [];

    for (
      let i = 0, cs = callSites[i];
      i < callSites.length;
      i += 1, cs = callSites[i]
    ) {
      const fileNameRaw = cs.getFileName();
      if (
        fileNameRaw &&
        (fileNameRaw.startsWith("node:") ||
          fileNameRaw.includes("node_modules"))
      ) {
        continue;
      }

      const fnNameRaw = cs.getFunctionName();

      const entry: StackTraceEntry = {
        file: fileNameRaw || undefined,
        name: `${cs.isConstructor() ? "new " : ""}${
          fnNameRaw || "<anonymous>"
        }`,
        line: cs.getLineNumber() || undefined,
        column: cs.getColumnNumber() || undefined,
      };

      result.push(entry);

      if (stopAtFnName && fnNameRaw === stopAtFnName) {
        break;
      }
    }

    return result;
  };

  const _ = {};
  Error.captureStackTrace(_); // This adds `stack` to `_`
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const stack: StructuredStackTrace = _.stack as StructuredStackTrace;

  Error.prepareStackTrace = _prepareStackTrace; // restore V8's original function

  return stack;
}
