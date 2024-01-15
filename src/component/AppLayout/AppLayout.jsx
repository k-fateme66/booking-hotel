import React from "react";
import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useHotels } from "../../context/HotelsProvider";

function AppLayout() {
  const { hotels } = useHotels();
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <div className="mapContainer">
        <Map markerLocations={hotels} />
      </div>
    </div>
  );
}

export default AppLayout;
