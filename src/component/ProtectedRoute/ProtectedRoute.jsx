import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

export default function ProtectedRoute({ children }) {
  const { isAuthenticate } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticate) navigate("/login");
  }, [isAuthenticate, navigate]);
  return isAuthenticate ? children : null;
}
