import "./MyComplaints.css";
import { useEffect, useState } from "react";

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("complaints")) || [];

    setComplaints(data);
  }, []);

  return (
    <div className="complaints-container">

      <h1>My Complaints</h1>

      {complaints.length === 0 ? (

        <p className="empty">
          No complaints submitted yet.
        </p>

      ) : (

        <table>

          <thead>

            <tr>
              <th>Problem</th>
              <th>Category</th>
              <th>Location</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Date</th>
            </tr>

          </thead>

          <tbody>

            {complaints.map((item) => (

              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>{item.location}</td>
                <td>{item.severity}</td>
                <td>{item.status}</td>
                <td>{item.date}</td>
              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  );
}

export default MyComplaints;