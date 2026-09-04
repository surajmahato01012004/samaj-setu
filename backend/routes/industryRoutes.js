const express = require("express");

const {
    getIndustries,
    getIndustryById,
    createIndustry,
    updateIndustry,
    deleteIndustry
} = require("../controllers/industryController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

// Get all industries
router.get(
    "/",
    protect,
    getIndustries
);

// Get one industry
router.get(
    "/:id",
    protect,
    getIndustryById
);

// Create an industry - Authority only
router.post(
    "/",
    protect,
    authorize("authority"),
    createIndustry
);

// Update an industry - Authority only
router.put(
    "/:id",
    protect,
    authorize("authority"),
    updateIndustry
);

// Delete an industry - Authority only
router.delete(
    "/:id",
    protect,
    authorize("authority"),
    deleteIndustry
);

module.exports = router;