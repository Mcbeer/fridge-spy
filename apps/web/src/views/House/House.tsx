import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { LocationEntry } from "../../components/LocationEntry/LocationEntry";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { HouseSection, HouseLocationList } from "./House.styles";

export const House = () => {
  const { id } = useParams<{ id: string }>();
  const [expandedLocation, setExpandedLocation] = useState<string>(
    "386cce06-dafb-47d0-b029-d74ca195470b"
  );

  // Render a list of almost expired items at the top
  // Render an option to add a location

  // If no locations are found, give the user a meaningful "error" message

  // Otherwise render X number of lists, according to the number of locations
  // The title of each list should be the location name
  // Each list is collapsible (With beautiful animation, IMPORTANT)

  return (
    <HouseSection>
      <PageTitle>{house.name}</PageTitle>
      <HouseLocationList>
        {locations.map((location) => (
          <LocationEntry
            {...location}
            expanded={expandedLocation === location.id}
            setExpanded={() => setExpandedLocation(location.id)}
            key={location.id}
          />
        ))}
      </HouseLocationList>
    </HouseSection>
  );
};

const house = {
  name: "Bordingsvej 7",
};

const locations = [
  {
    id: "583d9533-216d-4329-8d7a-f77c49b8e06a",
    name: "Køleskab",
    description: "Køleskab i køkkenet",
  },
  {
    id: "386cce06-dafb-47d0-b029-d74ca195470b",
    name: "Fryser",
    description: "Fryser i køkkenet",
  },
  {
    id: "2fb9fe2f-5616-4bb7-8d11-09aa5b1a09ee",
    name: "Fryser",
    description: "Fryser i garagen",
  },
];
