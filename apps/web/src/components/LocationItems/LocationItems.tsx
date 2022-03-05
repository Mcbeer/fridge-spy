import { ILocationProduct } from "@fridgespy/types";
import { useObservablePickState, useObservableState } from "observable-hooks";
import React, { useContext, useMemo } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { LocationContext } from "../../context/LocationContext";
import { Button } from "../Button/Button";
import { LocationItem } from "../LocationItem/LocationItem";

export const LocationItems = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { itemsOnLocation$ } = useContext(LocationContext);

  const [items] = useObservableState(() => itemsOnLocation$(id!), []);

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center justify-evenly">
          <Button
            onClick={() => navigate("edit/new")}
            label="Add new"
            icon={<AiOutlinePlus size={14} />}
            iconPosition="left"
          />
        </div>
      </div>
      {items.length > 0 && (
        <ul className="flex flex-col justify-center gap-2">
          {items.map((product: ILocationProduct) => {
            return <LocationItem key={product.id} {...product} />;
          })}
        </ul>
      )}
      {items.length === 0 && (
        <div className="text-center">
          We found no items on this location, why not add some!
        </div>
      )}
    </section>
  );
};
