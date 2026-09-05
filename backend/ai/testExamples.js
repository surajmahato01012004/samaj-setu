/**
 * SamajSetu AI Engine - Runnable Test Demonstration Script
 * 
 * Run this script using:
 * node ai/testExamples.js
 * 
 * Tests all 4 Tasks & Full Core Pipeline:
 * Citizen Complaint → AI Analysis → Duplicate Detection → Challenge Consolidation → University + Industry + Authority Matching
 */

const {
  analyzeComplaint,
  detectDuplicates,
  matchUniversitiesAndIndustries,
  routeAuthority,
  processPipeline
} = require('./aiEngine');

// -----------------------------------------------------------------------------
// SAMPLE DATABASE RECORDS (Simulating MongoDB Collections)
// -----------------------------------------------------------------------------

const sampleExistingComplaints = [
  {
    _id: 'comp_101',
    title: 'Heavy Waterlogging near Ward 12 Main Road',
    description: 'Severe urban drainage overflow causing waterlogging and road blockages during heavy rainfall near Ward 12.',
    location: 'Ward 12, Kolkata',
    category: 'Water Supply',
    upvotes: 12
  },
  {
    _id: 'comp_102',
    title: 'Streetlight dark zone near Station Road',
    description: 'Multiple streetlights not working causing safety issues for evening commuters.',
    location: 'Station Road',
    category: 'Security',
    upvotes: 4
  }
];

const sampleUniversities = [
  {
    _id: 'uni_001',
    name: 'Jadavpur University',
    code: 'UNI-JU-01',
    location: 'Kolkata, West Bengal',
    departments: ['Civil Engineering', 'Computer Science & Engineering', 'Water Resources'],
    expertise: ['Water Resource Management', 'Hydraulics & Piping', 'GIS Mapping', 'Urban Infrastructure'],
    researchAreas: ['Smart Drainage Networks', 'Urban Flood Risk Mitigation'],
    nodalOfficer: { name: 'Dr. A. Banerjee', email: 'rnd@jadavpur.edu', phone: '+91 9830012345' }
  },
  {
    _id: 'uni_002',
    name: 'IIT Kharagpur',
    code: 'UNI-IITKGP-02',
    location: 'Kharagpur, West Bengal',
    departments: ['Environmental Science', 'Electrical Engineering'],
    expertise: ['IoT Sensors & Smart Grid', 'Waste Management & Recycling', 'Water Quality Testing'],
    researchAreas: ['IoT Pollution Sensors', 'Clean Environment Tech'],
    nodalOfficer: { name: 'Prof. R. Sengupta', email: 'research@iitkgp.ac.in', phone: '+91 9434056789' }
  }
];

const sampleIndustries = [
  {
    _id: 'ind_001',
    companyName: 'Tata Steel CSR Foundation',
    registrationNo: 'IND-CSR-8812',
    sector: ['Civil Infrastructure', 'Water Supply', 'Clean Tech'],
    headquarters: 'Kolkata, West Bengal',
    supportOffered: ['Funding / CSR Grant', 'Mentorship'],
    csrBudget: '₹25,00,000',
    contactPerson: { name: 'S. Mukherjee', email: 'csr@tatasteel.com', phone: '+91 9831122334' }
  },
  {
    _id: 'ind_002',
    companyName: 'Wipro Environmental Solutions',
    registrationNo: 'IND-TECH-4410',
    sector: ['Technology', 'Sanitation', 'Waste Management'],
    headquarters: 'Bengaluru, Karnataka',
    supportOffered: ['Technology Stack', 'Prototyping Lab'],
    csrBudget: '₹15,00,000',
    contactPerson: { name: 'P. Nair', email: 'impact@wipro.com', phone: '+91 9900011223' }
  }
];

const sampleAuthorities = [
  {
    _id: 'auth_001',
    departmentName: 'Public Works Department (PWD)',
    jurisdiction: 'Kolkata Metropolitan Region',
    authorityType: 'State Govt Department',
    officialInCharge: { name: 'Er. K. Chakraborty', email: 'pwd.kolkata@wb.gov.in', designation: 'Superintending Engineer' },
    assignedCategories: ['Infrastructure', 'Public Transport']
  },
  {
    _id: 'auth_002',
    departmentName: 'Water Supply & Sewerage Board',
    jurisdiction: 'Ward 1 to 144 Kolkata',
    authorityType: 'Municipal Body',
    officialInCharge: { name: 'Er. M. Roy', email: 'waterboard@kmcgov.in', designation: 'Chief Hydraulic Engineer' },
    assignedCategories: ['Water Supply', 'Sanitation', 'Environment']
  }
];

// -----------------------------------------------------------------------------
// TEST CASE 1: NEW INCOMING CITIZEN COMPLAINT (DUPLICATE ISSUE)
// -----------------------------------------------------------------------------

console.log('=================================================================');
console.log('🚀 TEST CASE 1: DUPLICATE COMPLAINT PIPELINE DEMONSTRATION');
console.log('=================================================================\n');

const incomingDuplicateComplaint = {
  title: 'Severe waterlogging and pipe leakage near Ward 12 main road',
  description: 'Water accumulation on main road near Ward 12 causing traffic congestion and water contamination risks for residents and school children.',
  location: 'Ward 12, Kolkata',
  reportedBy: 'Concerned Citizen'
};

console.log('📥 1. INCOMING CITIZEN COMPLAINT:');
console.dir(incomingDuplicateComplaint, { depth: null });

const pipelineResult1 = processPipeline(
  incomingDuplicateComplaint,
  sampleExistingComplaints,
  sampleUniversities,
  sampleIndustries,
  sampleAuthorities
);

console.log('\n⚡ 2. AI PIPELINE RESULT:');
console.dir(pipelineResult1, { depth: null });

// -----------------------------------------------------------------------------
// TEST CASE 2: NEW UNIQUE COMPLAINT
// -----------------------------------------------------------------------------

console.log('\n=================================================================');
console.log('🚀 TEST CASE 2: UNIQUE COMPLAINT PIPELINE DEMONSTRATION');
console.log('=================================================================\n');

const incomingUniqueComplaint = {
  title: 'Hazardous sparking transformer wire near School Market',
  description: 'Uncovered high-voltage transformer cable emitting sparks near local primary school posing severe safety emergency.',
  location: 'School Market, Ward 4',
  category: 'Electricity'
};

console.log('📥 1. INCOMING CITIZEN COMPLAINT:');
console.dir(incomingUniqueComplaint, { depth: null });

const pipelineResult2 = processPipeline(
  incomingUniqueComplaint,
  sampleExistingComplaints,
  sampleUniversities,
  sampleIndustries,
  sampleAuthorities
);

console.log('\n⚡ 2. AI PIPELINE RESULT:');
console.dir(pipelineResult2, { depth: null });

console.log('\n✅ All SamajSetu AI Engine tests executed cleanly!');
