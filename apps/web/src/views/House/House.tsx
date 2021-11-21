import React, { useState } from "react";
import { Card } from "../../components/Card/Card";
import { LocationCard } from "../../components/LocationCard/LocationCard";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import "./House.scss";

export const House = () => {
  // const { id } = useParams<{ id: string }>();
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
    <section>
      <PageTitle>{house.name}</PageTitle>
      <ul className="House__almost-expired-items">
        <Card>
          <h3>Almost expired items</h3>
        </Card>
      </ul>
      <ul className="House__location-list">
        {locations.map((location) => (
          <LocationCard
            {...location}
            expanded={expandedLocation === location.id}
            setExpanded={() => setExpandedLocation(location.id)}
            key={location.id}
          />
        ))}
      </ul>
    </section>
  );
};

const house = {
  name: "Bordingsvej 7",
};

const locations = [
  {
    id: "7051bd78-bb58-43a0-ad15-dc0e995971fb",
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
