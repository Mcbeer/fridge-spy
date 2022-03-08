import { ILocationProduct } from "@fridgespy/types";
import React from "react";
import { ImageTooltip } from "../ImageTooltip/ImageTooltip";
import { LocationItemActions } from "./LocationItemActions/LocationItemActions";
import { LocationItemAmount } from "./LocationItemAmount/LocationItemAmount";

export const LocationItem = ({
  id,
  product,
  productType,
  amount,
}: ILocationProduct) => {
  return (
    <li className="LocationItem">
      <ImageTooltip imageUrl="https://m.media-amazon.com/images/M/MV5BNzg0MWEyZjItOTZlMi00YmRjLWEyYzctODIwMDU0OThiMzNkXkEyXkFqcGdeQXVyNjUxMjc1OTM@._V1_.jpg" />
      <div className="LocationItem__text">
        {product && product.name}
        {product && !product.name && productType && productType.name}
      </div>
      <LocationItemAmount amount={amount} setAmount={() => {}} />
      <LocationItemActions productId={id} />
    </li>
  );
};
