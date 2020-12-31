const electron = require('electron');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const url = require('url');

const app = electron.app;
const ipcMain = electron.ipcMain;
const session = electron.session;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({width: 800, height: 600, webPreferences: { nodeIntegration: true, enableRemoteModule: true }});
    mainWindow.loadURL('http://localhost:3000');
    // mainWindow.loadURL(url.format({
    //     pathname: path.join(__dirname, '/../build/index.html'),
    //     protocol: 'file:',
    //     slashes: true
    // }));
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





// let uaArray = [
//     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
//     "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
//     "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
//     "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
//     "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"
// ];

// //randomize on start so user agent queue is always different on launch
// uaArray = shuffle(uaArray);

// session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
//   details.requestHeaders['User-Agent'] = uaArray[0];
//   callback({ cancel: false, requestHeaders: details.requestHeaders });
// });

// //Fisher-Yates Shuffle Algorithm to randomize an array
// function shuffle(array) {
//     var currentIndex = array.length,
//       temporaryValue,
//       randomIndex;
  
//     // While there remain elements to shuffle...
//     while (0 !== currentIndex) {
//       // Pick a remaining element...
//       randomIndex = Math.floor(Math.random() * currentIndex);
//       currentIndex -= 1;
  
//       // And swap it with the current element.
//       temporaryValue = array[currentIndex];
//       array[currentIndex] = array[randomIndex];
//       array[randomIndex] = temporaryValue;
//     }
//     return array;
// }