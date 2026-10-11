
const mongoose = require("mongoose");

const collaborationSchema = new mongoose.Schema(
    {
        complaint: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Complaint",
            required: true,
            index: true
        },

        initiatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        initiatorOrganizationId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },

        initiatorOrganizationType: {
            type: String,
            enum: ["University", "Industry"],
            required: true
        },

        partnerOrganizationId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },

        partnerOrganizationType: {
            type: String,
            enum: ["University", "Industry"],
            required: true
        },

        status: {
            type: String,
            enum: [
                "pending",
                "accepted",
                "declined",
                "cancelled"
            ],
            default: "pending",
            index: true
        },

        respondedAt: {
            type: Date,
            default: null
        },

        authorityNotifiedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

collaborationSchema.index({
    complaint: 1,
    createdAt: -1
});

module.exports = mongoose.model(
    "Collaboration",
    collaborationSchema
);
