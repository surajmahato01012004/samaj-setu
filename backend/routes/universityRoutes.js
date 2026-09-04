const express = require("express");

const {
    getUniversities,
    getUniversityById,
    createUniversity,
    updateUniversity,
    deleteUniversity
} = require("../controllers/universityController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

// Get all universities
router.get(
    "/",
    protect,
    getUniversities
);

// Get one university
router.get(
    "/:id",
    protect,
    getUniversityById
);

// Create a university - Authority only
router.post(
    "/",
    protect,
    authorize("authority"),
    createUniversity
);

// Update a university - Authority only
router.put(
    "/:id",
    protect,
    authorize("authority"),
    updateUniversity
);

// Delete a university - Authority only
router.delete(
    "/:id",
    protect,
    authorize("authority"),
    deleteUniversity
);

module.exports = router;