import React from "react";
import Map from "../Map/Map";
import { Outlet } from "react-router-dom";
import { useBookmarks } from "../../context/BookmarksProvider";

function BookmarkLayout() {
  const { bookmarks } = useBookmarks();
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <div className="mapContainer">
        <Map markerLocations={bookmarks} />
      </div>
    </div>
  );
}

export default BookmarkLayout;
