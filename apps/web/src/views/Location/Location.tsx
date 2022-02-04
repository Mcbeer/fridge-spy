import React from "react";
import { LocationItems } from "../../components/LocationItems/LocationItems";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import "./Location.scss";

export const Location = () => {
  return (
    <section>
      <PageTitle>Location</PageTitle>
      <LocationItems />
    </section>
  );
};
