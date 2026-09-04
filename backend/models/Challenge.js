const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        linkedGrievance: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Complaint"
        },

        assignedDepartment: {
            type: String,
            required: true
        },

        matchedUniversity: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "University",
            default: null
        },

        industrySponsor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Industry",
            default: null
        },

        status: {
            type: String,
            enum: [
                "Open for Matching",
                "Team Assigned",
                "In R&D / Prototyping",
                "Field Testing",
                "Deployed & Resolved"
            ],
            default: "Open for Matching"
        },

        requiredExpertise: [
            {
                type: String
            }
        ],

        supportNeeded: [
            {
                type: String
            }
        ]
    },
    {
        timestamps: true
    }
);

const Challenge = mongoose.model("Challenge", challengeSchema);

module.exports = Challenge;