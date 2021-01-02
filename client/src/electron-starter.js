const electron = require('electron');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { PythonShell } =  require('python-shell');
var Docxtemplater = require('docxtemplater');
const PDFExtract = require('pdf.js-extract').PDFExtract;
const PizZip = require('pizzip');

const app = electron.app;
const ipcMain = electron.ipcMain;
const session = electron.session;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({minWidth: 1920, minHeight: 1080, icon: path.join(__dirname, './assets/logo.png'), webPreferences: { nodeIntegration: true, enableRemoteModule: true }});
    mainWindow.maximize();
    // mainWindow.loadURL('http://localhost:3000');
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    }));
    mainWindow.webContents.openDevTools();
    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
});

ipcMain.on('load-profiles', (event) => {
    fs.readdir(path.join(__dirname, '/../profiles'), (err, files) => {
        event.returnValue = files;
    }); 
})

ipcMain.on('delete-profile', (event, profile) => {
    let dirPath = path.join(__dirname, '/../profiles/'.concat(profile));
    let files;
    try { files = fs.readdirSync(dirPath); }
    catch(e) { event.returnValue = false; }
    if (files.length > 0)
      for (let i = 0; i < files.length; i++) {
        let filePath = dirPath + '/' + files[i];
        if (fs.statSync(filePath).isFile())
          fs.unlinkSync(filePath);
        else
          rmDir(filePath);
    }
    fs.rmdirSync(dirPath);
    event.returnValue = true;
})

ipcMain.on('load-url', (event, url) => {
    axios.get(url).then((res) => {
        event.returnValue = res.data;
    });
})

ipcMain.on('load-python', (event, text) => {
    let options = {
        mode: 'text',
        pythonPath : path.join(__dirname, '/core/env/Scripts/python'),
        scriptPath : path.join(__dirname, '/core/'),
        pythonOptions: ['-u'], // get print results in real-time
        args: [text]
    };
    PythonShell.run('nlp.py', options, (err, results) => {
        if (err)  throw err;
        let newData = results[0];
        newData = newData.replace(/],/gi, "]~").replace(']]',']').replace('[[','[').replace(/, /gi, ":").trim(); 
        newData = newData.split("~ ");
        for(let i in newData) {
            newData[i] = newData[i].replace('[','').replace(']','').replace(/\'/gi,'');
            let temp = newData[i].split(":");
            newData[i] = [temp[0], temp[1]];
        }
        event.returnValue = newData;
    });
})

ipcMain.on('create-cv', (event, sentences, profile) => {
    //let cv = fs.readFileSync('../../profiles/'.concat(profile).concat('/text.txt'), {encoding: 'utf8', flag: 'r'});
    let cv = fs.readFileSync(path.join(__dirname, '/../profiles/').concat(profile).concat('/text.txt'), {encoding: 'utf8', flag: 'r'});
    if(sentences[0] !== 'I excel in . '){
        cv = cv.replace('[VERB]', sentences[0]);
    }
    else {
        cv = cv.replace('[VERB]', '');
    }
    if(sentences[1] !== 'I am good at . '){
        cv = cv.replace('[NOUN]', sentences[1]);
    }
    else {
        cv = cv.replace('[NOUN]', '');
    }
    if(sentences[2] !== 'I am also . '){
        cv = cv.replace('[ADJECTIVE]', sentences[2]);
    }
    else {
        cv = cv.replace('[ADJECTIVE]', '');
    }
    event.returnValue = cv;
});

ipcMain.on('add-profile', async (event, profile, file) => {
    function readPDF(pathing, dirPath) {
        const pdfExtract = new PDFExtract();
        const options = {}; /* see below */
        pdfExtract.extract(pathing, options, (err, data) => {
            if (err) return console.log(err);
            //console.log(data.pages[0].content);
            let text = '';
            for(let page in data.pages) {
                let pageText = '';
                for(let content in data.pages[page].content) {
                    pageText = pageText.concat(data.pages[page].content[content].str);
                }
                text = text.concat(pageText);
            }
            text = text.replace(/ {1,}/g," ");
            return createProfile(text, dirPath);
        });
    }

    function readDOCX(pathing, dirPath) {
        let content = fs.readFileSync(pathing, 'binary');
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip);
        let text = doc.getFullText();
        return createProfile(text, dirPath);
    }

    function readTXT(pathing, dirPath) {
        fs.readFile(pathing, 'utf-8', (err, data) => { 
            if (err) throw err; 
            //console.log(data);
            return createProfile(data, dirPath);
        })
    }

    function createProfile(text, dirPath) {
        //console.log(text);      
        fs.mkdir(dirPath, (err) => { 
             if (err) { 
                 console.error(err); 
            } 
        });
        fs.writeFile(dirPath.concat('/text.txt'), text, function(err) {
            if(err) {
                return console.log(err);
            }
            event.returnValue = ["success", text];
        });
    }

    var destinationDir = path.join(__dirname, `../profiles/${profile}`) // file path for new profile folder
    // check if folder with same profile name already exists. If it does not exist, create folder in ./profiles 
    if (!fs.existsSync(destinationDir)) {
        //get file extension
        let fileArray = file.split('.');
        let fileExtension = fileArray[fileArray.length - 1].toLowerCase();
        if(fileExtension === "pdf" || fileExtension === "docx" || fileExtension === "txt") {
            switch (fileExtension) {
                case "pdf":
                    readPDF(file, destinationDir);
                    break;
                case "docx":
                    readDOCX(file, destinationDir);
                    break;
                case "txt":
                    readTXT(file, destinationDir)
                    break;
                default:
                    event.returnValue = ["UNEXPECTED ERROR"];
            }
        }
        else {
            event.returnValue = ["NOT A VALID FILE!"];
        }
    } else {
        event.returnValue = ["PROFILE EXISTS!"];
    }
});

ipcMain.on('edit-profile', async (event, profile, text) => {
    let destinationDir = path.join(__dirname, `../profiles/${profile}`);
    fs.writeFile(destinationDir.concat('/text.txt'), text, function(err) {
        if(err) {
            event.returnValue = "failure";
        }
        event.returnValue = "success";
    });
});

ipcMain.on('load-cv', async (event, profile) => {
    let destinationDir = path.join(__dirname, `../profiles/${profile}`);
    const data = fs.readFileSync(destinationDir.concat('/text.txt'), {encoding:'utf8', flag:'r'});
    event.returnValue = data;
});

ipcMain.on('save-profile', async (event, oldProfile, newProfile, text) => {
    let destinationDir = path.join(__dirname, `../profiles/${oldProfile}`);
    let newDir = path.join(__dirname, `../profiles/${newProfile}`);
    fs.writeFileSync(destinationDir.concat('/text.txt'), text);
    fs.rename(destinationDir, newDir, function(err) {
        if (err) {
            event.returnValue = "failure";
        } else {
            event.returnValue = "success";
        }
    }); 
    event.returnValue = 'success';
});