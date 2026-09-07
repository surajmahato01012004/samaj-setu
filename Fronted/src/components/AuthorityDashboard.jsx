import "./AuthorityDashboard.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaChartPie,
  FaUniversity,
  FaIndustry,
  FaSignOutAlt,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

function AuthorityDashboard() {

  const [universities, setUniversities] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    // Fetch Complaints
    fetch("/api/complaints")
      .then((res) => res.json())
      .then((data) => {
        if (data.data && data.data.length > 0) setComplaints(data.data);
        else setComplaints(JSON.parse(localStorage.getItem("complaints")) || []);
      })
      .catch(() => setComplaints(JSON.parse(localStorage.getItem("complaints")) || []));

    // Fetch Universities from MongoDB
    fetch("/api/universities")
      .then((res) => res.json())
      .then((data) => {
        if (data.data && data.data.length > 0) setUniversities(data.data.map((u) => u.name));
        else setUniversities(["Jadavpur University", "IIT Kharagpur", "Anna University", "VJTI Mumbai"]);
      })
      .catch(() => setUniversities(["Jadavpur University", "IIT Kharagpur", "Anna University"]));

    // Fetch Industries from MongoDB
    fetch("/api/industries")
      .then((res) => res.json())
      .then((data) => {
        if (data.data && data.data.length > 0) setIndustries(data.data.map((i) => i.companyName));
        else setIndustries(["Tata Steel CSR", "Wipro Environmental", "L&T Infrastructure"]);
      })
      .catch(() => setIndustries(["Tata Steel CSR", "Wipro Environmental", "L&T Infrastructure"]));
  }, []);

  const addUniversity = () => {
    const name = prompt("Enter University Name");
    if (name) {
      setUniversities([...universities, name]);
    }
  };

  const deleteUniversity = (index) => {
    setUniversities(
      universities.filter((_, i) => i !== index)
    );
  };
  const assignComplaint = (id, assignedTo) => {

  const updatedComplaints = complaints.map((item) =>
    item.id === id
      ? { ...item, assignedTo }
      : item
  );

  setComplaints(updatedComplaints);

  localStorage.setItem(
    "complaints",
    JSON.stringify(updatedComplaints)
  );
};

  const addIndustry = () => {
    const name = prompt("Enter Industry Name");
    if (name) {
      setIndustries([...industries, name]);
    }
  };

  const deleteIndustry = (index) => {
    setIndustries(
      industries.filter((_, i) => i !== index)
    );
  };
  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("currentUser");
  navigate("/login");
};

  return (
    <div className="authority-dashboard">

      {/* Sidebar */}

      <aside className="sidebar">

        <h2 className="logo">SamajSetu</h2>

        <ul>

          <li className="active">
            <FaChartPie />
            Dashboard
          </li>

          <li>
            <FaUniversity />
            Universities
          </li>

          <li>
            <FaIndustry />
            Industries
          </li>

          <li onClick={handleLogout}>
  <FaSignOutAlt />
  Logout
</li>

        </ul>

      </aside>

      {/* Main */}

      <main className="main-content">

        <h1>Authority Dashboard</h1>

        {/* Cards */}

        <div className="cards">

          <div className="card">
            <h2>{complaints.length}</h2>
            <p>Total Complaints</p>
          </div>

          <div className="card">
            <h2>
              {
                complaints.filter(
                  (c) => c.status === "Pending"
                ).length
              }
            </h2>
            <p>Pending</p>
          </div>

          <div className="card">
            <h2>
              {
                complaints.filter(
                  (c) => c.status === "Resolved"
                ).length
              }
            </h2>
            <p>Resolved</p>
          </div>

        </div>

        {/* Overview */}

        <div className="overview">

          <h2>Overview</h2>

          <div className="chart-box">

            <div className="donut-chart"></div>

            <div className="chart-info">

              <p><span className="blue"></span> New</p>
              <p><span className="green"></span> In Progress</p>
              <p><span className="orange"></span> Resolved</p>
              <p><span className="purple"></span> Closed</p>

            </div>

          </div>

        </div>

        {/* University Section */}

        <div className="management-box">

          <div className="box-header">

            <h2>Universities</h2>

            <button
              className="add-btn"
              onClick={addUniversity}
            >
              <FaPlus />
              Add University
            </button>

          </div>

          <table>

            <thead>

              <tr>
                <th>Name</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {universities.map((uni, index) => (

                <tr key={index}>

                  <td>{uni}</td>

                  <td>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteUniversity(index)
                      }
                    >
                      <FaTrash />
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

               {/* Industry Section */}

        <div className="management-box">

          <div className="box-header">

            <h2>Industries</h2>

            <button
              className="add-btn"
              onClick={addIndustry}
            >
              <FaPlus />
              Add Industry
            </button>

          </div>

          <table>

            <thead>

              <tr>
                <th>Name</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {industries.map((industry, index) => (

                <tr key={index}>

                  <td>{industry}</td>

                  <td>

                    <button
                      className="delete-btn"
                      onClick={() => deleteIndustry(index)}
                    >
                      <FaTrash />
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Citizen Complaints Section */}

        <div className="management-box">

          <h2>Citizen Complaints</h2>

          <table>

            <thead>

              <tr>
  <th>Problem</th>
  <th>Category</th>
  <th>Location</th>
  <th>Priority</th>
  <th>Status</th>
  <th>Assigned To</th>
  <th>Action</th>
</tr>

            </thead>

            <tbody>

              {complaints.length === 0 ? (

                <tr>
                  <td colSpan="7">
                    No complaints available
                  </td>
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

  <td>

    <button
      className="assign-btn"
      onClick={() =>
        assignComplaint(item.id, "University")
      }
    >
      University
    </button>

    <button
      className="assign-btn"
      onClick={() =>
        assignComplaint(item.id, "Industry")
      }
    >
      Industry
    </button>

  </td>

</tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </main>

    </div>
  );
}

export default AuthorityDashboard; 