import { useObservableGetState, useObservableState } from "observable-hooks";
import React, { useContext, useEffect } from "react";
import { HomeEntry } from "../../components/HomeEntry/HomeEntry";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { fetchHouses, HouseContext } from "../../context/HouseContext";
import {
  HomeList,
  HomeNoHouses,
  HomeNoHousesText,
  HomeSection,
} from "./Home.styles";

export const Home = () => {
  const { houses$, housesStatus$ } = useContext(HouseContext);
  const houses = useObservableState(houses$, []);
  const housesStatus = useObservableGetState(housesStatus$, {
    loading: false,
    error: null,
  });

  useEffect(() => {
    // Fetch houses, and run a .next on the houses$ observable
    (async () => {
      await fetchHouses();
    })();
  }, []);

  return (
    <HomeSection>
      <PageTitle>Home</PageTitle>
      {!housesStatus.loading && houses.length > 0 && (
        <HomeList>
          {houses.map((home) => (
            <HomeEntry key={home.id} {...home} />
          ))}
        </HomeList>
      )}
      {housesStatus.loading && <div>I am loading your houses...</div>}
      {houses.length === 0 && (
        <HomeNoHouses>
          <HomeNoHousesText>No houses found, add one now!</HomeNoHousesText>
        </HomeNoHouses>
      )}
    </HomeSection>
  );
};
