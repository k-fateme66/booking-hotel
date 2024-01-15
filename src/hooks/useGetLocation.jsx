import React, { useState } from "react";

function useGetLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [postion, setPostion] = useState({});
  const [error, setError] = useState(null);
  function getPostion() {
    if (!navigator.geolocation)
      return setError("Your browser dose not support geoLocation");
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPostion({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setIsLoading(false);
      },
      (error) => {
        setError(message.error);
        setIsLoading(false);
      }
    );
  }
  return { isLoading, postion, error, getPostion };
}

export default useGetLocation;
