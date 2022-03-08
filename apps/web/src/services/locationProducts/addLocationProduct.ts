import { ILocationProduct } from "@fridgespy/types";
import { authorizedFetch } from "@fridgespy/utils";

export const addLocationProduct = async (
  args: Partial<ILocationProduct>
): Promise<ILocationProduct> => {
  console.log("Adding product to location", args);

  // Send a post request to the service, adding the new item
  return authorizedFetch(
    `http://fridgespy.local:8002/api/v1/locationproducts`,
    {
      body: JSON.stringify(args),
      method: "POST",
    }
  );
};
