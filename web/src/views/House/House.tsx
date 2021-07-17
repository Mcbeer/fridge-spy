import React from "react";
import { useParams } from "react-router";
import { HouseContainer } from "./House.styles";

export const House = () => {
  const { id } = useParams<{ id: string }>();

  // Render a list of almost expired items at the top
  // Render an option to add a location

  // If no locations are found, give the user a meaningful "error" message

  // Otherwise render X number of lists, according to the number of locations
  // The title of each list should be the location name
  // Each list is collapsible (With beautiful animation, IMPORTANT)

  return <HouseContainer>Her er et hus med id: {id}</HouseContainer>;
};
