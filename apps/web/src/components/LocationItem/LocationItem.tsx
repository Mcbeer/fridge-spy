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
  locationId,
}: ILocationProduct) => {
  return (
    <li
      className={`grid grid-cols-[_1.5rem_1fr_6rem_6rem] gap-2 relative items-center h-8 after:content-[''] after:absolute after:bottom-[_-0.2rem] after:right-0 after:left-0 after:h-[_1px] after:bg-gradient-to-r after:from-teal-700 after:to-teal-400
      first-of-type:before:content-[''] first-of-type:before:absolute first-of-type:before:top-[_-0.2rem] first-of-type:before:right-0 first-of-type:before:left-0 first-of-type:before:h-[_1px] first-of-type:before:bg-gradient-to-r first-of-type:before:from-teal-700 first-of-type:before:to-teal-400`}
    >
      <ImageTooltip imageUrl="https://m.media-amazon.com/images/M/MV5BNzg0MWEyZjItOTZlMi00YmRjLWEyYzctODIwMDU0OThiMzNkXkEyXkFqcGdeQXVyNjUxMjc1OTM@._V1_.jpg" />
      <div className="text-lg">
        {product && product.name}
        {!product && productType && productType.name}
      </div>
      <LocationItemAmount amount={amount} setAmount={() => {}} />
      <LocationItemActions productId={id} />
    </li>
  );
};
