const express = require("express");

const {
    createComplaint,
    getComplaints,
    getMyComplaints
} = require("../controllers/complaintController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

// Create a new complaint
router.post(
    "/",
    createComplaint
);

// Get all complaints
router.get(
    "/",
    getComplaints
);

// Get complaints created by current user
router.get(
    "/my",
    protect,
    authorize("citizen"),
    getMyComplaints
);

module.exports = router;