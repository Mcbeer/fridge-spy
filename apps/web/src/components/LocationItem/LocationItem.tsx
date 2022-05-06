import { ILocationProduct } from "@fridgespy/types";
import React, { memo } from "react";
import { ImageTooltip } from "../ImageTooltip/ImageTooltip";
import { LocationItemActions } from "./LocationItemActions/LocationItemActions";
import { LocationItemAmount } from "./LocationItemAmount/LocationItemAmount";
import "./LocationItem.scss";

export const LocationItem = memo(
  ({ id, product, productType, amount }: ILocationProduct) => {
    return (
      <li className="LocationItem">
        <ImageTooltip imageUrl="https://m.media-amazon.com/images/M/MV5BNzg0MWEyZjItOTZlMi00YmRjLWEyYzctODIwMDU0OThiMzNkXkEyXkFqcGdeQXVyNjUxMjc1OTM@._V1_.jpg" />
        <div className="LocationItem__text">
          {product && product.name}
          {product && !product.name && productType && productType.name}
        </div>
        <LocationItemAmount id={id} amount={amount} />
        <LocationItemActions productId={id} />
      </li>
    );
  }
);
