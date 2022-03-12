import { IProduct } from "@fridgespy/types";
import { authorizedFetch, perhaps } from "@fridgespy/utils";
import { BehaviorSubject } from "rxjs";

export const fetchProducts = async (
  productIds: string[] = [],
  products$: BehaviorSubject<IProduct[]>
) => {
  if (products$.value.length > 0) {
    return;
  }

  const withProductIds =
    productIds.length > 0 ? "?products=" + JSON.stringify(productIds) : "";

  const [locationsError, locations] = await perhaps<IProduct[]>(
    authorizedFetch(
      `http://fridgespy.local:8000/api/v1/product${withProductIds}`,
      {}
    )
  );

  if (locationsError) {
    console.error(locationsError);
    return;
  }
  if (!locations) {
    console.error("No locations found");
    return;
  }

  products$.next(locations);
};
