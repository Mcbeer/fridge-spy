import React, { useState } from "react";
import { Card } from "../Card/Card";
import {
  LocationCardContent,
  LocationCardDescription,
  LocationCardIcon,
  LocationCardListElement,
  LocationCardTitle,
} from "./LocationCard.styles";
import { useEffect } from "react";
import { ILocationProduct } from "@fridgespy/types";
import { AiOutlineCamera } from "react-icons/ai";
import { Link } from "react-router-dom";

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
