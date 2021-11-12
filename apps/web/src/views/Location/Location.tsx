import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { LocationEntry } from "../../components/LocationEntry/LocationEntry";
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
  console.log(id);
  console.log(location);
  return (
    <section className="Location">
      <PageTitle>Location</PageTitle>
      <LocationEntry locationName={location?.name} />
    </section>
  );
};
