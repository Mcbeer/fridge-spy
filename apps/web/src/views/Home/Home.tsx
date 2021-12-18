import { useObservableGetState, useObservableState } from "observable-hooks";
import React, { useContext, useEffect } from "react";
import { HomeEntry } from "../../components/HomeEntry/HomeEntry";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { fetchHouses, HouseContext } from "../../context/HouseContext";

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
    <section className="h-full relative grid grid-rows-[3rem_1fr]">
      <PageTitle>Home</PageTitle>
      {!housesStatus.loading && houses.length > 0 && (
        <ul className="list-none grid grid-cols-3 grid-rows-3 gap-4">
          {houses.map((home) => (
            <HomeEntry key={home.id} {...home} />
          ))}
        </ul>
      )}
      {housesStatus.loading && <div>I am loading your houses...</div>}
      {houses.length === 0 && (
        <div className="flex justify-center items-center">
          <h2 className="text-xl opacity-70">No houses found, add one now!</h2>
        </div>
      )}
    </section>
  );
};
