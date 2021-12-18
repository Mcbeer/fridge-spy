import React from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Card } from "../Card/Card";

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
      <section className="transition-all hover:scale-105">
        <Card>
          <div className="grid grid-rows-[12rem_2rem_1.5rem]">
            <div className="flex items-center justify-center">
              <AiOutlineCamera size="4rem" />
            </div>
            <h2 className="flex h-full items-center justify-center text-lg font-bold">
              {name}
            </h2>
            <p className="text-lg flex justify-center whitespace-nowrap overflow-hidden text-ellipsis">
              {description}
            </p>
          </div>
        </Card>
      </section>
    </Link>
  );
};
