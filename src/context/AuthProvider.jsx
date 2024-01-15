import React, { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const initialState = {
  isAuthenticate: false,
  user: null,
};
function authReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        isAuthenticate: true,
        user: action.payload,
      };
    case "logout":
      return {
        isAuthenticate: false,
        user: null,
      };
    default:
      throw new Error("unknown action");
  }
}
const FAKE_USER = {
  name: "user",
  email: "user@gmail.com",
  password: "123456",
};
export default function AuthProvider({ children }) {
  const [{ isAuthenticate, user }, dispatch] = useReducer(
    authReducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ isAuthenticate, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
