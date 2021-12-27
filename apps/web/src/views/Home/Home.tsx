import { useObservableGetState, useObservableState } from "observable-hooks";
import React, { useCallback, useContext, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/Card/Card";
import { LocationCard } from "../../components/LocationCard/LocationCard";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { LocationContext } from "../../context/LocationContext";

export const Home = () => {
  const navigate = useNavigate();
  const { locations$ } = useContext(LocationContext);
  const locations = useObservableGetState(locations$, []);

  const handleAddLocation = useCallback(() => {
    navigate("/location/new");
  }, []);

  return (
    <section className="h-full relative grid grid-rows-[3rem_1fr]">
      <PageTitle>Home</PageTitle>

      <ul className="list-none grid grid-cols-3 grid-rows-3 gap-4">
        <li
          className="cursor-pointer hover:scale-105 transition-all"
          onClick={handleAddLocation}
        >
          <Card>
            <div className="grid grid-rows-[12rem_2rem_1.5rem]">
              <div className="flex items-center justify-center">
                <AiOutlinePlus size="4rem" />
              </div>
              <h2 className="flex h-full items-center justify-center text-lg font-bold">
                Add Location
              </h2>
              <p className="text-lg flex justify-center whitespace-nowrap overflow-hidden text-ellipsis">
                &nbsp;
              </p>
            </div>
          </Card>
        </li>
        {locations.map((location) => (
          <LocationCard {...location} key={location.id} />
        ))}
      </ul>
    </section>
  );
};
