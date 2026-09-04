const Industry = require("../models/Industry");

// GET ALL INDUSTRIES
const getIndustries = async (req, res) => {
    try {
        const industries = await Industry.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: industries.length,
            industries
        });

    } catch (error) {
        console.error("Get industries error:", error.message);

        res.status(500).json({
            message: "Server error while fetching industries"
        });
    }
};


// GET ONE INDUSTRY BY ID
const getIndustryById = async (req, res) => {
    try {
        const industry = await Industry.findById(req.params.id);

        if (!industry) {
            return res.status(404).json({
                message: "Industry not found"
            });
        }

        res.status(200).json({
            industry
        });

    } catch (error) {
        console.error("Get industry error:", error.message);

        res.status(500).json({
            message: "Server error while fetching industry"
        });
    }
};


// CREATE AN INDUSTRY
const createIndustry = async (req, res) => {
    try {
        const {
            companyName,
            registrationNo,
            sector,
            headquarters,
            supportOffered,
            csrBudget,
            contactPerson,
            verificationStatus
        } = req.body;

        if (
            !companyName ||
            !headquarters ||
            !contactPerson ||
            !contactPerson.name ||
            !contactPerson.email
        ) {
            return res.status(400).json({
                message: "Please provide all required industry details"
            });
        }

        const industry = await Industry.create({
            companyName,
            registrationNo,
            sector,
            headquarters,
            supportOffered,
            csrBudget,
            contactPerson,
            verificationStatus
        });

        res.status(201).json({
            message: "Industry created successfully",
            industry
        });

    } catch (error) {
        console.error("Create industry error:", error.message);

        res.status(500).json({
            message: "Server error while creating industry"
        });
    }
};


// UPDATE INDUSTRY
const updateIndustry = async (req, res) => {
    try {
        const industry = await Industry.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!industry) {
            return res.status(404).json({
                message: "Industry not found"
            });
        }

        res.status(200).json({
            message: "Industry updated successfully",
            industry
        });

    } catch (error) {
        console.error("Update industry error:", error.message);

        res.status(500).json({
            message: "Server error while updating industry"
        });
    }
};


// DELETE INDUSTRY
const deleteIndustry = async (req, res) => {
    try {
        const industry = await Industry.findByIdAndDelete(
            req.params.id
        );

        if (!industry) {
            return res.status(404).json({
                message: "Industry not found"
            });
        }

        res.status(200).json({
            message: "Industry deleted successfully"
        });

    } catch (error) {
        console.error("Delete industry error:", error.message);

        res.status(500).json({
            message: "Server error while deleting industry"
        });
    }
};


module.exports = {
    getIndustries,
    getIndustryById,
    createIndustry,
    updateIndustry,
    deleteIndustry
};