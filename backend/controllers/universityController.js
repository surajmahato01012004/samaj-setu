const University = require("../models/University");

// GET ALL UNIVERSITIES
const getUniversities = async (req, res) => {
    try {
        const universities = await University.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: universities.length,
            universities
        });

    } catch (error) {
        console.error("Get universities error:", error.message);

        res.status(500).json({
            message: "Server error while fetching universities"
        });
    }
};


// GET ONE UNIVERSITY BY ID
const getUniversityById = async (req, res) => {
    try {
        const university = await University.findById(req.params.id);

        if (!university) {
            return res.status(404).json({
                message: "University not found"
            });
        }

        res.status(200).json({
            university
        });

    } catch (error) {
        console.error("Get university error:", error.message);

        res.status(500).json({
            message: "Server error while fetching university"
        });
    }
};


// CREATE A UNIVERSITY
const createUniversity = async (req, res) => {
    try {
        const {
            name,
            code,
            location,
            departments,
            expertise,
            researchAreas,
            nodalOfficer,
            verificationStatus,
            activeProjectsCount
        } = req.body;

        if (
            !name ||
            !code ||
            !location ||
            !nodalOfficer ||
            !nodalOfficer.name ||
            !nodalOfficer.email
        ) {
            return res.status(400).json({
                message: "Please provide all required university details"
            });
        }

        const existingUniversity = await University.findOne({ code });

        if (existingUniversity) {
            return res.status(400).json({
                message: "University with this code already exists"
            });
        }

        const university = await University.create({
            name,
            code,
            location,
            departments,
            expertise,
            researchAreas,
            nodalOfficer,
            verificationStatus,
            activeProjectsCount
        });

        res.status(201).json({
            message: "University created successfully",
            university
        });

    } catch (error) {
        console.error("Create university error:", error.message);

        res.status(500).json({
            message: "Server error while creating university"
        });
    }
};


// UPDATE UNIVERSITY
const updateUniversity = async (req, res) => {
    try {
        const university = await University.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!university) {
            return res.status(404).json({
                message: "University not found"
            });
        }

        res.status(200).json({
            message: "University updated successfully",
            university
        });

    } catch (error) {
        console.error("Update university error:", error.message);

        res.status(500).json({
            message: "Server error while updating university"
        });
    }
};


// DELETE UNIVERSITY
const deleteUniversity = async (req, res) => {
    try {
        const university = await University.findByIdAndDelete(
            req.params.id
        );

        if (!university) {
            return res.status(404).json({
                message: "University not found"
            });
        }

        res.status(200).json({
            message: "University deleted successfully"
        });

    } catch (error) {
        console.error("Delete university error:", error.message);

        res.status(500).json({
            message: "Server error while deleting university"
        });
    }
};


module.exports = {
    getUniversities,
    getUniversityById,
    createUniversity,
    updateUniversity,
    deleteUniversity
};