import { ILocation, ILocationProduct } from "@fridgespy/types";
import { authorizedFetch, perhaps } from "@fridgespy/utils";
import React, { createContext, useEffect } from "react";
import { BehaviorSubject, map, Observable } from "rxjs";

export interface ILocationWithProducts extends ILocation {
  products: ILocationProduct[];
}

const locations$ = new BehaviorSubject<ILocation[]>([]);

const locationsItems$ = new BehaviorSubject<ILocationProduct[]>([]);

/** Returns the first 8 items to expire on the location */
const almostExpiredItems$ = (
  locationId: string
): Observable<ILocationProduct[]> =>
  locationsItems$.pipe(
    map((items) => items.filter((item) => item.locationId === locationId)),
    map((items) => {
      return items.slice(0, 8);
    })
  );

/** Returns items only on a given location */
const itemsOnLocation$ = (locationId: string): Observable<ILocationProduct[]> =>
  locationsItems$.pipe(
    map((items) => items.filter((item) => item.locationId === locationId))
  );

const locationById$ = (locationId: string) =>
  locations$.pipe(
    map((locations) => locations.find((location) => location.id === locationId))
  );

export const LocationContext = createContext({
  locations$,
  locationsItems$,
  locationById$,
  itemsOnLocation$,
  almostExpiredItems$,
});

export const LocationProvider: React.FunctionComponent = ({ children }) => {
  return (
    <LocationContext.Provider
      value={{
        locations$,
        locationsItems$,
        locationById$,
        itemsOnLocation$,
        almostExpiredItems$,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
