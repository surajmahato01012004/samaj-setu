const mongoose = require("mongoose");
const Complaint = require("../models/Complaint");
const { analyzeImage } = require("../services/imageAnalysisService");

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

// CREATE A NEW COMPLAINT WITH GENUINE IMAGE ANALYSIS
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

        let finalImageUrl = imageUrl || "";
        let analysisResults = [];

        // Handle uploaded file if present
        if (req.file) {
            finalImageUrl = `/uploads/${req.file.filename}`;
            analysisResults = await analyzeImage(req.file.path, req.file.buffer || null);
        } else if (req.body.imageAnalysisResults) {
            try {
                analysisResults = typeof req.body.imageAnalysisResults === "string" 
                    ? JSON.parse(req.body.imageAnalysisResults) 
                    : req.body.imageAnalysisResults;
            } catch (e) {
                analysisResults = [];
            }
        }

        const validCategory = normalizeCategory(category || (analysisResults[0] ? analysisResults[0].category : ""));
        const reportedById = (req.user && req.user.userId) ? req.user.userId : new mongoose.Types.ObjectId();

        // Create complaint document preserving top-level complaint structure
        const complaint = await Complaint.create({
            title,
            description,
            category: validCategory,
            location,
            latitude: latitude ? Number(latitude) : undefined,
            longitude: longitude ? Number(longitude) : undefined,
            imageUrl: finalImageUrl,
            imageAnalysisResults: analysisResults,
            reportedBy: reportedById
        });

        // Exact response shape preserved for frontend compatibility
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


// GET ALL COMPLAINTS (Preserving top-level count & complaints)
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

// GET SINGLE COMPLAINT BY ID
const getComplaintById = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);
        if (!complaint) {
            return res.status(404).json({
                message: "Complaint not found"
            });
        }

        res.status(200).json({
            complaint
        });
    } catch (error) {
        console.error("Get complaint by id error:", error.message);
        res.status(500).json({
            message: "Server error while fetching complaint details"
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
    getComplaintById,
    getMyComplaints
};