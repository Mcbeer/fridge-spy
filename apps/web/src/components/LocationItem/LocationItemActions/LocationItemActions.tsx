import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router";
import { Button } from "../../Button/Button";
import {
  LocationItemActionsButton,
  LocationItemActionsElement,
} from "./LocationItemActions.styles";

type LocationItemActionsProps = {
  productId: string;
};

export const LocationItemActions = ({
  productId,
}: LocationItemActionsProps) => {
  const navigate = useNavigate();
  return (
    <LocationItemActionsElement>
      <LocationItemActionsButton onClick={() => navigate(`edit/${productId}`)}>
        <AiOutlineEdit size="1.5rem" />
      </LocationItemActionsButton>
      <LocationItemActionsButton onClick={() => console.log("Delete item")}>
        <AiOutlineDelete size="1.5rem" />
      </LocationItemActionsButton>
    </LocationItemActionsElement>
  );
};
