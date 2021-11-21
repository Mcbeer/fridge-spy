import React from "react";
import { useParams } from "react-router";
import { LocationItems } from "../../components/LocationItems/LocationItems";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { useAppSelector } from "../../store/hooks";
import { selectLocation } from "../../store/reducers/locationReducer";

export const Location = () => {
  const { id } = useParams<string>();
  const location = useAppSelector((state) =>
    selectLocation(state.location, id || "")
  );

  console.log(location);

  return (
    <section className="Location">
      <PageTitle>Location</PageTitle>
      <LocationItems locationName={location?.name} />
    </section>
  );
};
