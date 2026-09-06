import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import AuthorityLogin from "./components/AuthorityLogin";
import Dashboard from "./components/Dashboard";
import AuthorityDashboard from "./components/AuthorityDashboard";
import IndustryDashboard from "./components/IndustryDashboard";
import UniversityDashboard from "./components/UniversityDashboard";
import Features from "./components/Features";
import ReportProblem from "./components/ReportProblem";
import MyComplaints from "./components/MyComplaints";


function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route
            path="/report-problem"
            element={<ReportProblem />}
        />
        <Route
          path="/my-complaints"
          element={<MyComplaints />}
        />
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/login" element={<Login />} />
        <Route path="/authority-login" element={<AuthorityLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
              path="/authority-dashboard"
              element={<AuthorityDashboard />}
        />
        <Route path="/industry-dashboard" element={<IndustryDashboard />} />
        <Route path="/university-dashboard" element={<UniversityDashboard />} />
        




      </Routes>
      
      
    </BrowserRouter>
    
  );
}

export default App;