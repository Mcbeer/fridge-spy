import { ILocation, IUser } from "@fridgespy/types";
import React, { createContext } from "react";
import { BehaviorSubject } from "rxjs";

const user$ = new BehaviorSubject<IUser | null>(null);
const authorized$ = new BehaviorSubject<boolean>(true);

export const UserContext = createContext({ user$, authorized$ });

export const UserProvider: React.FunctionComponent = ({ children }) => {
  return (
    <UserContext.Provider value={{ user$, authorized$ }}>
      {children}
    </UserContext.Provider>
  );
};
