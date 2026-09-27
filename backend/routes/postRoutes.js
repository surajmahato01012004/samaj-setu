const express = require("express");

const {
    createComplaint,
    getComplaints,
    getComplaintById
} = require("../controllers/complaintController");

const { analyzeImageUpload } = require("../controllers/imageAnalysisController");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Test A: Standalone Image Upload & AI Analysis
router.post(
    "/analyze-image",
    upload.single("image"),
    analyzeImageUpload
);

// Test B: Create a new post / practice post with optional image upload
router.post(
    "/",
    upload.single("image"),
    createComplaint
);

// Test C: Get all posts
router.get(
    "/",
    getComplaints
);

// Test C: Get post by ID
router.get(
    "/:id",
    getComplaintById
);

module.exports = router;
