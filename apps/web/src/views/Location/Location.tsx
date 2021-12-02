import React from "react";
import { useParams } from "react-router";
import { LocationItems } from "../../components/LocationItems/LocationItems";
import { PageTitle } from "../../components/PageTitle/PageTitle";

export const Location = () => {
  const { id } = useParams<string>();

  console.log(id);

  return (
    <section className="Location">
      <PageTitle>Location</PageTitle>
      <LocationItems locationName={"Test"} />
    </section>
  );
};
