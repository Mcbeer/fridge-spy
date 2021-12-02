import { ILocation } from "@fridgespy/types";
import React, { createContext } from "react";
import { BehaviorSubject } from "rxjs";

const location$ = new BehaviorSubject<ILocation[]>([]);

export const LocationContext = createContext(location$);

export const LocationProvider: React.FunctionComponent = ({ children }) => {
  return (
    <LocationContext.Provider value={location$}>
      {children}
    </LocationContext.Provider>
  );
};
