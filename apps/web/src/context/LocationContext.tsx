import { ILocation, ILocationProduct } from "@fridgespy/types";
import React, { createContext } from "react";
import { BehaviorSubject, combineLatestWith, map } from "rxjs";

const location$ = new BehaviorSubject<ILocation[]>([]);

const locationItems$ = new BehaviorSubject<ILocationProduct[]>([]);

const locationWithItems$ = location$.pipe(
  combineLatestWith(locationItems$),
  map(([locations, locationItems]) => {
    return locations.map((location: ILocation) => {
      return {
        ...location,
        products: locationItems.filter(
          (locationItem: ILocationProduct) =>
            locationItem.locationId === location.id
        ),
      };
    });
  })
);

export const LocationContext = createContext(locationWithItems$);

export const LocationProvider: React.FunctionComponent = ({ children }) => {
  return (
    <LocationContext.Provider value={locationWithItems$}>
      {children}
    </LocationContext.Provider>
  );
};
