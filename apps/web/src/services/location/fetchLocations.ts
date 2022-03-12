import { ILocation } from "@fridgespy/types";
import { authorizedFetch, perhaps } from "@fridgespy/utils";
import { BehaviorSubject } from "rxjs";

export const fetchLocations = async (
  locations$: BehaviorSubject<ILocation[]>
) => {
  if (locations$.value.length > 0) {
    return;
  }

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
