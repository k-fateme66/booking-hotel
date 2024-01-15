import React from "react";
import useFetch from "../../hooks/useFetch";
import Loader from "../../Loader/Loader";
import { Link } from "react-router-dom";

function LocationList() {
  const { data, isLoding } = useFetch("http://localhost:5000/hotels", "");
  if (isLoding) return <Loader />;
  return (
    <div className="nearbyLocation">
      <h2>Nearby Locations</h2>
      <div className="locationList">
        {data.map((item) => {
          return (
            <Link
              to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
              key={item.id}
            >
              <div className="locationItem" key={item.id}>
                <img src={item.picture_url.url} alt={item.name} />
                <div className="locationItemDesc">
                  <p className="location">{item.smart_location}</p>
                  <p className="name">{item.name}</p>
                  <p className="price">
                    €&nbsp;{item.price}&nbsp;<span>night</span>
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default LocationList;
