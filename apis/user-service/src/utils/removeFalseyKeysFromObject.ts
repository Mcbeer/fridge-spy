import { pickBy } from 'lodash';

/** Removes all falsy values from an object, leaving only the keys with truthy values  */
export const removeFalseyKeysFromObject = <T extends object, K>(args: T): K => {
  return pickBy(args, (arg) => arg !== undefined || arg !== null) as K;
};
