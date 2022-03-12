import { ILocationProduct } from "@fridgespy/types";
import { authorizedFetch } from "@fridgespy/utils";
import { useObservablePickState, useObservableState } from "observable-hooks";
import React, { useContext, useEffect, useMemo } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { LocationContext } from "../../context/LocationContext";
import { Button } from "../Button/Button";
import { LocationItem } from "../LocationItem/LocationItem";
import "./LocationItems.scss";

export const LocationItems = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { itemsOnLocation$, locationsItems$ } = useContext(LocationContext);

  const [items] = useObservableState(() => itemsOnLocation$(id!), []);

  useEffect(() => {
    authorizedFetch(
      `http://fridgespy.local:8002/api/v1/locationproducts/${id}`,
      {}
    ).then((products: ILocationProduct[]) => {
      locationsItems$.next(products);
    });
  }, []);

  return (
    <section>
      <div className="LocationItems__top">
        <div className="LocationItems__actions">
          <Button
            onClick={() => navigate("edit/new")}
            label="Add new"
            icon={<AiOutlinePlus size={14} />}
            iconPosition="left"
          />
        </div>
      </div>
      {items.length > 0 && (
        <ul className="LocationItems__list">
          {items.map((product: ILocationProduct) => {
            return <LocationItem key={product.id} {...product} />;
          })}
        </ul>
      )}
      {items.length === 0 && (
        <div className="LocationItems__no-items">
          We found no items on this location, why not add some!
        </div>
      )}
    </section>
  );
};
