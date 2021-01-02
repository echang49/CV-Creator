import "../styles/style.css";
import { ReactComponent as Close } from "../assets/close.svg";
import { useRef, useState } from "react";

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

function Add({ setPopupShow, mainRef, setEdited }) {
    const profileRef = useRef();
    const fileRef = useRef();
    const textRef = useRef();

    const [bool, setBool] = useState(true);
    const[text, setText] = useState();
    const[profileName, setProfileName] = useState();

    function close() {
        setPopupShow([false, false, false]);
        mainRef.current.classList.remove('blur');
    }

    async function next() {
        let profile = profileRef.current.value;
        let file = fileRef.current.files[0].path;
        setProfileName(profile);
        let cv = ipcRenderer.sendSync('add-profile', profile, file);
        if(cv[0] === "PROFILE EXISTS!") {
            alert("A profile already exists under this name. Please create a new profile with a unique name.");
        }
        else if (cv[0] === "NOT A VALID FILE!") {
            alert("Unfortunately, this file type is not supported. We currently only support .docx, .pdf, and .txt files.");
        }
        else if (cv[0] === "UNEXPECTED ERROR") {
            alert("Unfortunately, you happened to reach an unexpected error and we're not sure what to do.");
        }
        else if (cv[0] === "success") {
            setEdited(profile);
            setBool(false);
            setText(cv[1]);
        }
        else {
            alert("Unfortunately, you happened to reach an unexpected error and we're not sure what to do.");
        }
    }

    async function create() {
        let input = textRef.current.value;
        let cv = ipcRenderer.sendSync('edit-profile', profileName, input);
        if(cv === "success") {
            close();
        }
        else {
            alert("Unfortunately, you happened to reach an unexpected error and we're not sure what to do.");
        }
    }

    return (
        <span>    
            {
                bool ?
                    <div className="popup" id="add">
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
                    </div>
                :
                    <div className="popup" id="add" style={{width: '1500px', height: '750px'}}>
                        <div className="flex-column">
                            <div className="delete">
                                <Close onClick={() => close()} />
                            </div>
                            <p className="subtitle">The following is what the cover letter looks like in our system.<br/>Make sure to re-format it properly so that employers see a well formatted document. Add [NOUN], [VERB], and [ADJECTIVE] to where you think it would fit best. An example would be "I like to work. [NOUN][VERB][ADJECTIVE]"</p>
                            <textarea ref={textRef} >{text}</textarea>
                            <div className="button">
                                <button onClick={() => create()} >Create</button>
                            </div>
                        </div>
                    </div>
            }
        </span>
    );
}

export default Add;