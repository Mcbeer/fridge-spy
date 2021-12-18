import { IUser } from "@fridgespy/types";
import { authorizedFetch } from "@fridgespy/utils";

interface UserSigninArgs {
  email: string;
  password: string;
}

export const signInUser = ({
  email,
  password,
}: UserSigninArgs): Promise<IUser> => {
  return authorizedFetch("http://fridgespy.local:8001/api/v1/auth/authorize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((response) => response.user);
};
