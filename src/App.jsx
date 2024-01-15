import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./component/Header/Header";
import LocationList from "./component/LocationList/LocationList";
import { Route, Router, Routes } from "react-router-dom";
import AppLayout from "./component/AppLayout/AppLayout";
import Hotels from "./component/Hotels/Hotels";
import HotelsProvider from "./context/HotelsProvider";
import SingleHotel from "./component/SingleHotel/SingleHotel";
import BookmarkLayout from "./component/BookmarkLayout/BookmarkLayout";
import BookmarksProvider from "./context/BookmarksProvider";
import BookmarkList from "./component/BookmarkList/BookmarkList";
import SingleBookmark from "./component/SingleBookmark/SingleBookmark";
import NewAddBookmark from "./component/NewAddBookmark/NewAddBookmark";
import Login from "./component/Login/Login";
import AuthProvider from "./context/AuthProvider";
import ProtectedRoute from "./component/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BookmarksProvider>
        <HotelsProvider>
          <Toaster />
          <Header />
          <Routes>
            <Route path="/" element={<LocationList />} />
            <Route path="/hotels" element={<AppLayout />}>
              <Route index element={<Hotels />} />
              <Route path=":id" element={<SingleHotel />} />
            </Route>
            <Route
              path="/bookmark"
              element={
                <ProtectedRoute>
                  <BookmarkLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<BookmarkList />} />
              <Route path=":id" element={<SingleBookmark />} />
              <Route path="add" element={<NewAddBookmark />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </HotelsProvider>
      </BookmarksProvider>
    </AuthProvider>
  );
}

export default App;
