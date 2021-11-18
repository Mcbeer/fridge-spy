import { IObjectList } from "@fridgespy/types";

type KeyType = string | number | symbol;

export const formatArrayToObject = <T extends { [key: KeyType]: any }, R>(
  key: KeyType,
  list: T[]
): IObjectList<R> =>
  list.reduce((cummulative, item) => {
    return { ...cummulative, [item[key]]: item };
  }, {});
