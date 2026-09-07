import "./IndustryDashboard.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaIndustry,
  FaHandshake,
  FaProjectDiagram,
  FaChartLine,
  FaUserGraduate,
  FaSignOutAlt,
  FaCheckCircle,
} from "react-icons/fa";

function IndustryDashboard() {
    const [complaints, setComplaints] = useState([]);
  useEffect(() => {
    fetch("/api/complaints")
      .then((res) => res.json())
      .then((data) => {
        const allComplaints = data.data || [];
        if (allComplaints.length > 0) {
          setComplaints(allComplaints);
        } else {
          const localData = JSON.parse(localStorage.getItem("complaints")) || [];
          setComplaints(localData);
        }
      })
      .catch(() => {
        const localData = JSON.parse(localStorage.getItem("complaints")) || [];
        setComplaints(localData);
      });
  }, []);
    const updateStatus = (id, newStatus) => {

  const allComplaints =
    JSON.parse(localStorage.getItem("complaints")) || [];

  const updatedAll = allComplaints.map((item) =>
    item.id === id
      ? { ...item, status: newStatus }
      : item
  );

  localStorage.setItem(
    "complaints",
    JSON.stringify(updatedAll)
  );

  setComplaints(
    updatedAll.filter(
      (item) => item.assignedTo === "Industry"
    )
  );
};
    const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("currentUser");
  navigate("/login");
};


  return (
    <div className="industry-dashboard">

      {/* Sidebar */}

      <div className="sidebar">

        <h2 className="logo">SamajSetu</h2>

        <ul>

          <li className="active">
            <FaIndustry /> Dashboard
          </li>

          <li>
            <FaHandshake /> Collaborations
          </li>

          <li>
            <FaProjectDiagram /> Challenges
          </li>

          <li>
            <FaUserGraduate /> Mentor Students
          </li>

          <li>
            <FaChartLine /> Analytics
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
            <p>Industry Dashboard</p>
          </div>

          <button className="industry-btn">
            + New Collaboration
          </button>

        </div>

        {/* Cards */}

        <div className="cards">

          <div className="card">
            <h2>{complaints.length}</h2>
            <p>Open Challenges</p>
          </div>

          <div className="card">
            <h2>8</h2>
            <p>Collaborations</p>
          </div>

          <div className="card">
            <h2>6</h2>
            <p>Projects Running</p>
          </div>

          <div className="card">
            <h2>4</h2>
            <p>Completed Projects</p>
          </div>

        </div>

        {/* Table */}

        <div className="table-section">

          <h2>Current Collaborations</h2>

          <table>

            <thead>

              

            <tr>
            <th>Problem</th>
            <th>Category</th>
            <th>Location</th>
            <th>Status</th>
            <th>Action</th>
            </tr>



            </thead>

                <tbody>

  {complaints.length === 0 ? (

    <tr>
      <td colSpan="5">No Complaints Found</td>
    </tr>

  ) : (

    complaints.map((item) => (

      <tr key={item.id}>

        <td>{item.title}</td>

        <td>{item.category}</td>

        <td>{item.location}</td>

        <td>{item.status}</td>

        <td>

          <button
            className="progress-btn"
            onClick={() =>
              updateStatus(item.id, "In Progress")
            }
          >
            In Progress
          </button>

          <button
            className="resolved-btn"
            onClick={() =>
              updateStatus(item.id, "Resolved")
            }
          >
            Resolved
          </button>

        </td>

      </tr>

    ))

  )}

</tbody>
          </table>

        </div>

        {/* Activity */}

        <div className="activity-box">

          <h2>Recent Updates</h2>

          <ul>

            <li>✔ Citizen complaints received.</li>

            <li>✔ Review pending complaints.</li>

            <li>✔ Update complaint status after action.</li>

            </ul>

        </div>

      </div>

    </div>
  );
}

export default IndustryDashboard;