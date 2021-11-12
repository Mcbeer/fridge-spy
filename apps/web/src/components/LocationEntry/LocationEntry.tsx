import { ILocationProduct } from "@fridgespy/types";
import React from "react";
import { useParams } from "react-router";
import { Card } from "../Card/Card";
import {
  LocationEntryElement,
  LocationEntryList,
  LocationEntryTitle,
} from "./LocationEntry.styles";
import { LocationEntryItem } from "./LocationEntryItem/LocationEntryItem";

interface LocationEntryProps {
  locationName: string;
}

export const LocationEntry = ({ locationName }: LocationEntryProps) => {
  return (
    <LocationEntryElement>
      <Card>
        <LocationEntryTitle>{locationName}</LocationEntryTitle>
        <LocationEntryList>
          {Object.keys(locationProducts).map((key) => {
            return <LocationEntryItem key={key} {...locationProducts[key]} />;
          })}
        </LocationEntryList>
      </Card>
    </LocationEntryElement>
  );
};

const locationProducts: { [key: string]: ILocationProduct } = {
  abcdefg: {
    id: "abcdefg",
    product: {
      id: "product",
      name: "Nutella",
    },
    amount: 4,
    maximumAmount: 10,
    minimumAmount: 0,
    createdAt: "",
    updatedAt: "",
  },
  "1234567": {
    id: "1234567",
    productType: {
      id: "productType",
      name: "Dåse cola",
    },
    amount: 24,
    maximumAmount: 250,
    minimumAmount: 12,
    createdAt: "",
    updatedAt: "",
  },
};
