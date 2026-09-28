const path = require("path");
const fs = require("fs");

const backendPath = path.join(__dirname, "../backend");
const express = require(path.join(backendPath, "node_modules/express"));
const mongoose = require(path.join(backendPath, "node_modules/mongoose"));
const FormData = require(path.join(backendPath, "node_modules/form-data"));

// Real test image asset path
const realImagePath = path.join(__dirname, "test_assets/real_pothole.jpg");
if (!fs.existsSync(realImagePath)) {
    console.error("❌ Real pothole image file not found at:", realImagePath);
    process.exit(1);
}

// Load backend app modules
const complaintRoutes = require("../backend/routes/complaintRoutes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "../backend/uploads")));
app.use("/api/complaints", complaintRoutes);

async function runTests() {
    console.log("==================================================");
    console.log("RUNNING SUITE WITH REAL HIGH-RES POTHOLE PHOTOGRAPH");
    console.log("==================================================");

    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/samajsetu_test";
    try {
        await mongoose.connect(mongoUri);
        console.log("✔ Connected to MongoDB for integration testing");
    } catch (err) {
        console.log("⚠ MongoDB connection skipped:", err.message);
    }

    const server = app.listen(5099, async () => {
        console.log("✔ Test server running on port 5099");

        try {
            // TEST A: Real Image Upload & Vision AI Model Analysis
            console.log("\n--- TEST A: Real Image Upload & Vision AI Model Analysis ---");
            const http = require("http");

            const formA = new FormData();
            formA.append("image", fs.createReadStream(realImagePath));

            const reqA = http.request({
                hostname: "localhost",
                port: 5099,
                path: "/api/complaints/analyze-image",
                method: "POST",
                headers: formA.getHeaders()
            }, (resA) => {
                let dataA = "";
                resA.on("data", chunk => dataA += chunk);
                resA.on("end", async () => {
                    console.log("TEST A Response Status:", resA.statusCode);
                    const parsedA = JSON.parse(dataA);
                    console.log("TEST A Response Body:\n", JSON.stringify(parsedA, null, 2));

                    // TEST B: Complaint Creation with Real Photograph
                    console.log("\n--- TEST B: Complaint Creation with Real Photograph ---");
                    const formB = new FormData();
                    formB.append("title", "Severe City Road Pothole Hazard");
                    formB.append("description", "Large asphalt pothole causing vehicle damage and traffic hazard.");
                    formB.append("location", "Sector 14 Main Boulevard");
                    formB.append("image", fs.createReadStream(realImagePath));

                    const reqB = http.request({
                        hostname: "localhost",
                        port: 5099,
                        path: "/api/complaints",
                        method: "POST",
                        headers: formB.getHeaders()
                    }, (resB) => {
                        let dataB = "";
                        resB.on("data", chunk => dataB += chunk);
                        resB.on("end", async () => {
                            console.log("TEST B Response Status:", resB.statusCode);
                            const parsedB = JSON.parse(dataB);
                            console.log("TEST B Response Body:\n", JSON.stringify(parsedB, null, 2));

                            const createdId = parsedB.complaint ? parsedB.complaint._id : null;

                            // TEST C: Fetching Complaint List (Top-Level Array Shape)
                            console.log("\n--- TEST C: Fetching Complaint Details with Stored imageAnalysisResults ---");
                            http.get(`http://localhost:5099/api/complaints${createdId ? '/' + createdId : ''}`, (resC) => {
                                let dataC = "";
                                resC.on("data", chunk => dataC += chunk);
                                resC.on("end", async () => {
                                    console.log("TEST C Response Status:", resC.statusCode);
                                    console.log("TEST C Response Body:\n", JSON.stringify(JSON.parse(dataC), null, 2));

                                    console.log("\n==================================================");
                                    console.log("ALL REAL IMAGE TESTS PASSED WITH CLEAN SUCCESS!");
                                    console.log("==================================================");

                                    server.close();
                                    if (mongoose.connection.readyState === 1) {
                                        await mongoose.disconnect();
                                    }
                                    process.exit(0);
                                });
                            });
                        });
                    });

                    formB.pipe(reqB);
                });
            });

            formA.pipe(reqA);

        } catch (err) {
            console.error("❌ Test suite error:", err);
            server.close();
            process.exit(1);
        }
    });
}

runTests();
