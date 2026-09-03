require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Authentication routes
app.use("/api/auth", authRoutes);

// Complaint routes
app.use("/api/complaints", complaintRoutes);

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