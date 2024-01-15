import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import useGetLocation from "../../hooks/useGetLocation";
import toast from "react-hot-toast";
import useLocationUrl from "../../hooks/useLocationUrl";

export default function Map({ markerLocations }) {
  const [mapCenter, setMapCenter] = useState([50.2805957141596, 5.888671875]);
  const [lat, lng] = useLocationUrl();
  const {
    isLoading: isLoadingPostion,
    postion: geoLocationPostion,
    error: geoLocationError,
    getPostion,
  } = useGetLocation();
  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);
  useEffect(() => {
    if (geoLocationPostion?.lat && geoLocationPostion?.lng) {
      setMapCenter([geoLocationPostion.lat, geoLocationPostion.lng]);
    } else {
      toast.error(geoLocationError);
    }
  }, []);

  return (
    <MapContainer
      className="map"
      center={mapCenter}
      zoom={18}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <button onClick={getPostion} className="getLocation">
        {isLoadingPostion ? "loding..." : "Your location"}
      </button>
      <ChangeCenter position={mapCenter} />
      <DetectClick />
      {markerLocations.map((item) => (
        <Marker key={item.id} position={[item.latitude, item.longitude]}>
          <Popup>{item.host_location}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigete = useNavigate();
  useMapEvent({
    click: (e) =>
      navigete(`/bookmark/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}
