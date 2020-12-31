import "../styles/style.css";
import { ReactComponent as Close } from "../assets/close.svg";
import { useRef, useState } from "react";

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

function Add({ setPopupShow, mainRef, setEdited }) {
    const profileRef = useRef();
    const fileRef = useRef();

    const [bool, setBool] = useState(true);

    function close() {
        setPopupShow([false, false, false]);
        mainRef.current.classList.remove('blur');
    }

    async function next() {
        let profile = profileRef.current.value;
        let file = fileRef.current.files[0].path;
        let cv = ipcRenderer.sendSync('add-profile', profile, file);
        if(cv === "PROFILE EXISTS!") {
            alert("A profile already exists under this name. Please create a new profile with a unique name.");
        }
        else if (cv === "NOT A VALID FILE!") {
            alert("Unfortunately, this file type is not supported. We currently only support .docx, .pdf, and .txt files.");
        }
        else if (cv === "UNEXPECTED ERROR") {
            alert("Unfortunately, you happened to reach an unexpected error and we're not sure what to do.");
        }
        else if (cv === "success") {
            setEdited(profile);
            alert('going to next step');
            setBool(false);
        }
        else {
            alert("Unfortunately, you happened to reach an unexpected error and we're not sure what to do.");
        }
    }

    async function create() {

    }

    return (
        <div className="popup" id="add">
            {
                bool ?
                    <div className="flex-column">
                        <div className="delete">
                            <Close onClick={() => close()} />
                        </div>
                        <p className="title">Create New Profile</p>
                        <div className="flex-row">
                            <label>Name: </label>
                            <input type="text" ref={profileRef} />

                        </div>
                        <div className="flex-row" style={{ flexGrow: 1 }}>
                            <label>Upload Cover Letter: </label>
                            <input type="file" ref={fileRef} />
                        </div>
                        <div className="button">
                            <button onClick={() => next()} >Next</button>
                        </div>
                    </div>
                :
                    <div className="flex-column">
                        <div className="delete">
                            <Close onClick={() => close()} />
                        </div>
                        <p className="title">Format this</p>
                        <div className="button">
                            <button onClick={() => create()} >Create</button>
                        </div>
                    </div>
            }
        </div>
    );
}

export default Add;