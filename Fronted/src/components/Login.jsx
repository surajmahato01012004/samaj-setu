import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaUniversity,
  FaIndustry,
  FaLandmark,
  FaArrowRight,
} from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("Citizen");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
     if (
    role === "University" &&
    email === "authorityyyymmm@samajsetu.com" &&
    password === "admin123987"
    ) {
    navigate("/University-dashboard");
    return;
    }
    const user = users.find(
      (u) =>
        (u.email === email || u.username === email) &&
        u.password === password &&
        u.role.toLowerCase() === role.toLowerCase()
    );

    if (!user) {
      alert("Invalid Credentials or Wrong Role!");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    switch (user.role.toLowerCase()) {
      case "citizen":
        navigate("/dashboard");
        break;

      case "university":
        navigate("/university-dashboard");
        break;

      case "industry":
        navigate("/industry-dashboard");
        break;

      case "authority":
        navigate("/authority-dashboard");
        break;

      default:
        alert("Invalid Role");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">

        <h1>Login to your account</h1>

        <p className="login-subtitle">
          Choose your role and login to continue
        </p>

        <h3 className="role-title">Select your role</h3>

        <div className="role-container">

          <div
            className={`role-card ${role === "Citizen" ? "active" : ""}`}
            onClick={() => setRole("Citizen")}
          >
            <FaUser className="role-icon citizen" />
            <p>Citizen</p>
          </div>

          <div
            className={`role-card ${role === "University" ? "active" : ""}`}
            onClick={() => setRole("University")}
          >
            <FaUniversity className="role-icon university" />
            <p>University</p>
          </div>

          <div
            className={`role-card ${role === "Industry" ? "active" : ""}`}
            onClick={() => setRole("Industry")}
          >
            <FaIndustry className="role-icon industry" />
            <p>Industry</p>
          </div>

          <div
            className={`role-card ${role === "Authority" ? "active" : ""}`}
            onClick={() => setRole("Authority")}
          >
            <FaLandmark className="role-icon authority" />
            <p>Authority</p>
          </div>

        </div>

        <form onSubmit={handleLogin}>

          <label>Email / Phone / Username</label>

          <input
            type="text"
            placeholder="Enter your email or username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="forgot">
            <a href="/">Forgot Password?</a>
          </div>

          <button type="submit" className="login-btn">
            Login <FaArrowRight />
          </button>

        </form>

        <p className="register-text">
          Don't have an account?{" "}
          <Link to="/register" className="register-link">
            Register Here
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;