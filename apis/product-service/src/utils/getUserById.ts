import { IUser } from "@fridgespy/types";
import fetch from 'cross-fetch';

export const getUserById = async (id: string): Promise<IUser> => {
  return fetch(`${process.env.USER_SERVICE_ENDPOINT}/user/${id}`, {
    // @ts-ignore
    headers: {
      "Access-Control-Allow-Headers": "x-api-key",
      "x-api-key": process.env.API_KEY,
    },
  }).then((response) => response.json() as unknown as IUser);
};
