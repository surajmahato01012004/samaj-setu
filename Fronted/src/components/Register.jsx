import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("citizen");

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(
      (user) => user.email === email
    );

    if (existingUser) {
      alert("Email already registered!");
      return;
    }

    const newUser = {
      username: name,
      email: email,
      password: password,
      role: role,
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful!");

    navigate("/login");
  };

  return (
    <div className="register-container">

      <div className="register-card">

        <h1>SamajSetu</h1>

        <h2>Create Account</h2>

        <p>Register to connect problems with solutions</p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            spellCheck="false"
          />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="citizen">Citizen</option>
            <option value="industry">Industry</option>
            <option value="university">University</option>
            <option value="authority">Authority</option>
          </select>

          {role === "industry" && (
            <>
              <label>Industry / Organization Name</label>

              <input
                type="text"
                placeholder="Enter organization name"
                required
              />

              <label>Registration Number</label>

              <input
                type="text"
                placeholder="Enter registration number"
                required
              />
            </>
          )}

          {role === "university" && (
            <>
              <label>University Name</label>

              <input
                type="text"
                placeholder="Enter university name"
                required
              />

              <label>Institution ID</label>

              <input
                type="text"
                placeholder="Enter institution ID"
                required
              />
            </>
          )}

          {role === "authority" && (
            <>
              <label>Authority Name</label>

              <input
                type="text"
                placeholder="Enter authority name"
                required
              />

              <label>Department ID</label>

              <input
                type="text"
                placeholder="Enter department ID"
                required
              />
            </>
          )}

          <button type="submit">
            Register
          </button>

        </form>

        <p>
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;