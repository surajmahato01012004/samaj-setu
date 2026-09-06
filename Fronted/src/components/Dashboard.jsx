import "./Dashboard.css"; 
import { useNavigate } from "react-router-dom"; 
import { useState, useEffect } from "react"; 
 
import { 
  FaHome, 
  FaClipboardList, 
  FaBell, 
  FaUser, 
  FaSignOutAlt, 
  FaPlusCircle, 
} from "react-icons/fa"; 
 
function Dashboard() { 
 
  const navigate = useNavigate(); 
 
  const [complaints, setComplaints] = useState([]); 
 
  useEffect(() => { 
    const data = 
      JSON.parse(localStorage.getItem("complaints")) || []; 
 
    setComplaints(data); 
  }, []); 
 
  const handleLogout = () => { 
    localStorage.removeItem("currentUser"); 
    navigate("/login"); 
  }; 
 
  return ( 
    <div className="dashboard"> 
        {/* Sidebar */} 
 
<div className="sidebar"> 
 
  <h2 className="logo">SamajSetu</h2> 
 
  <ul> 
 
    <li className="active"> 
      <FaHome /> Dashboard 
    </li> 
 
    <li onClick={() => navigate("/report-problem")}> 
      <FaPlusCircle /> Report Problem 
    </li> 
 
    <li onClick={() => navigate("/my-complaints")}> 
      <FaClipboardList /> My Complaints 
    </li> 
 
    <li> 
      <FaBell /> Notifications 
    </li> 
 
    <li onClick={() => navigate("/profile")}> 
      <FaUser /> Profile 
    </li> 
 
    <li onClick={handleLogout}> 
      <FaSignOutAlt /> Logout 
    </li> 
 
  </ul> 
 
</div> 
 
{/* Main Content */} 
 
<div className="main-content"> 
{/* Header */}

<div className="dashboard-header">

  <div>
    <h1>Welcome 👋</h1>
    <p>Citizen Dashboard</p>
  </div>

  <button
    className="report-btn"
    onClick={() => navigate("/report-problem")}
  >
    Report Problem
  </button>

</div>
{/* Cards */}

<div className="cards">

  <div className="card">
    <h2>{complaints.length}</h2>
    <p>Total Reports</p>
  </div>

  <div className="card">
    <h2>
      {
        complaints.filter(
          (item) => item.status === "Pending"
        ).length
      }
    </h2>
    <p>Pending</p>
  </div>

  <div className="card">
    <h2>
      {
        complaints.filter(
          (item) => item.status === "In Progress"
        ).length
      }
    </h2>
    <p>In Progress</p>
  </div>

  <div className="card">
    <h2>
      {
        complaints.filter(
          (item) => item.status === "Resolved"
        ).length
      }
    </h2>
    <p>Resolved</p>
  </div>

</div>  
{/* Recent Complaints */}

<div className="table-section">

  <h2>Recent Complaints</h2>

  <table>

    <thead>

      <tr>
        <th>Problem</th>
        <th>Category</th>
        <th>Location</th>
        <th>Priority</th>
        <th>Status</th>
        <th>Assigned To</th>
      </tr>

    </thead>

    <tbody>

      {complaints.length === 0 ? (

        <tr>
          <td colSpan="6">No Complaints Found</td>
        </tr>

      ) : (

        complaints.map((item) => (

          <tr key={item.id}>

            <td>{item.title}</td>

            <td>{item.category}</td>

            <td>{item.location}</td>

            <td>{item.severity}</td>

            <td>{item.status}</td>

            <td>{item.assignedTo || "Not Assigned"}</td>

          </tr>

        ))

      )}

    </tbody>

  </table>

</div>  
{/* Notifications */}

<div className="notification-box">

  <h2>Notifications</h2>

  <ul>

    <li>✔ Your complaint has been submitted successfully.</li>

    <li>✔ Authority will review your complaint.</li>

    <li>✔ You will receive updates after assignment.</li>

  </ul>

</div>

</div>   

</div>  

  );
}

export default Dashboard;