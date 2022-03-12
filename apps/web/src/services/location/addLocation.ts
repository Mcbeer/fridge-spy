import { ILocation } from "@fridgespy/types";
import { authorizedFetch, perhaps } from "@fridgespy/utils";
import { BehaviorSubject } from "rxjs";

interface AddLocationArgs {
  name: string;
  description: string;
  locations$: BehaviorSubject<ILocation[]>;
}

export const addLocation = async ({
  name,
  description,
  locations$,
}: AddLocationArgs) => {
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
