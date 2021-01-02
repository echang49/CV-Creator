const fs = require('fs');

qualityArray = [
    "leadership", "teamwork", "good communication", "adaptability", "attentive", "Active Listening", "Interpersonal Skills", "Oral Communication", "Strong Verbal", "Strong written", 
    "High GPA", "Written Communication", "Collaboration", "Managing Expectations", "Conflict Management", "Reliability", "Professional", "Analytical Skills", "Problem Solving", "Creativity",
    "Inductive Reasoning", "Deductive Reasoning", "Resilience", "Compliance", "Integrity", "Empathy", "Discernment", "Microsoft Office Suite", "Email", "Word Processing", "Search Engine Research",
    "Social Media", "Flexibility", "Life Skills", "Motivation", "Organization", "Ability to Learn New Skills", "Administrative Skills", "Phone Etiquette", "Customer Service", "Client Relations",
    "Presentation", "Office Equipment", "Bookkeeping Software", "Efficiency", "Multitasking", "Time Management", "Sales", "Goal Setting", "Prioritizing", "Supervision", "Troubleshooting", 
    "Responsibility", "Information Management", "Initiative", "Proactive", "Observant", "Focus", "Enthusiasm", "Negotiation", "Memory", "Imagination", "Forward Thinking", "Strategy", "Open-mindedness",
    "Project Management", "Stress Management", "Problem Sensitivity", "Brainstorming", "Restructuring", "Process Improvement", "Fast Learner", "Quick Thinking", "Attention to Detail", "Team Building",
    "Decision Making", "Mentoring", "Encouraging", "Reaching Consensus", "ambitious", "Engaging", "Public Speaking", "Articulation", "courteous", "Humor", "diligent", "Logical Thinking", 
    "Assessment", "Evaluating", "Consulting", "innovative", "Commitment", "Vision", "practical", "Coordination", "Goal Oriented", "Judgment", "rational", "reliable", "Follow Directions", "team player", 
    "resourceful", "Training", "Emotional Intelligence", "Research Solutions", "Optimization", "Integration", "Accuracy", "Investigation", "Building and Managing Expectations", "loyal", "committed",
    "entrepreneurial spirit", 'collaborative'
];

let file = fs.readFileSync('text.txt', {encoding:'utf8', flag:'r'}).toString().split("\n");

let array = file.concat(qualityArray);

for(let i in array) {
    array[i] = array[i].toLowerCase().trim();
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

let unique = array.filter(onlyUnique);

const jsonContent = JSON.stringify(unique);

fs.writeFileSync("./qualities.json", jsonContent, 'utf8');

console.log(unique);