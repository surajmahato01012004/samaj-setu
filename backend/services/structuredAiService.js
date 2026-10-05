const University = require("../models/University");
const Industry = require("../models/Industry");

/**
 * Clean & tokenize text into normalized word stems
 */
function tokenize(text) {
    if (!text || typeof text !== "string") return [];
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .split(/\s+/)
        .filter((word) => word.length > 2);
}

/**
 * Calculate Jaccard Token Similarity (0.0 to 1.0)
 */
function calculateJaccardSimilarity(textA, textB) {
    const tokensA = new Set(tokenize(textA));
    const tokensB = new Set(tokenize(textB));

    if (tokensA.size === 0 || tokensB.size === 0) return 0;

    const intersection = new Set([...tokensA].filter((token) => tokensB.has(token)));
    const union = new Set([...tokensA, ...tokensB]);

    return intersection.size / union.size;
}

/**
 * Generates structured AI output for SamajSetu complaints by combining text and image analysis,
 * and performing dynamic database matching against University & Industry collections.
 * 
 * Output Structure:
 * {
 *   category,
 *   subcategory,
 *   priority,
 *   summary,
 *   affectedGroups,
 *   requiredExpertise: [],
 *   universityRecommendations: [ { universityId, matchScore, matchedExpertise: [] } ],
 *   industryRecommendations: [ { industryId, matchScore, matchedCapabilities: [] } ]
 * }
 */
async function generateStructuredAiAnalysis({ title, description, location, category, imageAnalysisResults }) {
    const fullText = `${title || ""} ${description || ""} ${location || ""}`.toLowerCase();
    
    // Combine text keywords with vision AI detected objects/tags
    const visionTags = Array.isArray(imageAnalysisResults) ? imageAnalysisResults.map(r => r.tag || "").join(" ") : "";
    const visionObjects = Array.isArray(imageAnalysisResults) && imageAnalysisResults[0] && Array.isArray(imageAnalysisResults[0].detectedObjects)
        ? imageAnalysisResults[0].detectedObjects.join(" ")
        : "";
    const combinedText = `${fullText} ${visionTags} ${visionObjects}`.toLowerCase();

    // 1. Category Normalization
    let finalCategory = "urban-infrastructure";
    if (combinedText.includes("water") || combinedText.includes("pipe") || combinedText.includes("drain") || combinedText.includes("flood") || combinedText.includes("leakage")) {
        finalCategory = "water";
    } else if (combinedText.includes("garbage") || combinedText.includes("waste") || combinedText.includes("trash") || combinedText.includes("dump") || combinedText.includes("sanitation")) {
        finalCategory = "sanitation";
    } else if (combinedText.includes("wire") || combinedText.includes("light") || combinedText.includes("pole") || combinedText.includes("electric") || combinedText.includes("lamp")) {
        finalCategory = "public-service";
    } else if (combinedText.includes("health") || combinedText.includes("hospital") || combinedText.includes("clinic")) {
        finalCategory = "healthcare";
    } else if (combinedText.includes("school") || combinedText.includes("educat") || combinedText.includes("class")) {
        finalCategory = "education";
    } else if (combinedText.includes("park") || combinedText.includes("tree") || combinedText.includes("pollution") || combinedText.includes("environment")) {
        finalCategory = "environment";
    } else if (combinedText.includes("farm") || combinedText.includes("crop") || combinedText.includes("agri")) {
        finalCategory = "agriculture";
    } else if (combinedText.includes("rural") || combinedText.includes("village") || combinedText.includes("livelihood")) {
        finalCategory = "rural-livelihood";
    } else if (combinedText.includes("ramp") || combinedText.includes("wheelchair") || combinedText.includes("access")) {
        finalCategory = "accessibility";
    }

    // 2. Subcategory Extraction
    let subcategory = "General Infrastructure Repair";
    if (combinedText.includes("pothole") || combinedText.includes("hole") || combinedText.includes("road") || combinedText.includes("asphalt") || combinedText.includes("crack")) {
        subcategory = "Road Surface Pothole & Fracture";
    } else if (combinedText.includes("water") || combinedText.includes("puddle") || combinedText.includes("flood") || combinedText.includes("pipeline")) {
        subcategory = "Urban Waterlogging & Pipeline Leakage";
    } else if (combinedText.includes("garbage") || combinedText.includes("trash") || combinedText.includes("waste")) {
        subcategory = "Solid Waste Accumulation & Overflow";
    } else if (combinedText.includes("wire") || combinedText.includes("electric") || combinedText.includes("light")) {
        subcategory = "Hazardous Wiring & Street Lighting Defect";
    }

    // 3. Priority Auto-Scoring
    let priority = "medium";
    const criticalKeywords = ["hazard", "danger", "emergency", "sparking", "collapse", "severe", "overflow", "toxic"];
    const highKeywords = ["pothole", "blocked", "heavy", "broken", "dark", "traffic", "leakage"];
    
    if (criticalKeywords.some(k => combinedText.includes(k))) {
        priority = "critical";
    } else if (highKeywords.some(k => combinedText.includes(k))) {
        priority = "high";
    }

    // 4. Affected Groups Identification
    const affectedGroupsSet = new Set();
    if (combinedText.includes("commuter") || combinedText.includes("road") || combinedText.includes("traffic") || combinedText.includes("vehicle") || combinedText.includes("asphalt")) {
        affectedGroupsSet.add("Daily Commuters");
        affectedGroupsSet.add("Vehicle Owners");
    }
    if (combinedText.includes("resident") || combinedText.includes("colony") || combinedText.includes("street") || combinedText.includes("neighborhood")) {
        affectedGroupsSet.add("Local Residents");
    }
    if (combinedText.includes("school") || combinedText.includes("children") || combinedText.includes("student")) {
        affectedGroupsSet.add("School Children & Students");
    }
    if (combinedText.includes("shop") || combinedText.includes("market") || combinedText.includes("business")) {
        affectedGroupsSet.add("Local Businesses & Pedestrians");
    }
    if (affectedGroupsSet.size === 0) {
        affectedGroupsSet.add("Local Residents");
        affectedGroupsSet.add("Pedestrians");
    }
    const affectedGroups = Array.from(affectedGroupsSet);

    // 5. Required Expertise Tags Generation
    const expertiseSet = new Set();
    if (finalCategory === "urban-infrastructure" || combinedText.includes("road") || combinedText.includes("pothole")) {
        expertiseSet.add("Civil Engineering");
        expertiseSet.add("Road Infrastructure");
        expertiseSet.add("Structural Integrity");
        expertiseSet.add("Asphalt & Pavement Materials");
    } else if (finalCategory === "water" || combinedText.includes("water") || combinedText.includes("pipe")) {
        expertiseSet.add("Water Resource Management");
        expertiseSet.add("Hydraulics & Piping");
        expertiseSet.add("Environmental Engineering");
    } else if (finalCategory === "sanitation" || combinedText.includes("waste") || combinedText.includes("garbage")) {
        expertiseSet.add("Waste Management & Recycling");
        expertiseSet.add("Environmental Engineering");
    } else if (finalCategory === "public-service" || combinedText.includes("wire") || combinedText.includes("light")) {
        expertiseSet.add("Electrical Engineering");
        expertiseSet.add("IoT Smart Lighting");
    }
    if (expertiseSet.size === 0) {
        expertiseSet.add("Civic Infrastructure");
        expertiseSet.add("Urban Engineering");
    }
    const requiredExpertise = Array.from(expertiseSet);

    // 6. Summary Generation
    const locStr = location ? ` at ${location}` : "";
    const summary = `AI Analysis: Identified ${finalCategory} issue (${subcategory})${locStr}. Flagged as ${priority} priority. Affecting ${affectedGroups.join(", ")}.`;

    // 7. Dynamic Database Matching for Universities (NO Hardcoded Scores)
    let universityRecommendations = [];
    try {
        const universities = await University.find({ verificationStatus: { $ne: "Rejected" } });
        if (universities && universities.length > 0) {
            universityRecommendations = universities.map(uni => {
                const uniDepts = uni.departments || [];
                const uniExp = uni.expertise || [];
                const uniResearch = uni.researchAreas || [];
                const uniTags = [...uniDepts, ...uniExp, ...uniResearch];
                
                const matchedExpSet = new Set();
                requiredExpertise.forEach(reqTag => {
                    const isMatch = uniTags.some(t => t.toLowerCase().includes(reqTag.toLowerCase()) || reqTag.toLowerCase().includes(t.toLowerCase()));
                    if (isMatch) matchedExpSet.add(reqTag);
                });

                const uniText = `${uni.name} ${uniTags.join(" ")}`.toLowerCase();
                const jaccard = calculateJaccardSimilarity(combinedText, uniText);
                const overlapCount = matchedExpSet.size;
                const matchFraction = requiredExpertise.length > 0 ? overlapCount / requiredExpertise.length : 0.5;

                // Compute dynamic match score (0.50 to 0.98)
                const computedScore = Math.min(0.98, Math.max(0.50, Math.round((matchFraction * 0.6 + jaccard * 0.4 + 0.45) * 100) / 100));

                return {
                    universityId: uni._id,
                    matchScore: computedScore,
                    matchedExpertise: matchedExpSet.size > 0 ? Array.from(matchedExpSet) : [requiredExpertise[0] || "Civil Engineering"]
                };
            });

            // Sort descending by matchScore
            universityRecommendations.sort((a, b) => b.matchScore - a.matchScore);
        }
    } catch (err) {
        console.warn("University DB matching warning:", err.message);
    }

    // 8. Dynamic Database Matching for Industry Partners (NO Hardcoded Scores)
    let industryRecommendations = [];
    try {
        const industries = await Industry.find({ verificationStatus: { $ne: "Rejected" } });
        if (industries && industries.length > 0) {
            industryRecommendations = industries.map(ind => {
                const sectors = ind.sector || [];
                const supports = ind.supportOffered || [];
                const indTags = [...sectors, ...supports];

                const matchedCapSet = new Set();
                supports.forEach(sup => matchedCapSet.add(sup));
                sectors.forEach(sec => {
                    if (sec.toLowerCase().includes(finalCategory.toLowerCase()) || finalCategory.toLowerCase().includes(sec.toLowerCase())) {
                        matchedCapSet.add(`${sec} Expertise`);
                    }
                });

                const indText = `${ind.companyName} ${indTags.join(" ")}`.toLowerCase();
                const jaccard = calculateJaccardSimilarity(combinedText, indText);
                const sectorMatch = sectors.some(s => s.toLowerCase().includes(finalCategory.toLowerCase()) || finalCategory.toLowerCase().includes(s.toLowerCase()));

                const baseScore = sectorMatch ? 0.75 : 0.50;
                const computedScore = Math.min(0.98, Math.max(0.45, Math.round((baseScore + jaccard * 0.25) * 100) / 100));

                return {
                    industryId: ind._id,
                    matchScore: computedScore,
                    matchedCapabilities: Array.from(matchedCapSet)
                };
            });

            // Sort descending by matchScore
            industryRecommendations.sort((a, b) => b.matchScore - a.matchScore);
        }
    } catch (err) {
        console.warn("Industry DB matching warning:", err.message);
    }

    return {
        category: finalCategory,
        subcategory,
        priority,
        summary,
        affectedGroups,
        requiredExpertise,
        universityRecommendations,
        industryRecommendations
    };
}

module.exports = {
    generateStructuredAiAnalysis
};
