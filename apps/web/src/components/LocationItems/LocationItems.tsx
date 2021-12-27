import { ILocationProduct } from "@fridgespy/types";
import { useObservableState } from "observable-hooks";
import React, { useContext, useMemo } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { LocationContext } from "../../context/LocationContext";
import { Button } from "../Button/Button";
import { LocationItem } from "../LocationItem/LocationItem";

export const LocationItems = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { locationsItems$ } = useContext(LocationContext);
  const items = useObservableState(locationsItems$, []);

  const getItemsOnLocation = useMemo(() => {
    return items.filter((item) => item.locationId === id);
  }, [id]);

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
      <ul className="flex flex-col justify-center gap-2">
        {getItemsOnLocation.map((product: ILocationProduct) => {
          return <LocationItem key={product.id} {...product} />;
        })}
      </ul>
    </section>
  );
};
