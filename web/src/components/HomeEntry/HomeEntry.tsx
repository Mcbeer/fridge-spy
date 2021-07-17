import React from "react";
import { AiOutlineCaretRight, AiOutlineHome } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { Card } from "../Card/Card";
import {
  HomeEntryCallToAction,
  HomeEntryContent,
  HomeEntryHomeIcon,
  HomeEntryListElement,
  HomeEntryText,
} from "./HomeEntry.styles";

interface HomeEntryProps {
  id: string;
  name: string;
  countryCode: string;
}

// Get number of locations in this home
// A location could be a fridge, a freezer, or a pantry, or even a drawer...

export const HomeEntry = ({ id, name, countryCode }: HomeEntryProps) => {
  const history = useHistory();
  // Get the locations for this home - Render it async
  const locations = 2;
  // Get the members on this home - Render it async
  // Always render the data we already have - ie. name and country...

  const handleElementClick = () => {
    history.push("/house/" + id);
  };

  return (
    <HomeEntryListElement onClick={handleElementClick}>
      <Card>
        <HomeEntryContent>
          <HomeEntryHomeIcon>
            <AiOutlineHome size="1.5rem" />
          </HomeEntryHomeIcon>
          <HomeEntryText>{name}</HomeEntryText>
          <HomeEntryText>
            {locations} {locations > 1 ? "Locations" : "Location"}
          </HomeEntryText>
          <HomeEntryCallToAction>
            <AiOutlineCaretRight size="1.5rem" />
          </HomeEntryCallToAction>
        </HomeEntryContent>
      </Card>
    </HomeEntryListElement>
  );
};
