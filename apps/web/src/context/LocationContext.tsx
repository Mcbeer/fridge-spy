import { ILocation, ILocationProduct } from "@fridgespy/types";
import { authorizedFetch, perhaps } from "@fridgespy/utils";
import React, { createContext, useEffect } from "react";
import {
  BehaviorSubject,
  combineLatestWith,
  filter,
  map,
  Observable,
} from "rxjs";

export interface ILocationWithProducts extends ILocation {
  products: ILocationProduct[];
}

const locations$ = new BehaviorSubject<ILocation[]>([]);

export const locationsItems$ = new BehaviorSubject<ILocationProduct[]>([
  {
    id: "3d081987-efa5-4da7-8c0f-75d1853babcd",
    product: {
      id: "3d081987-efa5-4da7-8c0f-75d1853babcd",
      name: "Test Product",
    },
    productType: undefined,
    locationId: "ae671d29-e15d-4a19-9e93-29c50d3cec48",
    amount: 4,
    createdAt: "",
    updatedAt: "",
    maximumAmount: 10,
    minimumAmount: 1,
  },
]);

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
  useEffect(() => {
    fetchLocations();
  }, []);

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

export const addLocation = async ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
  const [addLocationError, location] = await perhaps<ILocation>(
    authorizedFetch(`http://fridgespy.local:8002/api/v1/location`, {
      method: "POST",
      body: JSON.stringify({ name, description }),
    })
  );

  if (addLocationError) {
    console.error(addLocationError);
    return;
  }
  if (!location) {
    console.error("No house found");
    return;
  }

  locations$.next([...locations$.value, location]);
};

export const fetchLocations = async () => {
  const [locationsError, locations] = await perhaps<ILocation[]>(
    authorizedFetch(`http://fridgespy.local:8002/api/v1/location`, {})
  );

  if (locationsError) {
    console.error(locationsError);
    return;
  }
  if (!locations) {
    console.error("No locations found");
    return;
  }

  locations$.next(locations);
};
