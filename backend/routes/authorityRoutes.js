const express = require("express");

const {
    getAuthorities,
    getAuthorityById,
    createAuthority,
    updateAuthority
} = require("../controllers/authorityController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all authorities
router.get(
    "/",
    protect,
    getAuthorities
);

// Get one authority
router.get(
    "/:id",
    protect,
    getAuthorityById
);

// Create an authority
router.post(
    "/",
    protect,
    createAuthority
);

// Update an authority
router.put(
    "/:id",
    protect,
    updateAuthority
);

module.exports = router;