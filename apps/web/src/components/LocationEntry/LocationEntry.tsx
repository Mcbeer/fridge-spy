import React, { useState } from "react";
import { Card } from "../Card/Card";
import {
  LocationEntryContent,
  LocationEntryItemList,
  LocationEntryTitle,
} from "./LocationEntry.styles";
import { useEffect } from "react";
import AnimateHeight from "react-animate-height";
import { ILocationProduct } from "@fridgespy/types";
import { LocationEntryItem } from "./LocationEntryItem/LocationEntryItem";

interface LocationEntryProps {
  id: string;
  name: string;
  description: string;
  expanded: boolean;
  setExpanded: () => void;
}

export const LocationEntry = ({
  id,
  name,
  description,
  expanded,
  setExpanded,
}: LocationEntryProps) => {
  const [height, setHeight] = useState<any>(0);

  useEffect(() => {
    setHeight(expanded ? "auto" : 0);
  }, [expanded]);

  return (
    <LocationEntryContent>
      <Card onClick={() => setExpanded()}>
        <LocationEntryTitle>
          {name} {description}
        </LocationEntryTitle>
        <AnimateHeight duration={300} height={height}>
          <LocationEntryItemList>
            {locationEntriesDummy.map((item) => (
              <LocationEntryItem key={item.id} {...item} />
            ))}
          </LocationEntryItemList>
        </AnimateHeight>
      </Card>
    </LocationEntryContent>
  );
};

const locationEntriesDummy: ILocationProduct[] = [
  {
    id: 'abcdefg',
    product: {
      id: 'product',
      name: 'Nutella'
    },
    amount: 9,
    maximumAmount: 10,
    minimumAmount: 0,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: '1234567',
    productType: {
      id: 'productType',
      name: 'Dåse cola'
    },
    amount: 24,
    maximumAmount: 250,
    minimumAmount: 12,
    createdAt: '',
    updatedAt: '',
  }
];
