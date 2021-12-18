import React from "react";
import { useParams } from "react-router";
import { LocationItems } from "../../components/LocationItems/LocationItems";
import { PageTitle } from "../../components/PageTitle/PageTitle";

export const Location = () => {
  const { id } = useParams<string>();

  return (
    <section>
      <PageTitle>Location</PageTitle>
      <LocationItems />
    </section>
  );
};
