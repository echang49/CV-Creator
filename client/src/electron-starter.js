const electron = require('electron');
const app = electron.app;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const fs = require('fs');

const path = require('path');
const url = require('url');

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

