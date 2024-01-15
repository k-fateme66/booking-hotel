import React from "react";
import { useSearchParams } from "react-router-dom";

function useLocationUrl() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return [lat, lng];
}

export default useLocationUrl;
