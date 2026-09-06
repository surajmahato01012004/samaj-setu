import "./UniversityDashboard.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaUniversity,
  FaUsers,
  FaProjectDiagram,
  FaClipboardList,
  FaSignOutAlt,
  FaBook,
  FaCheckCircle,
} from "react-icons/fa";

function UniversityDashboard() {
    const [complaints, setComplaints] = useState([]);

useEffect(() => {

  const data =
    JSON.parse(localStorage.getItem("complaints")) || [];

  const assignedComplaints = data.filter(
    (item) => item.assignedTo === "University"
  );

  setComplaints(assignedComplaints);

}, []);
const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("currentUser");
  navigate("/login");
};
  return (
    <div className="university-dashboard">

      {/* Sidebar */}
      <div className="sidebar">

        <h2 className="logo">SamajSetu</h2>

        <ul>
          <li className="active">
            <FaUniversity /> Dashboard
          </li>

          <li>
            <FaClipboardList /> Challenges
          </li>

          <li>
            <FaUsers /> Student Teams
          </li>

          <li>
            <FaProjectDiagram /> Projects
          </li>

          <li>
            <FaBook /> Research
          </li>

          <li onClick={handleLogout}>
  <FaSignOutAlt /> Logout
</li>
        </ul>

      </div>

      {/* Main */}

      <div className="main-content">

        <div className="dashboard-header">

          <div>
            <h1>Welcome 👋</h1>
            <p>University Dashboard</p>
          </div>

          <button className="assign-btn">
            + Create Team
          </button>

        </div>

        {/* Cards */}

        <div className="cards">

          <div className="card">
            <h2>{complaints.length}</h2>
            <p>Challenges Assigned</p>
          </div>

          <div className="card">
            <h2>10</h2>
            <p>Student Teams</p>
          </div>

          <div className="card">
            <h2>7</h2>
            <p>Projects Running</p>
          </div>

          <div className="card">
            <h2>5</h2>
            <p>Completed</p>
          </div>

        </div>

        {/* Table */}

        <div className="table-section">

          <h2>Assigned Challenges</h2>

          <table>

            <thead>
  <tr>
    <th>Problem</th>
    <th>Category</th>
    <th>Location</th>
    <th>Status</th>
  </tr>
</thead>

           <tbody>

  {complaints.length === 0 ? (

    <tr>
      <td colSpan="4">
        No Assigned Complaints
      </td>
    </tr>

  ) : (

    complaints.map((item) => (

      <tr key={item.id}>

        <td>{item.title}</td>

        <td>{item.category}</td>

        <td>{item.location}</td>

        <td>{item.status}</td>

      </tr>

    ))

  )}

</tbody>

          </table>

        </div>

        {/* Team Activity */}

        <div className="activity-box">

          <h2>Recent Activities</h2>

          <ul>

            <li>✔ New citizen complaint received.</li>

            <li>✔ Faculty review pending.</li>

            <li>✔ Submit project solution to authority.</li>

        </ul>

        </div>

      </div>

    </div>
  );
}

export default UniversityDashboard;