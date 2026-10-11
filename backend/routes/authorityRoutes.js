
const express = require("express");

const {
    getAuthorities,
    getAuthorityById,
    createAuthority,
    updateAuthority
} = require("../controllers/authorityController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

// Get all authorities - Authority only
router.get(
    "/",
    protect,
    authorize("authority"),
    getAuthorities
);

// Get one authority - Authority only
router.get(
    "/:id",
    protect,
    authorize("authority"),
    getAuthorityById
);

// Create an authority - Authority only
router.post(
    "/",
    protect,
    authorize("authority"),
    createAuthority
);

// Update an authority - Authority only
router.put(
    "/:id",
    protect,
    authorize("authority"),
    updateAuthority
);

module.exports = router;
