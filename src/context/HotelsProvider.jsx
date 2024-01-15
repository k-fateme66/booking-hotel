import React, { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const HotelsContext = createContext();
//const BASE_URL = "http://localhost:5000/hotels";
const BASE_URL = "https://test-api-react.vercel.app/hotels";
export default function HotelsProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;
  const [currentHotel, setCurrentHotel] = useState({});
  const [isLoadingCurrentHotel, setTsLoadingCurrentHotel] = useState(false);

  const { data: hotels, isLoading } = useFetch(
    BASE_URL,
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );
  async function getHotel(id) {
    try {
      setTsLoadingCurrentHotel(true);
      setCurrentHotel({});
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      setCurrentHotel(data);
      setTsLoadingCurrentHotel(false);
    } catch (error) {
      toast.error(error.message);
      setTsLoadingCurrentHotel(false);
    }
  }
  return (
    <HotelsContext.Provider
      value={{
        isLoading,
        hotels,
        getHotel,
        currentHotel,
        isLoadingCurrentHotel,
      }}
    >
      {children}
    </HotelsContext.Provider>
  );
}

export function useHotels() {
  return useContext(HotelsContext);
}
