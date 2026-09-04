const Challenge = require("../models/Challenge");

// GET ALL CHALLENGES
const getChallenges = async (req, res) => {
    try {
        const challenges = await Challenge.find()
            .populate("linkedGrievance")
            .populate("matchedUniversity")
            .populate("industrySponsor")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: challenges.length,
            challenges
        });

    } catch (error) {
        console.error("Get challenges error:", error.message);

        res.status(500).json({
            message: "Server error while fetching challenges"
        });
    }
};


// GET ONE CHALLENGE BY ID
const getChallengeById = async (req, res) => {
    try {
        const challenge = await Challenge.findById(req.params.id)
            .populate("linkedGrievance")
            .populate("matchedUniversity")
            .populate("industrySponsor");

        if (!challenge) {
            return res.status(404).json({
                message: "Challenge not found"
            });
        }

        res.status(200).json({
            challenge
        });

    } catch (error) {
        console.error("Get challenge error:", error.message);

        res.status(500).json({
            message: "Server error while fetching challenge"
        });
    }
};


// CREATE A CHALLENGE
const createChallenge = async (req, res) => {
    try {
        const {
            title,
            description,
            linkedGrievance,
            assignedDepartment,
            matchedUniversity,
            industrySponsor,
            status,
            requiredExpertise,
            supportNeeded
        } = req.body;

        if (!title || !description || !assignedDepartment) {
            return res.status(400).json({
                message: "Please provide title, description and assigned department"
            });
        }

        const challenge = await Challenge.create({
            title,
            description,
            linkedGrievance,
            assignedDepartment,
            matchedUniversity,
            industrySponsor,
            status,
            requiredExpertise,
            supportNeeded
        });

        res.status(201).json({
            message: "Challenge created successfully",
            challenge
        });

    } catch (error) {
        console.error("Create challenge error:", error.message);

        res.status(500).json({
            message: "Server error while creating challenge"
        });
    }
};


// UPDATE CHALLENGE
const updateChallenge = async (req, res) => {
    try {
        const challenge = await Challenge.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!challenge) {
            return res.status(404).json({
                message: "Challenge not found"
            });
        }

        res.status(200).json({
            message: "Challenge updated successfully",
            challenge
        });

    } catch (error) {
        console.error("Update challenge error:", error.message);

        res.status(500).json({
            message: "Server error while updating challenge"
        });
    }
};


module.exports = {
    getChallenges,
    getChallengeById,
    createChallenge,
    updateChallenge
};