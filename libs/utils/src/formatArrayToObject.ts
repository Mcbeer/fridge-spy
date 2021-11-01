import { IObjectList } from "@fridgespy/types";

export const formatArrayToObject = <T, R>(
  key: string,
  list: T[]
): IObjectList<R> =>
  list.reduce((cummulative, item) => {
    return { ...cummulative, [item[key]]: item };
  }, {});
