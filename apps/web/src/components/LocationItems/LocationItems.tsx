import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Button } from "../Button/Button";
import { Card } from "../Card/Card";
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
          {Object.keys([]).map((key) => {
            return (
              // <LocationItem
              //   key={key}
              //   {...products[key]}
              //   locationId="7051bd78-bb58-43a0-ad15-dc0e995971fb"
              // />
              null
            );
          })}
        </LocationItemsList>
      </Card>
    </LocationItemsElement>
  );
};
