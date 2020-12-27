import fs from 'fs';
import scrape from './scraper.js';
import { spawn } from 'child_process';
import createSentence from './linguigstic.js';

async function main(url, profile) {
    let text = await scrape(url)
    //console.log(text);
    
    const pythonProcess = spawn('python',["./nlp.py", text]);
    pythonProcess.stdout.on('data', (data) => {
        let newData = data.toString();
        newData = newData.replace(/],/gi, "]~").replace(']]',']').replace('[[','[').replace(/, /gi, ":").trim(); 
        newData = newData.split("~ ");
        for(let i in newData) {
            newData[i] = newData[i].replace('[','').replace(']','').replace(/\'/gi,'');
            let temp = newData[i].split(":");
            newData[i] = [temp[0], temp[1]];
        }
        let sentences = createSentence(newData);
        //console.log(sentences);
        let cv = fs.readFileSync('../../profiles/'.concat(profile).concat('/text.txt'), {encoding: 'utf8', flag: 'r'});

        if(sentences[0] != 'I excel in . '){
            cv = cv.replace('[VERB]', sentences[0]);
        }
        else {
            cv = cv.replace('[VERB]', '');
        }
        if(sentences[1] != 'I am good at . '){
            cv = cv.replace('[NOUN]', sentences[1]);
        }
        else {
            cv = cv.replace('[NOUN]', '');
        }
        if(sentences[2] != 'Lastly, I am also  . '){
            cv = cv.replace('[ADJECTIVE]', sentences[2]);
        }
        else {
            cv = cv.replace('[ADJECTIVE]', '');
        }

        return cv;
    });
}

//main('url of job posting', 'name of profile');
main('https://ca.indeed.com/viewjob?cmp=Montreal-Art-Therapy-Centre&t=Digital+Marketing+Intern&jk=4311cf8d8429cd3d&q=internship&vjs=3', 'test');