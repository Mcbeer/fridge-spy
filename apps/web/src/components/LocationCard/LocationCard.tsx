import React from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Card } from "../Card/Card";
import {
  LocationCardContent,
  LocationCardDescription,
  LocationCardIcon,
  LocationCardListElement,
  LocationCardTitle,
} from "./LocationCard.styles";

interface LocationCardProps {
  id: string;
  name: string;
  description: string;
  expanded: boolean;
  setExpanded: () => void;
}

export const LocationCard = ({
  id,
  name,
  description,
  expanded,
  setExpanded,
}: LocationCardProps) => {
  return (
    <Link to={`/location/${id}`}>
      <LocationCardListElement>
        <Card>
          <LocationCardContent>
            <LocationCardIcon>
              <AiOutlineCamera size="4rem" />
            </LocationCardIcon>
            <LocationCardTitle>{name}</LocationCardTitle>
            <LocationCardDescription>{description}</LocationCardDescription>
          </LocationCardContent>
        </Card>
      </LocationCardListElement>
    </Link>
  );
};
