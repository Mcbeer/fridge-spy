import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { LocationItems } from "../../components/LocationItems/LocationItems";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import {
  LocationState,
  selectLocation,
} from "../../store/reducers/locationReducer";

export const Location = () => {
  const { id } = useParams<string>();
  const location = useSelector((state: LocationState) =>
    selectLocation(state, id || "")
  );

  return (
    <section className="Location">
      <PageTitle>Location</PageTitle>
      <LocationItems locationName={location?.name} />
    </section>
  );
};
