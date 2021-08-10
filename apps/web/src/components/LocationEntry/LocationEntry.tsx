import React, { useState } from "react";
import { Card } from "../Card/Card";
import {
  LocationEntryContent,
  LocationEntryItemList,
  LocationEntryTitle,
} from "./LocationEntry.styles";
import { useEffect } from "react";
import AnimateHeight from "react-animate-height";

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
            {locationEntriesDummy.map((l, index) => (
              <li key={index + 1}>{l}</li>
            ))}
          </LocationEntryItemList>
        </AnimateHeight>
      </Card>
    </LocationEntryContent>
  );
};

const locationEntriesDummy = [
  "Location entry",
  "Location entry",
  "Location entry",
  "Location entry",
  "Location entry",
  "Location entry",
  "Location entry",
  "Location entry",
  "Location entry",
  "Location entry",
  "Location entry",
];
