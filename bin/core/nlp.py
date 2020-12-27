import sys
import spacy
from spacy import displacy
from spacy.matcher import Matcher

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
]

def matching(text):
    matchedArray = []
    text = text.lower()
    for i in qualityArray:
        if (i.lower() in text):
            matchedArray.append(i.lower())
    return matchedArray    

def spacey(array):
    nlp = spacy.load("en_core_web_sm")
    finalArray = []

    for i in array:
        doc = nlp(i)
        if(len(doc) == 1):
            finalArray.append([i, doc[0].pos_])
        else:
            finalArray.append([i, doc[-1].pos_])

    return finalArray

    # doc = nlp('Efficiency')
    # displacy.serve(doc)

#print(f"This is the text stuff {sys.argv[1]}")
matches = matching(sys.argv[1])
results = spacey(matches)
print(results)
sys.stdout.flush()