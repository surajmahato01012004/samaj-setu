const { analyzeImage } = require("../services/imageAnalysisService");

/**
 * Controller for Standalone Image Analysis (Test A requirement)
 * Accepts an image file via multipart/form-data upload, runs analyzeImage service,
 * and returns structured imageAnalysisResults.
 */
const analyzeImageUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image file provided. Please attach an image file under the 'image' field."
            });
        }

        const imagePath = `/uploads/${req.file.filename}`;
        const analysisResults = await analyzeImage(req.file.path, req.file.originalname);

        return res.status(200).json({
            success: true,
            message: "Image analyzed successfully",
            data: {
                imageUrl: imagePath,
                imageAnalysisResults: analysisResults
            }
        });
    } catch (error) {
        console.error("Image analysis controller error:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message || "Server error while performing image analysis"
        });
    }
};

module.exports = {
    analyzeImageUpload
};
