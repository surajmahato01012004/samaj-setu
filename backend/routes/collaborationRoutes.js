const express = require("express");
const router = express.Router();

const {
    getCollaborations,
    createCollaboration,
    respondToCollaboration
} = require("../controllers/collaborationController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

// View collaborations
router.get(
    "/",
    protect,
    authorize("authority", "university", "industry"),
    getCollaborations
);

// Create a collaboration invitation
router.post(
    "/",
    protect,
    authorize("university", "industry"),
    createCollaboration
);

// Accept or decline an invitation
router.patch(
    "/:id/respond",
    protect,
    authorize("university", "industry"),
    respondToCollaboration
);

module.exports = router;