import React, { useEffect, useReducer, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BookmarkContext = createContext();
//const BASE_URL = "http://localhost:5000";
const BASE_URL = "https://test-api-react.vercel.app/";
const initialState = {
  bookmarks: [],
  isLoading: false,
  currentBookmark: {},
  error: null,
};

function bookmarkReducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "bookmarks/loaded":
      return {
        ...state,
        isLoading: false,
        bookmarks: action.payload,
      };
    case "bookmark/loaded":
      return {
        ...state,
        isLoading: false,
        currentBookmark: action.payload,
      };
    case "bookmark/created":
      return {
        ...state,
        isLoading: false,
        currentBookmark: action.payload,
        bookmarks: [...state.bookmarks, action.payload],
      };
    case "bookmark/deleted":
      return {
        ...state,
        isLoading: false,
        bookmarks: state.bookmarks.filter((item) => item.id !== action.payload),
      };
    case "rejected":
      return {
        ...state,
        error: action.payload,
      };
    default:
      throw new Error("no dispatch");
      break;
  }
}

function BookmarksProvider({ children }) {
  const [{ bookmarks, isLoading, currentBookmark }, dispatch] = useReducer(
    bookmarkReducer,
    initialState
  );
  useEffect(() => {
    async function getBookmarks() {
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (error) {
        toast(error.message);
        dispatch({ type: "rejected", payload: error.message });
      }
    }
    getBookmarks();
  }, []);

  async function getBookmark(id) {
    dispatch({ type: "loading" });
    try {
      dispatch({ type: "bookmark/loaded", payload: {} });
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (error) {
      toast(error.message);
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  async function createBookmark(newBookamrk) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookamrk);
      dispatch({ type: "bookmark/created", payload: data });
    } catch (error) {
      toast(error.message);
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  async function deleteBookmark(id) {
    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/deleted", payload: id });
    } catch (error) {
      toast(error.message);
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        currentBookmark,
        isLoading,
        getBookmark,
        createBookmark,
        deleteBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export default BookmarksProvider;

export function useBookmarks() {
  return useContext(BookmarkContext);
}
