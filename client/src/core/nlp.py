import sys
import os
import spacy
import json
from spacy import displacy
from spacy.matcher import Matcher

with open(os.path.abspath("src\core\qualities.json")) as f:
  qualityArray = json.load(f)

def matching(text):
    matchedArray = []
    text = text.lower()
    for i in qualityArray:
        if (i.lower() in text):
            matchedArray.append(i.lower())
    return matchedArray    

def spacey(array, text):
    nlp = spacy.load("en_core_web_sm")
    finalArray = []
    
    for i in array:
        doc = nlp(i)
        truthity = False
        if(len(doc) == 1):
            finalArray.append([i, doc[0].pos_])
            if(doc[0].pos_ == 'PROPN'):
                truthity = True
        else:
            finalArray.append([i, doc[-1].pos_])
            if(doc[-1].pos_ == 'PROPN'):
                truthity = True

        #IF PROPER NOUN   
        #go through the document and double check what it is
        #words classified as proper nouns are generally 1 word
        if(truthity):
            #1 or more space equals more than 1 word
            if(len(i.split(" ")) > 1):
                finalArray.pop()
                continue
            else:
                textdoc = nlp(text)
                for tok in textdoc:
                    if(tok.lower_ == i.lower()):
                        finalArray[-1][1] = tok.pos_
                        break 

    return finalArray

    # doc = nlp('Efficiency')
    # displacy.serve(doc)

#print(f"This is the text stuff {sys.argv[1]}")
matches = matching(sys.argv[1])
results = spacey(matches, sys.argv[1])
print(results)
sys.stdout.flush()