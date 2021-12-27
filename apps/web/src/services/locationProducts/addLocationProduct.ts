import { ILocationProduct } from "@fridgespy/types";
import { NavigateFunction } from "react-router-dom";

export const addLocationProduct = (
  args: Partial<ILocationProduct>,
  navigate: NavigateFunction
) => {
  console.log("Adding product to location", args);
  const { product, productType, amount, maximumAmount, minimumAmount } = args;

  // Send a post request to the service, adding the new item

  // On the return, add the product to the list of products we have in the store

  // locationsItems$.next([...locationsItems$.value, addedItem])

  // navigate(-1);
};
