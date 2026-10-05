const express = require("express");

const {
    createComplaint,
    getComplaints,
    getComplaintById,
    getMyComplaints
} = require("../controllers/complaintController");

const { analyzeImageUpload } = require("../controllers/imageAnalysisController");
const upload = require("../middleware/uploadMiddleware");
const { protect, optionalProtect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

// Standalone Image Upload & AI Vision Analysis
router.post(
    "/analyze-image",
    upload.single("image"),
    analyzeImageUpload
);

// Create a new complaint with image upload & mandatory auth protection
router.post(
    "/",
    protect,
    upload.single("image"),
    createComplaint
);

// Get all complaints
router.get(
    "/",
    getComplaints
);

// Get complaint by ID
router.get(
    "/:id",
    getComplaintById
);

// Get complaints created by current user
router.get(
    "/my",
    protect,
    authorize("citizen"),
    getMyComplaints
);

module.exports = router;