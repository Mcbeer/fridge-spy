import { ILocationProduct } from "@fridgespy/types";
import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  LocationState,
  selectLocationProducts,
} from "../../store/reducers/locationReducer";
import { Card } from "../Card/Card";
import { LocationItem } from "../LocationItem/LocationItem";
import {
  LocationItemsElement,
  LocationItemsList,
  LocationItemsTitle,
} from "./LocationItems.styles";

interface LocationItemsProps {
  locationName: string;
}

export const LocationItems = ({ locationName }: LocationItemsProps) => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) =>
    selectLocationProducts(
      state.location,
      "7051bd78-bb58-43a0-ad15-dc0e995971fb"
    )
  );

  return (
    <LocationItemsElement>
      <LocationItemsTitle>{locationName ?? "Test Location"}</LocationItemsTitle>
      <Card>
        <LocationItemsList>
          {Object.keys(products).map((key) => {
            return (
              <LocationItem
                key={key}
                {...products[key]}
                locationId="7051bd78-bb58-43a0-ad15-dc0e995971fb"
              />
            );
          })}
        </LocationItemsList>
      </Card>
    </LocationItemsElement>
  );
};

// const locationProducts: { [key: string]: ILocationProduct } = {
//   abcdefg: {
//     id: "abcdefg",
//     product: {
//       id: "product",
//       name: "Nutella",
//     },
//     amount: 4,
//     maximumAmount: 10,
//     minimumAmount: 0,
//     createdAt: "",
//     updatedAt: "",
//   },
//   "1234567": {
//     id: "1234567",
//     productType: {
//       id: "productType",
//       name: "Dåse cola",
//     },
//     amount: 24,
//     maximumAmount: 24,
//     minimumAmount: 12,
//     createdAt: "",
//     updatedAt: "",
//   },
// };
