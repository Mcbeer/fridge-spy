import { ILocation } from "@fridgespy/types";
import React from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Card } from "../Card/Card";
import "./LocationCard.scss";

export const LocationCard = ({ id, name, description }: ILocation) => {
  return (
    <Link to={`/location/${id}`}>
      <section className="LocationCard">
        <Card>
          <div className="LocationCard__content">
            <div className="LocationCard__icon">
              <AiOutlineCamera size="4rem" />
            </div>
            <h2 className="LocationCard__title">{name}</h2>
            <p className="LocationCard__subtitle">{description}</p>
          </div>
        </Card>
      </section>
    </Link>
  );
};
