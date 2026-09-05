# 🤖 SamajSetu AI Engine - Complete Schema & API Specification

This directory contains the **Zero-Conflict, Standalone AI Engine** for **SamajSetu**. It handles the complete 5-step civic problem-solving pipeline without modifying existing backend infrastructure:

$$\text{Citizen Complaint} \longrightarrow \text{Feature Extraction} \longrightarrow \text{Duplicate Detection} \longrightarrow \text{Challenge Consolidation} \longrightarrow \text{University + Industry + Authority Routing}$$

---

## 📁 Module File Structure

```
samajsetu/
└── ai/
    ├── aiEngine.js        # Core AI scoring & vector matching logic (0 npm dependencies)
    ├── aiRoutes.js        # Standalone Express REST Router endpoints
    ├── testExamples.js    # Runnable test script with full mock datasets
    └── README.md          # Exhaustive field-by-field schema & API specification
```

---

## 🗄️ Complete Database Schema Field Reference

Below is the exact schema definition for every model used across the SamajSetu ecosystem.

### 1. `Complaint` (Citizen Grievance)
| Field | Type | Description | Allowed Values / Constraints |
| :--- | :--- | :--- | :--- |
| `_id` | `String / ObjectId` | Unique Complaint Identifier | Auto-generated |
| `title` | `String` | Short title of the civic issue | Required, max 120 chars |
| `description` | `String` | Detailed issue description | Required |
| `category` | `String` | Primary grievance domain | `Infrastructure`, `Sanitation`, `Water Supply`, `Security`, `Public Transport`, `Electricity`, `Environment`, `Other` |
| `location` | `String` | Ward, locality, or landmark | Required |
| `priority` | `String` | Emergency priority ranking | `Low`, `Medium`, `High`, `Urgent` |
| `status` | `String` | Resolution tracking status | `Reported`, `In Progress`, `Resolved` |
| `upvotes` | `Number` | Community endorsement count | Default `1` |
| `reportedBy` | `String` | Citizen reporter name | Default `Anonymous Citizen` |
| `contactEmail` | `String` | Reporter contact email | Optional |
| `officialNotes` | `String` | Remarks from municipal officers | Optional |
| `assignedDepartment` | `String` | Responsible government department | Default `Municipal Governance Board` |

---

### 2. `University` (R&D Partner)
| Field | Type | Description | Allowed Values / Constraints |
| :--- | :--- | :--- | :--- |
| `_id` | `String / ObjectId` | Unique University Identifier | Auto-generated |
| `name` | `String` | Official institution name | Required |
| `code` | `String` | AICTE / UGC Registration Code | Required |
| `location` | `String` | City and state location | Required |
| `departments` | `Array[String]` | Academic departments | e.g. `["Civil Engineering", "Computer Science"]` |
| `expertise` | `Array[String]` | Technical capability tags | e.g. `["GIS Mapping", "Flood Control"]` |
| `researchAreas` | `Array[String]` | Special R&D focus areas | e.g. `["Smart Drainage Networks"]` |
| `nodalOfficer.name` | `String` | R&D Nodal Contact Person | Required |
| `nodalOfficer.email` | `String` | Official institutional email | Required |
| `nodalOfficer.phone` | `String` | Contact phone number | Optional |
| `nodalOfficer.designation` | `String` | Nodal officer role | Default `Nodal Officer / R&D Dean` |
| `verificationStatus` | `String` | Portal onboarding state | `Pending`, `Verified`, `Rejected` |

---

### 3. `Industry` (CSR & Technology Partner)
| Field | Type | Description | Allowed Values / Constraints |
| :--- | :--- | :--- | :--- |
| `_id` | `String / ObjectId` | Unique Corporate Identifier | Auto-generated |
| `companyName` | `String` | Corporate entity name | Required |
| `registrationNo` | `String` | CIN / Registration identifier | Required |
| `sector` | `Array[String]` | Operating industry sectors | e.g. `["Civil Infrastructure", "Clean Tech"]` |
| `headquarters` | `String` | Corporate HQ location | Required |
| `supportOffered` | `Array[String]` | CSR assistance types | `Mentorship`, `Funding / CSR Grant`, `Prototyping Lab`, `Technology Stack`, `Equipment` |
| `csrBudget` | `String` | Allocated grant budget | e.g. `₹25,00,000` |
| `contactPerson.name` | `String` | CSR Lead / Director Name | Required |
| `contactPerson.email` | `String` | Official contact email | Required |
| `contactPerson.phone` | `String` | Contact phone number | Optional |
| `contactPerson.designation` | `String` | Corporate designation | Default `CSR Lead / Technical Director` |
| `verificationStatus` | `String` | Enterprise verification state | `Pending`, `Verified`, `Rejected` |

---

### 4. `Authority` (Government Department)
| Field | Type | Description | Allowed Values / Constraints |
| :--- | :--- | :--- | :--- |
| `_id` | `String / ObjectId` | Unique Authority Identifier | Auto-generated |
| `departmentName` | `String` | Department name | Required |
| `jurisdiction` | `String` | Administrative region / Wards | Required |
| `authorityType` | `String` | Governing body level | `Municipal Body`, `State Govt Department`, `Central Ministry`, `District Collectorate` |
| `officialInCharge.name` | `String` | Nodal Engineer / Officer Name | Required |
| `officialInCharge.email` | `String` | Departmental email address | Required |
| `officialInCharge.phone` | `String` | Direct contact number | Optional |
| `officialInCharge.designation` | `String` | Official designation | Default `Executive Engineer / Nodal Officer` |
| `assignedCategories` | `Array[String]` | Responsible issue domains | Matching `Complaint.category` |

---

### 5. `Challenge` (Consolidated R&D Innovation Project)
| Field | Type | Description | Allowed Values / Constraints |
| :--- | :--- | :--- | :--- |
| `_id` | `String / ObjectId` | Unique Challenge Identifier | Auto-generated |
| `title` | `String` | Consolidated R&D title | Required |
| `description` | `String` | Consolidated problem statement | Required |
| `category` | `String` | Primary domain tag | Required |
| `linkedGrievanceId` | `ObjectId` | Reference to original complaint | Optional |
| `assignedDepartment` | `String` | Responsible Govt Department | Required |
| `matchedUniversity` | `ObjectId` | Assigned R&D University | Reference to `University` |
| `industrySponsor` | `ObjectId` | Assigned CSR Sponsor | Reference to `Industry` |
| `status` | `String` | Challenge lifecycle state | `Open for Matching`, `Team Assigned`, `In R&D / Prototyping`, `Field Testing`, `Deployed & Resolved` |
| `requiredExpertise` | `Array[String]` | Generated R&D expertise tags | e.g. `["Hydraulics", "GIS Mapping"]` |
| `supportNeeded` | `Array[String]` | Required CSR support types | e.g. `["Funding / CSR Grant"]` |

---

## 🌐 Complete API Endpoint Specifications

### 1. `POST /api/ai/analyze-complaint`
Extracts category, subcategory, priority, summary, affected groups, and R&D expertise from raw complaint text.

* **Request Payload:**
```json
{
  "title": "Severe waterlogging and pipe leakage near Ward 12 main road",
  "description": "Water accumulation causing traffic congestion and contamination risks for school children.",
  "location": "Ward 12, Kolkata",
  "category": "Water Supply"
}
```

* **Response Payload:**
```json
{
  "success": true,
  "data": {
    "category": "Water Supply",
    "subcategory": "Urban Drainage & Flood Risk",
    "priority": "Urgent",
    "summary": "Reported water supply issue (Urban Drainage & Flood Risk) near Ward 12, Kolkata. Flagged as Urgent priority affecting School Children & Students, Daily Commuters, Local Residents.",
    "affectedGroups": [
      "School Children & Students",
      "Daily Commuters",
      "Local Residents"
    ],
    "requiredExpertise": [
      "Water Resource Management",
      "Hydraulics & Piping",
      "Water Quality Testing"
    ]
  }
}
```

---

### 2. `POST /api/ai/detect-duplicates`
Executes TF-IDF + Jaccard token similarity vector math between a new complaint and existing database complaints.

* **Request Payload:**
```json
{
  "newComplaint": {
    "title": "Severe waterlogging and pipe leakage near Ward 12 main road",
    "description": "Water accumulation on main road near Ward 12...",
    "location": "Ward 12, Kolkata"
  },
  "existingComplaints": [
    {
      "_id": "comp_101",
      "title": "Heavy Waterlogging near Ward 12 Main Road",
      "description": "Severe urban drainage overflow near Ward 12.",
      "location": "Ward 12, Kolkata",
      "upvotes": 12
    }
  ],
  "threshold": 0.70
}
```

* **Response Payload:**
```json
{
  "success": true,
  "data": {
    "isDuplicate": true,
    "similarityScore": 0.78,
    "similarityPercentage": "78%",
    "matchedComplaint": {
      "_id": "comp_101",
      "title": "Heavy Waterlogging near Ward 12 Main Road",
      "description": "Severe urban drainage overflow near Ward 12.",
      "location": "Ward 12, Kolkata",
      "upvotes": 12
    },
    "recommendation": "Duplicate issue detected (78% match). Consolidate into existing Challenge ID: comp_101 and increment upvote count."
  }
}
```

---

### 3. `POST /api/ai/match-entities`
Computes composite match confidence scores to rank Universities and Industry Partners.

* **Request Payload:**
```json
{
  "challenge": {
    "title": "Urban Drainage Overflow & Water Quality Risk",
    "description": "Pipe leakage flooding main arterial road.",
    "category": "Water Supply",
    "requiredExpertise": ["Water Resource Management", "Hydraulics & Piping", "GIS Mapping"]
  },
  "universities": [
    {
      "_id": "uni_001",
      "name": "Jadavpur University",
      "code": "UNI-JU-01",
      "location": "Kolkata, West Bengal",
      "departments": ["Civil Engineering", "Water Resources"],
      "expertise": ["Water Resource Management", "Hydraulics & Piping", "GIS Mapping"],
      "nodalOfficer": { "name": "Dr. A. Banerjee", "email": "rnd@jadavpur.edu" }
    }
  ],
  "industries": [
    {
      "_id": "ind_001",
      "companyName": "Tata Steel CSR Foundation",
      "sector": ["Civil Infrastructure", "Water Supply"],
      "headquarters": "Kolkata, West Bengal",
      "supportOffered": ["Funding / CSR Grant", "Mentorship"],
      "csrBudget": "₹25,00,000",
      "contactPerson": { "name": "S. Mukherjee", "email": "csr@tatasteel.com" }
    }
  ]
}
```

* **Response Payload:**
```json
{
  "success": true,
  "data": {
    "topUniversityMatch": {
      "universityId": "uni_001",
      "name": "Jadavpur University",
      "code": "UNI-JU-01",
      "location": "Kolkata, West Bengal",
      "matchScore": 94,
      "matchedExpertise": [
        "Water Resource Management",
        "Hydraulics & Piping",
        "GIS Mapping"
      ],
      "nodalOfficer": {
        "name": "Dr. A. Banerjee",
        "email": "rnd@jadavpur.edu"
      }
    },
    "topIndustrySponsor": {
      "industryId": "ind_001",
      "companyName": "Tata Steel CSR Foundation",
      "headquarters": "Kolkata, West Bengal",
      "matchScore": 88,
      "supportOffered": [
        "Funding / CSR Grant",
        "Mentorship"
      ],
      "csrBudget": "₹25,00,000",
      "contactPerson": {
        "name": "S. Mukherjee",
        "email": "csr@tatasteel.com"
      }
    }
  }
}
```

---

### 4. `POST /api/ai/route-authority`
Determines government department routing and calculates official SLA resolution deadlines based on priority.

* **Request Payload:**
```json
{
  "challenge": {
    "category": "Water Supply",
    "location": "Ward 12, Kolkata",
    "priority": "Urgent"
  },
  "authorities": [
    {
      "_id": "auth_002",
      "departmentName": "Water Supply & Sewerage Board",
      "jurisdiction": "Ward 1 to 144 Kolkata",
      "authorityType": "Municipal Body",
      "officialInCharge": { "name": "Er. M. Roy", "email": "waterboard@kmcgov.in", "designation": "Chief Hydraulic Engineer" },
      "assignedCategories": ["Water Supply", "Sanitation"]
    }
  ]
}
```

* **Response Payload:**
```json
{
  "success": true,
  "data": {
    "assignedDepartment": "Water Supply & Sewerage Board",
    "jurisdiction": "Ward 1 to 144 Kolkata",
    "authorityType": "Municipal Body",
    "officialInCharge": {
      "name": "Er. M. Roy",
      "email": "waterboard@kmcgov.in",
      "designation": "Chief Hydraulic Engineer"
    },
    "slaTarget": {
      "resolutionTargetHours": 24,
      "deadlineTimestamp": "2026-09-06T10:30:00.000Z",
      "priorityLevel": "Urgent"
    }
  }
}
```

---

### 5. `POST /api/ai/pipeline` (End-to-End Orchestration)
Runs all 4 AI tasks sequentially in one single request.

* **Request Payload:**
```json
{
  "complaint": {
    "title": "Severe waterlogging and pipe leakage near Ward 12 main road",
    "description": "Water accumulation causing traffic congestion and contamination risks.",
    "location": "Ward 12, Kolkata"
  },
  "existingComplaints": [...],
  "universities": [...],
  "industries": [...],
  "authorities": [...]
}
```

* **Response Payload:**
```json
{
  "success": true,
  "timestamp": "2026-09-05T10:30:00.000Z",
  "pipelineFlow": "Citizen Complaint → AI Analysis → Duplicate Detection → Consolidated Challenge → University + Industry + Authority Matching",
  "extractedAnalysis": {
    "category": "Water Supply",
    "subcategory": "Urban Drainage & Flood Risk",
    "priority": "Urgent",
    "summary": "Reported water supply issue (Urban Drainage & Flood Risk) near Ward 12, Kolkata.",
    "affectedGroups": ["School Children & Students", "Daily Commuters", "Local Residents"],
    "requiredExpertise": ["Water Resource Management", "Hydraulics & Piping", "Water Quality Testing"]
  },
  "duplicateDetection": {
    "isDuplicate": true,
    "similarityScore": 0.78,
    "similarityPercentage": "78%",
    "matchedComplaint": { "_id": "comp_101", "title": "Heavy Waterlogging near Ward 12 Main Road", "upvotes": 12 },
    "recommendation": "Duplicate issue detected (78% match). Consolidate into existing Challenge ID: comp_101 and increment upvote count."
  },
  "consolidatedChallenge": {
    "title": "Heavy Waterlogging near Ward 12 Main Road",
    "description": "Severe urban drainage overflow near Ward 12.",
    "location": "Ward 12, Kolkata",
    "category": "Water Supply",
    "subcategory": "Urban Drainage & Flood Risk",
    "priority": "Urgent",
    "summary": "Reported water supply issue near Ward 12, Kolkata.",
    "affectedGroups": ["School Children & Students", "Daily Commuters", "Local Residents"],
    "requiredExpertise": ["Water Resource Management", "Hydraulics & Piping"],
    "isConsolidatedDuplicate": true,
    "similarityScore": "78%",
    "upvoteCount": 13
  },
  "universityMatch": {
    "universityId": "uni_001",
    "name": "Jadavpur University",
    "code": "UNI-JU-01",
    "location": "Kolkata, West Bengal",
    "matchScore": 94,
    "matchedExpertise": ["Water Resource Management", "Hydraulics & Piping"],
    "nodalOfficer": { "name": "Dr. A. Banerjee", "email": "rnd@jadavpur.edu" }
  },
  "industrySponsor": {
    "industryId": "ind_001",
    "companyName": "Tata Steel CSR Foundation",
    "headquarters": "Kolkata, West Bengal",
    "matchScore": 88,
    "supportOffered": ["Funding / CSR Grant", "Mentorship"],
    "csrBudget": "₹25,00,000",
    "contactPerson": { "name": "S. Mukherjee", "email": "csr@tatasteel.com" }
  },
  "authorityRouting": {
    "assignedDepartment": "Water Supply & Sewerage Board",
    "jurisdiction": "Ward 1 to 144 Kolkata",
    "authorityType": "Municipal Body",
    "officialInCharge": { "name": "Er. M. Roy", "email": "waterboard@kmcgov.in", "designation": "Chief Hydraulic Engineer" },
    "slaTarget": { "resolutionTargetHours": 24, "deadlineTimestamp": "2026-09-06T10:30:00.000Z", "priorityLevel": "Urgent" }
  }
}
```

---

## ⚡ 1-Line Integration in `server.js`

To connect all endpoints to your main application without altering existing database logic, add this line to `server.js`:

```javascript
app.use('/api/ai', require('./ai/aiRoutes'));
```

---

## 🧪 Terminal Verification Command

Run the test script to test all pipeline components:

```bash
node ai/testExamples.js
```
