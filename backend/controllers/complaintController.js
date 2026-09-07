const mongoose = require("mongoose");
const Complaint = require("../models/Complaint");

// Helper to normalize category string to valid schema enum
function normalizeCategory(cat) {
    if (!cat) return "urban-infrastructure";
    const lower = cat.toLowerCase();
    if (lower.includes("water")) return "water";
    if (lower.includes("sanitation") || lower.includes("garbage") || lower.includes("waste")) return "sanitation";
    if (lower.includes("environment") || lower.includes("park")) return "environment";
    if (lower.includes("health")) return "healthcare";
    if (lower.includes("educat")) return "education";
    if (lower.includes("agri")) return "agriculture";
    if (lower.includes("rural")) return "rural-livelihood";
    if (lower.includes("access")) return "accessibility";
    if (lower.includes("service") || lower.includes("electric") || lower.includes("light")) return "public-service";
    return "urban-infrastructure";
}

// CREATE A NEW COMPLAINT
const createComplaint = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            location,
            latitude,
            longitude,
            imageUrl
        } = req.body;

        // Check required fields
        if (!title || !description || !location) {
            return res.status(400).json({
                message: "Please provide title, description, and location"
            });
        }

        const validCategory = normalizeCategory(category);
        const reportedById = (req.user && req.user.userId) ? req.user.userId : new mongoose.Types.ObjectId();

        // Create complaint
        const complaint = await Complaint.create({
            title,
            description,
            category: validCategory,
            location,
            latitude,
            longitude,
            imageUrl: imageUrl || "",
            reportedBy: reportedById
        });

        res.status(201).json({
            message: "Complaint submitted successfully",
            complaint
        });

    } catch (error) {
        console.error("Create complaint error:", error.message);

        res.status(500).json({
            message: error.message || "Server error while creating complaint"
        });
    }
};


// GET ALL COMPLAINTS
const getComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: complaints.length,
            complaints
        });

    } catch (error) {
        console.error("Get complaints error:", error.message);

        res.status(500).json({
            message: "Server error while fetching complaints"
        });
    }
};


// GET COMPLAINTS CREATED BY CURRENT USER
const getMyComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({
            reportedBy: req.user.userId
        }).sort({ createdAt: -1 });

        res.status(200).json({
            count: complaints.length,
            complaints
        });

    } catch (error) {
        console.error("Get my complaints error:", error.message);

        res.status(500).json({
            message: "Server error while fetching your complaints"
        });
    }
};


module.exports = {
    createComplaint,
    getComplaints,
    getMyComplaints
};