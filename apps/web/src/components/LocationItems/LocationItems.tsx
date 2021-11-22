import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectLocationProducts } from "../../store/reducers/locationReducer";
import { Button } from "../Button/Button";
import { Card } from "../Card/Card";
import { LocationItem } from "../LocationItem/LocationItem";
import {
  LocationItemsActions,
  LocationItemsElement,
  LocationItemsList,
  LocationItemsTitle,
  LocationItemsTop,
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
      <LocationItemsTop>
        <LocationItemsTitle>
          {locationName ?? "Test Location"}
        </LocationItemsTitle>
        <LocationItemsActions>
          <Button
            onClick={() => {}}
            label="Add new item"
            icon={<AiOutlinePlus size={14} />}
            iconPosition="left"
          />
        </LocationItemsActions>
      </LocationItemsTop>
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
