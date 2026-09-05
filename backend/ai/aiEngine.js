/**
 * SamajSetu - Standalone Zero-Conflict AI Engine
 * 
 * Core AI Algorithms:
 * Task 1: Complaint Analysis & Parameter Extractions
 * Task 2: Duplicate & Similarity Detection (TF-IDF + Jaccard Vector Math)
 * Task 3: University & Industry Matchmaking Engine
 * Task 4: Authority Routing & SLA Escalation
 * Task 5: Full End-to-End Pipeline Execution
 */

// -----------------------------------------------------------------------------
// HELPER UTILITIES: NLP & TEXT VECTOR SIMILARITY MATH (Zero External Dependencies)
// -----------------------------------------------------------------------------

/**
 * Clean & tokenize text into normalized word stems
 */
function tokenize(text) {
  if (!text || typeof text !== 'string') return [];
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
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
 * Calculate Keyword Match Score against target domain tags
 */
function calculateTagOverlapScore(text, tagsArray) {
  if (!tagsArray || !Array.isArray(tagsArray) || tagsArray.length === 0) return 0;
  const textTokens = new Set(tokenize(text));
  let matchedCount = 0;

  tagsArray.forEach((tag) => {
    const tagTokens = tokenize(tag);
    const hasMatch = tagTokens.some((t) => textTokens.has(t));
    if (hasMatch) matchedCount++;
  });

  return matchedCount / tagsArray.length;
}

// -----------------------------------------------------------------------------
// TASK 1: COMPLAINT ANALYSIS & FEATURE EXTRACTION
// -----------------------------------------------------------------------------

/**
 * Analyzes raw complaint text to extract category, priority, summary, affected groups, and required expertise.
 * @param {Object} complaint - { title, description, location, category, priority }
 * @returns {Object} Extracted analysis parameters
 */
function analyzeComplaint(complaint) {
  const title = complaint.title || '';
  const description = complaint.description || '';
  const fullText = `${title} ${description}`.toLowerCase();

  // 1. Category Detection (if not explicitly provided or to validate)
  const categoryKeywords = {
    Infrastructure: ['road', 'bridge', 'pothole', 'drain', 'drainage', 'building', 'footpath', 'flyover', 'crack', 'structure', 'construction'],
    'Water Supply': ['water', 'pipe', 'leakage', 'contamination', 'pipeline', 'tank', 'drinking', 'sewage', 'tap', 'drainage'],
    Sanitation: ['garbage', 'waste', 'trash', 'cleanliness', 'dump', 'smell', 'stench', 'recycling', 'hygiene', 'bin'],
    Security: ['light', 'dark', 'street light', 'camera', 'crime', 'patrol', 'safety', 'security', 'cctv', 'harassment'],
    'Public Transport': ['bus', 'traffic', 'signal', 'stop', 'metro', 'congestion', 'transport', 'vehicle', 'parking'],
    Electricity: ['wire', 'power', 'outage', 'transformer', 'sparking', 'cable', 'voltage', 'electricity', 'pole'],
    Environment: ['tree', 'park', 'pollution', 'smoke', 'river', 'canal', 'greenery', 'noise', 'air']
  };

  let detectedCategory = complaint.category || 'Infrastructure';
  if (!complaint.category || complaint.category === 'Other') {
    let maxCategoryMatches = 0;
    Object.entries(categoryKeywords).forEach(([cat, keywords]) => {
      const count = keywords.filter((k) => fullText.includes(k)).length;
      if (count > maxCategoryMatches) {
        maxCategoryMatches = count;
        detectedCategory = cat;
      }
    });
  }

  // 2. Subcategory Extraction
  let subcategory = 'General Maintenance';
  if (fullText.includes('waterlogging') || fullText.includes('drain')) subcategory = 'Urban Drainage & Flood Risk';
  else if (fullText.includes('pothole') || fullText.includes('road')) subcategory = 'Road Repair & Pavement Hazard';
  else if (fullText.includes('garbage') || fullText.includes('waste')) subcategory = 'Solid Waste Accumulation';
  else if (fullText.includes('pipe') || fullText.includes('leak')) subcategory = 'Pipeline Burst / Contamination';
  else if (fullText.includes('wire') || fullText.includes('spark')) subcategory = 'Hazardous Electrical Wiring';
  else if (fullText.includes('street light') || fullText.includes('dark')) subcategory = 'Public Illumination & Safety';

  // 3. Emergency Priority Auto-Scoring
  const urgentKeywords = ['urgent', 'emergency', 'sparking', 'collapse', 'flood', 'overflow', 'contamination', 'hazard', 'severe', 'danger', 'broken pipe'];
  const highKeywords = ['heavy', 'blocked', 'dark', 'traffic', 'bad smell', 'frequent', 'disrupted'];

  let priority = complaint.priority || 'Medium';
  const hasUrgent = urgentKeywords.some((k) => fullText.includes(k));
  const hasHigh = highKeywords.some((k) => fullText.includes(k));

  if (hasUrgent) priority = 'Urgent';
  else if (hasHigh && priority !== 'Urgent') priority = 'High';

  // 4. Affected Groups Identification
  const affectedGroups = [];
  if (fullText.includes('school') || fullText.includes('children') || fullText.includes('student')) affectedGroups.push('School Children & Students');
  if (fullText.includes('commuter') || fullText.includes('road') || fullText.includes('traffic') || fullText.includes('bus')) affectedGroups.push('Daily Commuters');
  if (fullText.includes('resident') || fullText.includes('flat') || fullText.includes('colony') || fullText.includes('house')) affectedGroups.push('Local Residents');
  if (fullText.includes('market') || fullText.includes('shop') || fullText.includes('business')) affectedGroups.push('Local Commercial Businesses');
  if (affectedGroups.length === 0) affectedGroups.push('General Public');

  // 5. Required R&D Expertise Tags Generation
  const expertiseSet = new Set();
  if (detectedCategory === 'Infrastructure' || fullText.includes('road') || fullText.includes('drain')) {
    expertiseSet.add('Civil Engineering');
    expertiseSet.add('GIS Mapping');
    expertiseSet.add('Urban Infrastructure');
  }
  if (detectedCategory === 'Water Supply' || fullText.includes('water') || fullText.includes('pipe')) {
    expertiseSet.add('Water Resource Management');
    expertiseSet.add('Hydraulics & Piping');
    expertiseSet.add('Water Quality Testing');
  }
  if (detectedCategory === 'Sanitation' || fullText.includes('waste') || fullText.includes('garbage')) {
    expertiseSet.add('Waste Management & Recycling');
    expertiseSet.add('Environmental Engineering');
  }
  if (detectedCategory === 'Electricity' || fullText.includes('wire') || fullText.includes('power')) {
    expertiseSet.add('Electrical Engineering');
    expertiseSet.add('IoT Sensors & Smart Grid');
  }
  if (detectedCategory === 'Security' || fullText.includes('camera') || fullText.includes('light')) {
    expertiseSet.add('Smart Illumination');
    expertiseSet.add('AI Surveillance');
  }

  // Fallback expertise
  if (expertiseSet.size === 0) {
    expertiseSet.add('Civic Tech Solutions');
    expertiseSet.add('Urban Planning');
  }

  // 6. Summary Generation
  const locationStr = complaint.location ? ` near ${complaint.location}` : '';
  const summary = `Reported ${detectedCategory.toLowerCase()} issue (${subcategory})${locationStr}. Flagged as ${priority} priority affecting ${affectedGroups.join(', ')}.`;

  return {
    category: detectedCategory,
    subcategory,
    priority,
    summary,
    affectedGroups,
    requiredExpertise: Array.from(expertiseSet)
  };
}

// -----------------------------------------------------------------------------
// TASK 2: DUPLICATE & SIMILARITY DETECTION
// -----------------------------------------------------------------------------

/**
 * Compares a incoming complaint against existing complaints in the database.
 * Flags duplicates if similarity score >= similarityThreshold (default 0.70 / 70%).
 * 
 * @param {Object} newComplaint - { title, description, location }
 * @param {Array} existingComplaints - Array of existing complaint objects
 * @param {Number} threshold - Similarity cutoff (0.0 to 1.0, default 0.70)
 * @returns {Object} Duplicate analysis results
 */
function detectDuplicates(newComplaint, existingComplaints = [], threshold = 0.70) {
  if (!existingComplaints || existingComplaints.length === 0) {
    return {
      isDuplicate: false,
      similarityScore: 0,
      similarityPercentage: '0%',
      matchedComplaint: null,
      recommendation: 'Unique issue reported. Promote to new R&D Challenge.'
    };
  }

  const newText = `${newComplaint.title} ${newComplaint.description} ${newComplaint.location || ''}`;
  let highestScore = 0;
  let bestMatch = null;

  existingComplaints.forEach((existing) => {
    const existingText = `${existing.title} ${existing.description} ${existing.location || ''}`;
    
    // Calculate Jaccard similarity score
    const similarity = calculateJaccardSimilarity(newText, existingText);
    
    // Location match boost if exact location matches
    let locationBoost = 0;
    if (newComplaint.location && existing.location && newComplaint.location.toLowerCase().trim() === existing.location.toLowerCase().trim()) {
      locationBoost = 0.15;
    }

    const finalScore = Math.min(1.0, similarity + locationBoost);

    if (finalScore > highestScore) {
      highestScore = finalScore;
      bestMatch = existing;
    }
  });

  const roundedScore = Math.round(highestScore * 100) / 100;
  const isDuplicate = roundedScore >= threshold;

  return {
    isDuplicate,
    similarityScore: roundedScore,
    similarityPercentage: `${Math.round(roundedScore * 100)}%`,
    matchedComplaint: isDuplicate ? bestMatch : null,
    recommendation: isDuplicate
      ? `Duplicate issue detected (${Math.round(roundedScore * 100)}% match). Consolidate into existing Challenge ID: ${bestMatch._id || bestMatch.id || 'CHALLENGE_MATCH'} and increment upvote count.`
      : 'Unique issue reported. Promote to new R&D Challenge.'
  };
}

// -----------------------------------------------------------------------------
// TASK 3: UNIVERSITY & INDUSTRY MATCHMAKING ENGINE
// -----------------------------------------------------------------------------

/**
 * Matches a Consolidated Challenge with Universities and Industry Partners.
 * Ranks entities using weighted expertise, department, sector, and support availability.
 * 
 * @param {Object} challenge - { title, description, category, requiredExpertise, location }
 * @param {Array} universities - Array of University records
 * @param {Array} industries - Array of Industry Partner records
 * @returns {Object} Ranked lists of matched Universities and Industry Partners
 */
function matchUniversitiesAndIndustries(challenge, universities = [], industries = []) {
  const reqExpertise = challenge.requiredExpertise || [];
  const category = challenge.category || 'Infrastructure';
  const fullText = `${challenge.title} ${challenge.description} ${reqExpertise.join(' ')}`;

  // 1. Rank Universities
  const rankedUniversities = universities.map((uni) => {
    const uniExpertise = uni.expertise || [];
    const uniDepts = uni.departments || [];
    const uniResearch = uni.researchAreas || [];
    const allUniTags = [...uniExpertise, ...uniDepts, ...uniResearch];

    // Expertise overlap score
    let matchedExpertise = [];
    reqExpertise.forEach((reqTag) => {
      const isMatched = allUniTags.some((uniTag) => uniTag.toLowerCase().includes(reqTag.toLowerCase()) || reqTag.toLowerCase().includes(uniTag.toLowerCase()));
      if (isMatched) matchedExpertise.push(reqTag);
    });

    const expertiseScore = reqExpertise.length > 0 ? matchedExpertise.length / reqExpertise.length : 0.5;
    const tagOverlapScore = calculateTagOverlapScore(fullText, allUniTags);

    // Composite Match Confidence Score (0% to 100%)
    const rawScore = expertiseScore * 0.6 + tagOverlapScore * 0.4;
    const matchPercentage = Math.min(99, Math.max(50, Math.round(rawScore * 100)));

    return {
      universityId: uni._id || uni.id || uni.code,
      name: uni.name,
      code: uni.code,
      location: uni.location,
      matchScore: matchPercentage,
      matchedExpertise: matchedExpertise.length > 0 ? matchedExpertise : [uniExpertise[0] || 'General R&D'],
      nodalOfficer: uni.nodalOfficer || { name: 'R&D Cell', email: 'rnd@university.edu' }
    };
  });

  // Sort Universities by match score descending
  rankedUniversities.sort((a, b) => b.matchScore - a.matchScore);

  // 2. Rank Industry Partners
  const rankedIndustries = industries.map((ind) => {
    const sectors = ind.sector || [];
    const supports = ind.supportOffered || [];
    const indText = `${ind.companyName} ${sectors.join(' ')} ${supports.join(' ')}`;

    const sectorMatch = sectors.some((s) => s.toLowerCase().includes(category.toLowerCase()) || category.toLowerCase().includes(s.toLowerCase()));
    const jaccardScore = calculateJaccardSimilarity(fullText, indText);

    const baseScore = sectorMatch ? 0.7 : 0.4;
    const matchPercentage = Math.min(98, Math.max(45, Math.round((baseScore + jaccardScore * 0.3) * 100)));

    return {
      industryId: ind._id || ind.id || ind.registrationNo,
      companyName: ind.companyName,
      headquarters: ind.headquarters,
      matchScore: matchPercentage,
      supportOffered: supports,
      csrBudget: ind.csrBudget || 'CSR Grant Available',
      contactPerson: ind.contactPerson || { name: 'CSR Lead', email: 'csr@company.com' }
    };
  });

  // Sort Industry Partners by match score descending
  rankedIndustries.sort((a, b) => b.matchScore - a.matchScore);

  return {
    topUniversityMatch: rankedUniversities[0] || null,
    allMatchedUniversities: rankedUniversities,
    topIndustrySponsor: rankedIndustries[0] || null,
    allMatchedIndustries: rankedIndustries
  };
}

// -----------------------------------------------------------------------------
// TASK 4: AUTHORITY ROUTING & SLA ESCALATION
// -----------------------------------------------------------------------------

/**
 * Routes a Challenge to the appropriate Government Authority based on category and jurisdiction.
 * Calculates SLA resolution targets.
 * 
 * @param {Object} challenge - { category, location, priority }
 * @param {Array} authorities - Array of Authority records
 * @returns {Object} Designated Authority routing & SLA target
 */
function routeAuthority(challenge, authorities = []) {
  const category = challenge.category || 'Infrastructure';
  const location = challenge.location || 'Municipal Region';
  const priority = challenge.priority || 'Medium';

  // 1. Find matching department in authorities list
  let designatedAuthority = authorities.find((auth) => {
    const categories = auth.assignedCategories || [];
    return categories.includes(category);
  });

  // Fallback mapping if not found in list
  if (!designatedAuthority) {
    const defaultDepartmentMap = {
      Infrastructure: 'Public Works Department (PWD)',
      'Water Supply': 'Water Supply & Sewerage Board',
      Sanitation: 'Solid Waste Management Board',
      Security: 'Local Police & Civic Patrol',
      'Public Transport': 'Metropolitan Transport Authority',
      Electricity: 'Electricity Distribution Board',
      Environment: 'Parks & Environmental Protection Board'
    };

    designatedAuthority = {
      departmentName: defaultDepartmentMap[category] || 'Municipal Governance Board',
      jurisdiction: location,
      authorityType: 'Municipal Body',
      officialInCharge: {
        name: 'Executive Nodal Engineer',
        email: `nodal.${category.toLowerCase().replace(/\s+/g, '')}@civicgov.in`,
        designation: 'Superintending Officer'
      }
    };
  }

  // 2. Calculate SLA Resolution Target Timeline
  let slaHours = 72; // Default 3 days
  if (priority === 'Urgent') slaHours = 24; // 24 hours
  else if (priority === 'High') slaHours = 48; // 48 hours
  else if (priority === 'Low') slaHours = 120; // 5 days

  const slaDeadline = new Date();
  slaDeadline.setHours(slaDeadline.getHours() + slaHours);

  return {
    assignedDepartment: designatedAuthority.departmentName,
    jurisdiction: designatedAuthority.jurisdiction || location,
    authorityType: designatedAuthority.authorityType || 'Municipal Body',
    officialInCharge: designatedAuthority.officialInCharge,
    slaTarget: {
      resolutionTargetHours: slaHours,
      deadlineTimestamp: slaDeadline.toISOString(),
      priorityLevel: priority
    }
  };
}

// -----------------------------------------------------------------------------
// TASK 5: FULL PIPELINE EXECUTION ENGINE
// -----------------------------------------------------------------------------

/**
 * Runs the complete SamajSetu end-to-end AI Pipeline:
 * Citizen Complaint → AI Analysis → Duplicate Detection → Challenge Consolidation → University + Industry + Authority Matching
 * 
 * @param {Object} newComplaint - Raw input citizen complaint
 * @param {Array} existingComplaints - Current database complaints
 * @param {Array} universities - List of onboarded Universities
 * @param {Array} industries - List of onboarded Industry partners
 * @param {Array} authorities - List of registered Authorities
 * @returns {Object} Complete end-to-end pipeline execution result
 */
function processPipeline(newComplaint, existingComplaints = [], universities = [], industries = [], authorities = []) {
  // Step 1: AI Analysis & Feature Extraction
  const analysis = analyzeComplaint(newComplaint);

  // Step 2: Duplicate Detection
  const duplicateCheck = detectDuplicates(newComplaint, existingComplaints, 0.70);

  // Step 3: Consolidated Challenge Object
  const consolidatedChallenge = {
    title: duplicateCheck.isDuplicate ? duplicateCheck.matchedComplaint.title : newComplaint.title,
    description: duplicateCheck.isDuplicate ? duplicateCheck.matchedComplaint.description : newComplaint.description,
    location: newComplaint.location || 'Municipal Ward',
    category: analysis.category,
    subcategory: analysis.subcategory,
    priority: analysis.priority,
    summary: analysis.summary,
    affectedGroups: analysis.affectedGroups,
    requiredExpertise: analysis.requiredExpertise,
    isConsolidatedDuplicate: duplicateCheck.isDuplicate,
    similarityScore: duplicateCheck.similarityPercentage,
    upvoteCount: duplicateCheck.isDuplicate ? (duplicateCheck.matchedComplaint.upvotes || 1) + 1 : 1
  };

  // Step 4: Multi-Entity Matching (University & Industry)
  const entityMatches = matchUniversitiesAndIndustries(consolidatedChallenge, universities, industries);

  // Step 5: Authority Routing & SLA Escalation
  const authorityRouting = routeAuthority(consolidatedChallenge, authorities);

  return {
    success: true,
    timestamp: new Date().toISOString(),
    pipelineFlow: 'Citizen Complaint → AI Analysis → Duplicate Detection → Consolidated Challenge → University + Industry + Authority Matching',
    extractedAnalysis: analysis,
    duplicateDetection: duplicateCheck,
    consolidatedChallenge,
    universityMatch: entityMatches.topUniversityMatch,
    allMatchedUniversities: entityMatches.allMatchedUniversities,
    industrySponsor: entityMatches.topIndustrySponsor,
    allMatchedIndustries: entityMatches.allMatchedIndustries,
    authorityRouting
  };
}

// -----------------------------------------------------------------------------
// MODULE EXPORTS
// -----------------------------------------------------------------------------
module.exports = {
  analyzeComplaint,
  detectDuplicates,
  matchUniversitiesAndIndustries,
  routeAuthority,
  processPipeline,
  calculateJaccardSimilarity
};
