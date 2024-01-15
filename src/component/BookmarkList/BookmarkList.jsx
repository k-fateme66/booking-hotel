import React from "react";
import { useBookmarks } from "../../context/BookmarksProvider";
import Loader from "../../Loader/Loader";
import { Link } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import { BsFillTrashFill } from "react-icons/bs";

function BookmarkList() {
  const { isLoading, bookmarks, currentBookmark, deleteBookmark } =
    useBookmarks();
  const handleDelete = (e, id) => {
    e.preventDefault();
    deleteBookmark(id);
  };
  if (isLoading) return <Loader />;
  if (!bookmarks.length) return <p>there is not location</p>;
  return (
    <div className="bookmarkList">
      <h2>bookmark List</h2>
      {bookmarks.map((item) => (
        <Link
          key={item.id}
          to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
        >
          <div
            className={`bookmarkItem ${
              item.id === currentBookmark.id ? "current-bookmark" : ""
            }`}
          >
            <div>
              <ReactCountryFlag svg countryCode={item.countryCode} /> &nbsp;
              <strong>{item.cityName}</strong> &nbsp;{" "}
              <span>{item.country}</span>
            </div>
            <button onClick={(e) => handleDelete(e, item.id)}>
              <BsFillTrashFill className="trash" />
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default BookmarkList;
