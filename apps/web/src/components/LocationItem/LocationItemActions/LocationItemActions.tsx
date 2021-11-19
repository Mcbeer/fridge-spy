import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Button } from "../../Button/Button";
import {
  LocationItemActionsButton,
  LocationItemActionsElement,
} from "./LocationItemActions.styles";

export const LocationItemActions = () => (
  <LocationItemActionsElement>
    <LocationItemActionsButton onClick={() => console.log("Edit item")}>
      <AiOutlineEdit size="1.5rem" />
    </LocationItemActionsButton>
    <LocationItemActionsButton onClick={() => console.log("Delete item")}>
      <AiOutlineDelete size="1.5rem" />
    </LocationItemActionsButton>
  </LocationItemActionsElement>
);
