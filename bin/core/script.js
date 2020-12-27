import scrape from './scraper.js';
import { spawn } from 'child_process';

async function main() {
    let text = await scrape('https://ca.indeed.com/viewjob?cmp=Montreal-Art-Therapy-Centre&t=Digital+Marketing+Intern&jk=4311cf8d8429cd3d&q=internship&vjs=3')
    //console.log(text);
    
    const pythonProcess = spawn('python',["./nlp.py", text]);
    pythonProcess.stdout.on('data', (data) => {
        // Do something with the data returned from python script
        console.log(data.toString());
        //add the data to the pdf's
        //create case for nouns, proper nouns, verbs, and adjectives
    });
}

main();

// what was returned is "NOT VALID URL" => pop up client message