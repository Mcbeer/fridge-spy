import { ILocationProduct } from "@fridgespy/types";
import React, { useCallback } from "react";
import { useAppDispatch } from "../../store/hooks";
import { locationActions } from "../../store/reducers/locationReducer";
import { ImageTooltip } from "../ImageTooltip/ImageTooltip";
import {
  LocationItemElement,
  LocationItemProductDisplay,
} from "./LocationItem.styles";
import { LocationItemActions } from "./LocationItemActions/LocationItemActions";
import { LocationItemAmount } from "./LocationItemAmount/LocationItemAmount";

export const LocationItem = ({
  id,
  product,
  productType,
  amount,
  locationId,
}: ILocationProduct) => {
  const dispatch = useAppDispatch();

  const handleSetAmount = useCallback((newAmount: number) => {
    if (locationId)
      dispatch(
        locationActions.setProductAmount({
          locationId,
          productId: id,
          amount: newAmount,
        })
      );
  }, []);

  return (
    <LocationItemElement>
      <ImageTooltip imageUrl="https://m.media-amazon.com/images/M/MV5BNzg0MWEyZjItOTZlMi00YmRjLWEyYzctODIwMDU0OThiMzNkXkEyXkFqcGdeQXVyNjUxMjc1OTM@._V1_.jpg" />
      <LocationItemProductDisplay>
        <>
          {product && product.name}
          {productType && productType.name}
        </>
      </LocationItemProductDisplay>
      <LocationItemAmount amount={amount} setAmount={handleSetAmount} />
      <LocationItemActions productId={id} />
    </LocationItemElement>
  );
};
