import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState("123456");
  const { isAuthenticate, user, login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (email && password) login(email, password);
  };

  useEffect(() => {
    if (isAuthenticate) navigate("/", { replace: true });
  }, [isAuthenticate, navigate]);
  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="formControl">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
            id="email"
          />
        </div>
        <div className="formControl">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div className="buttons">
          <button className="btn btn--primary">Login</button>
        </div>
      </form>
    </div>
  );
}
