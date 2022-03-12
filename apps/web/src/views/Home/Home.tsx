import { useObservableGetState, useObservableState } from "observable-hooks";
import React, { useCallback, useContext, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/Card/Card";
import { LocationCard } from "../../components/LocationCard/LocationCard";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { LocationContext } from "../../context/LocationContext";
import { fetchLocations } from "../../services/location";
import "./Home.scss";

export const Home = () => {
  const navigate = useNavigate();
  const { locations$ } = useContext(LocationContext);
  const locations = useObservableGetState(locations$, []);

  useEffect(() => {
    // Fetch locations for the user
    fetchLocations(locations$);
  }, []);

  const handleAddLocation = useCallback(() => {
    navigate("/location/new");
  }, []);

  return (
    <section className="Home">
      <PageTitle>Home</PageTitle>
      <ul className="Home__list">
        <li className="Home__list-item" onClick={handleAddLocation}>
          <Card>
            <div className="Home__card">
              <div className="Home__card-icon">
                <AiOutlinePlus size="4rem" />
              </div>
              <h2 className="Home__card-title">Add Location</h2>
              <p className="Home__card-subtitle">&nbsp;</p>
            </div>
          </Card>
        </li>
        {locations.map((location) => (
          <LocationCard {...location} key={location.id} />
        ))}
      </ul>
    </section>
  );
};
