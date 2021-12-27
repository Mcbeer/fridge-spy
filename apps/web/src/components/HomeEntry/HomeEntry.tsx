import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Card } from "../Card/Card";

interface HomeEntryProps {
  id: string;
  name: string;
}

// Get number of locations in this home
// A location could be a fridge, a freezer, or a pantry, or even a drawer...

export const HomeEntry = ({ id, name }: HomeEntryProps) => {
  const navigate = useNavigate();
  // Get the locations for this home - Render it async
  const locations = 2;
  // Get the members on this home - Render it async
  // Always render the data we already have - ie. name and country...

  const handleElementClick = (): void => {
    navigate("/house/" + id);
  };

  return (
    <li
      className="cursor-pointer hover:scale-105 transition-all"
      onClick={handleElementClick}
    >
      <Card>
        <div className="grid items-center grid-rows-[_12rem_1fr_1fr_10%]">
          <span className="flex justify-center items-center">
            <AiOutlineHome size="6rem" />
          </span>
          <p className="flex h-full items-center cursor-pointer">{name}</p>
        </div>
      </Card>
    </li>
  );
};
