import { IHouse, UserRoles } from "@fridgespy/types";
import { authorizedFetch, perhaps } from "@fridgespy/utils";
import React, { createContext, FunctionComponent } from "react";
import { BehaviorSubject, Subject } from "rxjs";

const homes: IHouse[] = [
  {
    id: "1e57cac1-1749-4b5b-a2ab-05e99127e143",
    name: "Bordingsvej 7",
    role: UserRoles.ADMIN,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "8be5865f-1f8d-4f16-b4b4-fdf479f68e6d",
    name: "Vestervænget 6",
    role: UserRoles.ADMIN,
    createdAt: "",
    updatedAt: "",
  },
];

export const fetchHouses = async () => {
  housesStatus$.next({ loading: true, error: null });
  const [housesError, houses] = await perhaps(
    authorizedFetch(`http://localhost:8002/api/v1/house`, {
      credentials: "include",
    }).then((response) => response.json() as unknown as IHouse[])
  );
  if (housesError) {
    housesStatus$.next({ loading: false, error: housesError });
    console.error(housesError);
    return;
  }
  if (!houses) {
    housesStatus$.next({
      loading: false,
      error: new Error("No houses found!"),
    });
    console.error("No houses found");
    return;
  }

  console.log("Fetched houses for current user");
  housesStatus$.next({ loading: false, error: null });
  houses$.next(houses);
};

const houses$ = new BehaviorSubject<IHouse[]>(homes);
const housesStatus$ = new Subject<{ loading: boolean; error: Error | null }>();

export const HouseContext = createContext({ houses$, housesStatus$ });

export const HouseProvider: FunctionComponent = ({ children }) => {
  return (
    <HouseContext.Provider value={{ houses$, housesStatus$ }}>
      {children}
    </HouseContext.Provider>
  );
};
