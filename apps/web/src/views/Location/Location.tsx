import { useObservableGetState } from "observable-hooks";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { LocationItems } from "../../components/LocationItems/LocationItems";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { LocationContext } from "../../context/LocationContext";
import "./Location.scss";

export const Location = () => {
  const { id } = useParams();
  const { locationById$ } = useContext(LocationContext);
  const location = useObservableGetState(locationById$(id!), null);

  return (
    <section>
      <PageTitle>{location?.name ?? "Lokation"}</PageTitle>
      <LocationItems />
    </section>
  );
};
