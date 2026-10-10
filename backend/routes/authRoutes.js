
const express = require("express");

const {
    registerUser,
    loginUser,
    linkUserToOrganization
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

// Register a user
router.post("/register", registerUser);

// Login a user
router.post("/login", loginUser);

// Get currently logged-in user
router.get("/me", protect, (req, res) => {
    res.status(200).json({
        message: "You are authenticated!",
        user: req.user
    });
});

// Link a university or industry user to a verified organization.
// Authority role required.
router.patch(
    "/users/:id/organization",
    protect,
    authorize("authority"),
    linkUserToOrganization
);

module.exports = router;
