import "./ReportProblem.css";
import { useState } from "react";

function ReportProblem() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Urban Infrastructure");
  const [location, setLocation] = useState("");
  const [severity, setSeverity] = useState("Medium");
  const [image, setImage] = useState(null);
  const [analysis, setAnalysis] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const complaint = {
      id: Date.now(),
      title,
      description,
      category,
      location,
      severity,
      image: image ? image.name : "No Image",
      status: "Pending",
      assignedTo: "Authority",
      reportedBy: "Citizen",
      date: new Date().toLocaleDateString(),
    };

    const complaints =
      JSON.parse(localStorage.getItem("complaints")) || [];

    complaints.push(complaint);

    localStorage.setItem(
      "complaints",
      JSON.stringify(complaints)
    );

    setAnalysis(`
Category : ${category}

Priority : ${severity}

Assigned Department :
Municipal Authority

Suggested Partner :
University + Industry

Estimated Resolution :
5 - 7 Days

Current Status :
Pending Authority Review

Complaint ID :
${complaint.id}

Reported On :
${complaint.date}
    `);

    alert("Problem Submitted Successfully!");

    setTitle("");
    setDescription("");
    setCategory("Urban Infrastructure");
    setLocation("");
    setSeverity("Medium");
    setImage(null);

    e.target.reset();
  };

  return (
    <div className="report-container">

      <div className="report-card">

        <div className="report-left">

          <h1>Report a Problem</h1>

          <p className="subtitle">
            Help your community by reporting an issue.
          </p>

          <form onSubmit={handleSubmit}>

            <label>Problem Title</label>

            <input
              type="text"
              placeholder="Enter problem title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label>Description</label>

            <textarea
              rows="5"
              placeholder="Describe the problem..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>

            <label>Category</label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Urban Infrastructure</option>
              <option>Road Damage</option>
              <option>Garbage</option>
              <option>Water Supply</option>
              <option>Electricity</option>
              <option>Healthcare</option>
              <option>Education</option>
            </select>

            <label>Location</label>

            <input
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />

            <label>Severity</label>

            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <label>Upload Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />

            <button type="submit">
              Submit & Run AI Analysis
            </button>

          </form>

        </div>

        <div className="report-right">

          <h2>AI Analysis Preview</h2>

          {analysis ? (
            <pre>{analysis}</pre>
          ) : (
            <p>
              Submit a problem to simulate SamajSetu's AI
              understanding, priority assessment and routing.
            </p>
          )}

        </div>

      </div>

    </div>
  );
}

export default ReportProblem;