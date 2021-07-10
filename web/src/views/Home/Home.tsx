import React from "react";
import { HomeEntry } from "../../components/HomeEntry/HomeEntry";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { HomeList, HomeSection } from "./Home.styles";

export const Home = () => (
  <HomeSection>
    <PageTitle>Home</PageTitle>
    <HomeList>
      {homes.map((home) => (
        <HomeEntry key={home.id} {...home} />
      ))}
    </HomeList>
  </HomeSection>
);

const homes = [
  {
    id: "1e57cac1-1749-4b5b-a2ab-05e99127e143",
    name: "Bordingsvej 7",
    countryCode: "DK",
  },
];
