require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const postRoutes = require("./routes/postRoutes");
const universityRoutes = require("./routes/universityRoutes");
const industryRoutes = require("./routes/industryRoutes");
const authorityRoutes = require("./routes/authorityRoutes");
const challengeRoutes = require("./routes/challengeRoutes");
const aiRoutes = require("./ai/aiRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Authentication routes
app.use("/api/auth", authRoutes);

// Complaint & Post routes
app.use("/api/complaints", complaintRoutes);
app.use("/api/posts", postRoutes);

// University routes
app.use("/api/universities", universityRoutes);

// Industry routes
app.use("/api/industries", industryRoutes);

// Authority routes
app.use("/api/authorities", authorityRoutes);

// Challenge routes
app.use("/api/challenges", challengeRoutes);

// AI routes
app.use("/api/ai", aiRoutes);

connectDB();

app.get("/", (req, res) => {
    res.json({
        message: "SamajSetu Backend is running!"
    });
});

app.listen(process.env.PORT || 5000, () => {
    console.log(
        `SamajSetu backend running on port ${process.env.PORT || 5000}`
    );
});