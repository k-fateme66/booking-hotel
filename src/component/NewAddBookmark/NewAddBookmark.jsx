import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocationUrl from "../../hooks/useLocationUrl";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";
import Loader from "../../Loader/Loader";
import { useBookmarks } from "../../context/BookmarksProvider";
import { HiArrowNarrowLeft } from "react-icons/hi";

function NewAddBookmark() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeoLocation, setIsLoadingGeoLocation] = useState(false);
  const [errorGeoLocation, setErrorGeoLocation] = useState(null);
  const [lat, lng] = useLocationUrl();
  const navigate = useNavigate();
  const { createBookmark, bookmarks } = useBookmarks();
  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

  const handleBack = (event) => {
    event.preventDefault();
    navigate(-1);
  };
  const habdleSubmit = async (event) => {
    event.preventDefault();
    const newBookmark = {
      cityName,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityName + " " + country,
    };
    await createBookmark(newBookmark);
    navigate("/bookmark");
  };

  useEffect(() => {
    if (!lat && !lng) return;

    async function getLocation() {
      setIsLoadingGeoLocation(true);
      setErrorGeoLocation(null);
      try {
        const { data } = await axios.get(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}`
        );
        if (!data.countryCode)
          throw new Error(
            "this location is not a city! please click somewhere else."
          );
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
      } catch (error) {
        setErrorGeoLocation(error.message);
      } finally {
        setIsLoadingGeoLocation(false);
      }
    }
    getLocation();
  }, [lat, lng]);
  if (isLoadingGeoLocation) return <Loader />;
  if (errorGeoLocation) return <p>{errorGeoLocation}</p>;
  return (
    <div>
      <h2>Bookmark New Location</h2>
      <form className="form" onSubmit={habdleSubmit}>
        <div className="formControl">
          <label htmlFor="cityName">City Name</label>
          <input
            type="text"
            name="cityName"
            id="cityName"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </div>
        <div className="formControl">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            name="country"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <ReactCountryFlag svg countryCode={countryCode} className="flag" />
        </div>
        <div className="buttons">
          <button onClick={handleBack} className="btn btn--back">
            <HiArrowNarrowLeft className="icon" />
            Back
          </button>
          <button className="btn btn--primary">Add</button>
        </div>
      </form>
    </div>
  );
}

export default NewAddBookmark;
