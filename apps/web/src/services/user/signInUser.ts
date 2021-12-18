import { IUser } from "@fridgespy/types";

interface UserSigninArgs {
  email: string;
  password: string;
}

export const signInUser = ({
  email,
  password,
}: UserSigninArgs): Promise<IUser> => {
  return fetch("http://fridgespy.local:8001/api/v1/auth/authorize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((response) => response.json())
    .then((response) => response.user);
};
