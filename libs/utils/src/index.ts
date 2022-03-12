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

/** A wrapper around fetch, to ensure correct headers and credentials are set */
export const authorizedFetch = (
  path: string,
  options: RequestInit | undefined
) =>
  fetch(path, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
    ...options,
  }).then(async (response) => {
    if (response.status !== 200) {
      const errorText = await response.json();
      const errorObject = new Error(errorText.message);
      throw errorObject;
    }

    return response.json();
  });

export const toInt = (input: string | number) => {
  if (typeof input === "string") {
    const asInt = parseInt(input, 10);
    return isNaN(asInt) ? 0 : asInt;
  }

  return input;
};

export * from "./formatArrayToObject";
export * from "./redisHelpers";
