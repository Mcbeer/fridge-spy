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
  },
  {
    id: "8be5865f-1f8d-4f16-b4b4-fdf479f68e6d",
    name: "Vestervænget 6",
  },
];
