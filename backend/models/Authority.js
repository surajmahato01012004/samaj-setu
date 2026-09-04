const mongoose = require("mongoose");

const authoritySchema = new mongoose.Schema(
    {
        departmentName: {
            type: String,
            required: [true, "Department name is required"],
            trim: true
        },

        jurisdiction: {
            type: String,
            required: [true, "Jurisdiction area / region is required"],
            trim: true
        },

        authorityType: {
            type: String,
            enum: [
                "Municipal Body",
                "State Govt Department",
                "Central Ministry",
                "District Collectorate"
            ],
            default: "Municipal Body"
        },

        officialInCharge: {
            name: {
                type: String,
                required: true
            },

            email: {
                type: String,
                required: true
            },

            phone: {
                type: String,
                default: ""
            },

            designation: {
                type: String,
                default: "Executive Engineer / Nodal Officer"
            }
        },

        assignedCategories: [
            {
                type: String,
                enum: [
                    "Infrastructure",
                    "Sanitation",
                    "Water Supply",
                    "Security",
                    "Public Transport",
                    "Electricity",
                    "Environment",
                    "Other"
                ]
            }
        ]
    },
    {
        timestamps: true
    }
);

const Authority = mongoose.model("Authority", authoritySchema);

module.exports = Authority;