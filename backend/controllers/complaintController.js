const Complaint = require("../models/Complaint");

// CREATE A NEW COMPLAINT
const createComplaint = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            location,
            latitude,
            longitude
        } = req.body;

        // Check required fields
        if (!title || !description || !category || !location) {
            return res.status(400).json({
                message: "Please provide title, description, category and location"
            });
        }

        // Create complaint
        const complaint = await Complaint.create({
            title,
            description,
            category,
            location,
            latitude,
            longitude,
            reportedBy: req.user.userId
        });

        res.status(201).json({
            message: "Complaint submitted successfully",
            complaint
        });

    } catch (error) {
        console.error("Create complaint error:", error.message);

        res.status(500).json({
            message: "Server error while creating complaint"
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