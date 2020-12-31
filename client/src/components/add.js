import "../styles/style.css";
import { ReactComponent as Close } from "../assets/close.svg";
import fs from 'fs';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
const ipcMain = electron.ipcMain;

function Add({ setPopupShow, mainRef }) {
    function close() {
        setPopupShow([false, false, false]);
        mainRef.current.classList.remove('blur');
    }

    async function next() {
        ipcRenderer.sendSync('add-profile');
    }

    return (
        <div className="popup" id="add">
            <div className="flex-column">
                <div className="delete">
                    <Close onClick={() => close()} />
                </div>
                <p className="title">Create New Profile</p>
                <div className="flex-row">
                    <label>Name: </label>
                    <input type="text" id="profileName" />

                </div>
                <div className="flex-row" style={{ flexGrow: 1 }}>
                    <label>Upload Cover Letter: </label>
                    <input type="file" id="file" />
                </div>
                <div className="button">
                    <button onClick={() => next()} >Next</button>
                </div>
            </div>
        </div>

    );
}

ipcMain.on('add-profile', (event) => {
    var profileName = document.getElementById("profileName").value;
    var destinationDir = `../../profiles/${profileName}` // file path for new profile folder

    // check if folder with same profile name already exists. If it does not exist, create folder in ./profiles 
    if (!fs.existsSync(destinationDir)) {
        alert("making new directory: ", destinationDir);
        fs.mkdir(destinationDir);

        var filePath = document.getElementById("file").files[0].path; // get path of selected cover letter file
        var fileName = filePath.replace(/^.*[\\\/]/, ''); // strip rest of path to get only file name
        alert('file path is: ' + filePath);
        alert('file name is: ' + fileName);

        // copy selected file into created folder
        fs.copyFile(fileName, "copied_file.txt", (err) => {
            if (err) {
                console.log("Error: ", err);
            }
            else {
                // // Get the current filenames 
                // // after the function 
                // console.log("\nFile Contents of copied_file:",
                //     fs.readFileSync("copied_file.txt", "utf8"));
            }
        });

    } else {
        alert("Profile already exists!");
    }

    // event.returnValue = null;
});

export default Add;