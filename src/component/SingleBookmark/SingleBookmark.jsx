import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBookmarks } from "../../context/BookmarksProvider";
import Loader from "../../Loader/Loader";
import ReactCountryFlag from "react-country-flag";
import { HiArrowNarrowLeft } from "react-icons/hi";

function SingleBookmark() {
  const { id } = useParams();
  const { getBookmark, currentBookmark, isLoading } = useBookmarks();
  const navigate = useNavigate();
  useEffect(() => {
    getBookmark(id);
  }, [id]);

  if (isLoading) return <Loader />;
  return (
    <>
      <button className="btn btn--back" onClick={(e) => navigate(-1)}>
        <HiArrowNarrowLeft className="icon" />
        Back
      </button>
      <div className="bookmarkItem">
        <div>
          {" "}
          <ReactCountryFlag
            svg
            countryCode={currentBookmark.countryCode}
          />{" "}
          &nbsp;
          <strong>{currentBookmark.cityName}</strong> &nbsp;{" "}
          <span>{currentBookmark.country}</span>
        </div>
      </div>
    </>
  );
}

export default SingleBookmark;
