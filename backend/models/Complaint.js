const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            required: true,
            enum: [
                "education",
                "healthcare",
                "agriculture",
                "water",
                "sanitation",
                "environment",
                "rural-livelihood",
                "accessibility",
                "urban-infrastructure",
                "public-service"
            ]
        },

        location: {
            type: String,







            
            required: true,
            trim: true
        },

        latitude: {
            type: Number
        },

        longitude: {
            type: Number
        },

        imageUrl: {
            type: String,
            default: ""
        },

        reportedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        status: {
            type: String,
            enum: [
                "reported",
                "validated",
                "consolidated",
                "matched",
                "accepted",
                "in-progress",
                "resolved"
            ],
            default: "reported"
        },

        priority: {
            type: String,
            enum: ["low", "medium", "high", "critical"],
            default: "medium"
        },

        imageAnalysisResults: [
            {
                tag: {
                    type: String,
                    trim: true
                },
                confidence: {
                    type: Number
                },
                category: {
                    type: String,
                    trim: true
                },
                description: {
                    type: String,
                    trim: true
                },
                detectedObjects: [
                    {
                        type: String,
                        trim: true
                    }
                ]
            }
        ],

        aiAnalysis: {
            category: {
                type: String,
                trim: true
            },
            subcategory: {
                type: String,
                trim: true
            },
            priority: {
                type: String,
                enum: ["low", "medium", "high", "critical"],
                default: "medium"
            },
            summary: {
                type: String,
                trim: true
            },
            affectedGroups: [
                {
                    type: String,
                    trim: true
                }
            ],
            requiredExpertise: [
                {
                    type: String,
                    trim: true
                }
            ],
            universityRecommendations: [
                {
                    universityId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "University"
                    },
                    matchScore: {
                        type: Number
                    },
                    matchedExpertise: [
                        {
                            type: String,
                            trim: true
                        }
                    ]
                }
            ],
            industryRecommendations: [
                {
                    industryId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Industry"
                    },
                    matchScore: {
                        type: Number
                    },
                    matchedCapabilities: [
                        {
                            type: String,
                            trim: true
                        }
                    ]
                }
            ]
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Complaint", complaintSchema);