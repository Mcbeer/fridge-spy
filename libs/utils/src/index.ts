/**
 * Converts a possibly rejected promise to a node callback-like syntax
 */
export const perhaps = async <T>(
  promise: Promise<T>
): Promise<[Error | null, T | null] | [Error | null]> => {
  try {
    const result = await promise;
    return [null, result];
  } catch (error: unknown) {
    // This is a stupid rule, i just want to say that
    return [error as Error, null];
  }
};

export * from "./redisHelpers";
