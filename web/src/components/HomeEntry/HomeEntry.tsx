import React from "react";
import { Card } from "../Card/Card";
import { HomeEntryListElement } from "./HomeEntry.styles";

interface HomeEntryProps {
  id: string;
  name: string;
  countryCode: string;
}

// Get number of locations in this home
// A location could be a fridge, a freezer, or a pantry, or even a drawer...

export const HomeEntry = ({ id, name, countryCode }: HomeEntryProps) => {
  // Get the locations for this home - Render it async
  // Get the members on this home - Render it async
  // Always render the data we already have - ie. name and country...

  return (
    <HomeEntryListElement>
      <Card>
        {name} {countryCode}
      </Card>
    </HomeEntryListElement>
  );
};
