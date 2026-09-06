import React, { useState } from "react";
import "./AuthorityLogin.css";
import { useNavigate } from "react-router-dom";

function AuthorityLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    localStorage.setItem("currentUser", "authority");

    navigate("/authority-dashboard");
  };

  return (
    <div className="authority-page">
      <div className="authority-card">
        <h2>Authority Login</h2>
        <p>Login to access the Authority Dashboard</p>

        <form onSubmit={handleLogin}>
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter authority email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AuthorityLogin;
