import { ILocationProduct } from "@fridgespy/types";
import { authorizedFetch, perhaps } from "@fridgespy/utils";
import { BehaviorSubject } from "rxjs";

export const addLocationProduct = async (
  args: Partial<ILocationProduct>,
  locationItems$: BehaviorSubject<ILocationProduct[]>
): Promise<void> => {
  // Send a post request to the service, adding the new item
  const [addError, addedLocationProduct] = await perhaps<ILocationProduct>(
    authorizedFetch(`http://fridgespy.local:8002/api/v1/locationproducts`, {
      body: JSON.stringify(args),
      method: "POST",
    })
  );

  if (addError) {
    console.error(addError);
    return;
  }

  if (!addedLocationProduct) {
    console.error("No location product found");
    return;
  }

  // Update the location items
  locationItems$.next([...locationItems$.value, addedLocationProduct]);
};
