import fs from 'fs';
import scrape from './scraper.js';
import createSentence from './linguigstic.js';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

async function main(url, profile) {
    let text = await scrape(url)
    //console.log(text);
    if(text !== "NOT VALID URL"){
        return secondary(text, profile);
    }
    else {
        return "NOT VALID URL";
    }
}

async function secondary(text, profile) {
    const data = ipcRenderer.sendSync('load-python', text);
    let sentences = createSentence(data);
    const cv = ipcRenderer.sendSync('create-cv', sentences, profile);
    return cv;
}

export default {main, secondary}

//main('url of job posting', 'name of profile');
//main('https://nasdaq.wd1.myworkdayjobs.com/en-US/US_External_Career_Site/job/Canada---Toronto-Ontario/XMLNAME-2021-Summer-Internship---Software-Development-Intern_R0007250?source=Indeed', 'Edward\'s CV');
//secondary('L3 Technologies MAS, located in Mirabel (QC), is a subsidiary of L3Harris Technologies, Inc. As Intern, Application Development (temp. 4 months) at L3 MAS you will: As a Intern, Application Development within our Software group, you will collaborate in the development of various software tools intended for various platforms such as the CF-18, CT-114, CC-150, etc. In addition, you will participate in software development initiatives to increase efficiency as part of the Continuous Improvement Program. To achieve this, you will be called upon to: Program desktop applications and web interfaces; Participate in software development cycle (design, development, maintenance, etc.); Collaborate with customers, partners or members of the project team for the implementation of solutions. Write technical and functional specifications. Have experience in software development using Object Oriented languages; Knowledge of relational databases (i.e. Oracle, SQL Server, etc.); Knowledge of one or more of the following technologies: .NET Framework, .NET Core, git, JIRA and Azure DevOps; Knowledge of software development cycle. Required Skills Analytical, synthesis; Ease of working in a team and interpersonal skills; Passionate, dynamic, motivated, agile in action, and a desire to learn; Good adaptation skills; and Good listening and speaking skills. Operational requirements : Must be eligible for registration to the Controlled Goods Program; Must be eligible to obtaining and maintaining the government of Canada’s “Reliability” status and Level 2 (Secret) security clearance; Location not accessible via public transportation, car required. L3Harris Technologies is an agile global aerospace and defense technology innovator, delivering end-to-end solutions that meet customers’ mission-critical needs. The company provides advanced defense and commercial technologies across air, land, sea, space and cyber domains. L3Harris has approximately $17 billion in annual revenue, 50,000 employees and customers in more than 130 countries. L3Harris.com L3Harris is dedicated to recruiting and developing diverse, high-performing talent who are passionate about what they do. Our employees are unified in a shared dedication to our customers’ mission and quest for professional growth. L3Harris provides an inclusive, engaging environment designed to empower employees and promote work-life success. Fundamental to our culture is an unwavering focus on values, dedication to our communities, and commitment to excellence in everything we do. At L3 MAS you will: Contribute to the continuous improvement of the company and be recognized for your impact; Enjoy a flexible work schedule allowing you to conciliate work-life balance; Participate in gathering sports and social activities organized by the staff for the staff; Have access to exclusive on-site services such as massotherapy, cafeteria with outdoor patio, fitness and language classes, seasonal tire change, annual vaccination clinic, charging stations for electric vehicles and more; Benefit from a Comprehensive Employee Benefits Package, including a customizable group insurance plan that fits your needs and lifestyle, and a Group RRSP with contribution match-up. L3 Harris Technologies is proud to be an Equal Opportunity Employer. L3Harris is committed to treating all employees and applicants for employment with respect and dignity and maintaining a workplace that is free from unlawful discrimination. All applicants will be considered for employment without regard to race, color, religion, age, national origin, ancestry, ethnicity, gender (including pregnancy, childbirth, breastfeeding or other related medical conditions), gender identity, gender expression, sexual orientation, marital status, veteran status, disability, genetic information, citizenship status, characteristic or membership in any other group protected by federal, provincial or local laws. L3Harris maintains a drug-free workplace and performs pre-employment substance abuse testing and background checks, where permitted by law. We thank all applicants for their interest but only those selected for an interview will be contacted.' ,'test');