import React, { useRef, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import {
  HiCalendar,
  HiLogin,
  HiLogout,
  HiMinus,
  HiOutlineBookmark,
  HiPlus,
  HiSearch,
} from "react-icons/hi";
import useOutSideClick from "../../hooks/useOutSideClick";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  Link,
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const dateRef = useRef();
  const navigate = useNavigate();
  const { isAuthenticate, logout } = useAuth();
  const handleOptions = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  useOutSideClick(dateRef, "dateDropDown", () => setOpenDate(false));

  const handleSearch = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      destination,
      options: JSON.stringify(options),
    });
    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
  };
  const handleLogout = (e) => {
    console.log("logout");
    logout();
  };
  return (
    <div className="header">
      <div className="headerMobile">
        <button
          to="/bookmark"
          className="headerBookmarkBtn"
          disabled={!isAuthenticate}
          onClick={() => navigate("/bookmark")}
        >
          <HiOutlineBookmark className={`headerIcon`} />
        </button>
        <h2>Booking</h2>
        {!isAuthenticate ? (
          <Link to="/login" className="headerBookmarkBtn">
            <HiLogin className="headerIcon" />
          </Link>
        ) : (
          <button onClick={handleLogout} className="headerBookmarkBtn">
            <HiLogout className="headerIcon" />
          </button>
        )}
      </div>
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            className="headerSeearchInput"
            placeholder="where to go?"
            name="destination"
            id="destination"
          />
        </div>
        <div className="headerSearchItem">
          <div className="seperator"></div>
          <HiCalendar className="headerIcon dateIcon" />
          <div
            onClick={() => setOpenDate(!openDate)}
            className="dateDropDown"
            id="dateDropDown"
          >
            {`${format(date[0].startDate, "yyyy-MM-dd")} to ${format(
              date[0].endDate,
              "yyyy-MM-dd"
            )}`}
          </div>
          {openDate && (
            <div ref={dateRef}>
              <DateRange
                ranges={date}
                onChange={(item) => setDate([item.selection])}
                minDate={new Date()}
                className="date"
                moveRangeOnFirstSelection={true}
              />
            </div>
          )}
        </div>
        <div className="headerSearchItem">
          <div className="seperator"></div>
          <div
            className="optionDropDown"
            id="optionDropDown"
            onClick={() => setOpenOptions(!openOptions)}
          >
            {options.adult} adult . {options.children} children . {options.room}{" "}
            room
          </div>
          {openOptions && (
            <GuestOption
              setOpenOptions={setOpenOptions}
              options={options}
              handleOptions={handleOptions}
            />
          )}
        </div>
        <div className="headerSearchItem">
          <div className="seperator"></div>
          <button className="headerSearchBtn" onClick={handleSearch}>
            <HiSearch className="headerIcon" />
            <span>Search</span>
          </button>
          <button
            to="/bookmark"
            className="headerBookmarkBtn"
            disabled={!isAuthenticate}
            onClick={() => navigate("/bookmark")}
          >
            <HiOutlineBookmark className={`headerIcon`} />
          </button>
          {!isAuthenticate ? (
            <Link to="/login" className="headerBookmarkBtn">
              <HiLogin className="headerIcon" />
            </Link>
          ) : (
            <button onClick={handleLogout} className="headerBookmarkBtn">
              <HiLogout className="headerIcon" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;

function GuestOption({ options, handleOptions, setOpenOptions }) {
  const optionRef = useRef();
  useOutSideClick(optionRef, "optionDropDown", () => setOpenOptions(false));
  return (
    <div className="guestOptions" ref={optionRef}>
      <OptionItem
        handleOptions={handleOptions}
        type="adult"
        minLimt="1"
        options={options}
      />
      <OptionItem
        handleOptions={handleOptions}
        type="children"
        minLimt="0"
        options={options}
      />
      <OptionItem
        handleOptions={handleOptions}
        type="room"
        minLimt="1"
        options={options}
      />
    </div>
  );
}

function OptionItem({ type, minLimt, options, handleOptions }) {
  console.log(options[type]);
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          onClick={() => handleOptions(type, "dec")}
          className="optionCounterBtn"
          disabled={options[type] <= minLimt}
        >
          <HiMinus className="icon" />
        </button>
        <span className="optionCounterNumber">{options[type]}</span>
        <button
          onClick={() => handleOptions(type, "inc")}
          className="optionCounterBtn"
        >
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}
