import "../styles/style.css";
import { useRef, useEffect } from 'react';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

function Edit({ setBodyShow, editedProfile, setEdited, setProfile }) {
    const textRef = useRef();
    const profileRef = useRef();

    useEffect(() => {
        let text = ipcRenderer.sendSync('load-cv', editedProfile);
        profileRef.current.value = editedProfile;
        textRef.current.value = text;
    }, [editedProfile]);

    function complete() {
        let newProfile = profileRef.current.value;
        let cv = textRef.current.value;
        let bool = ipcRenderer.sendSync('save-profile', editedProfile, newProfile, cv);
        if(bool === "success") {
            setBodyShow([false, true, false, false]);
            setProfile(newProfile);
            setEdited(ID()); 
        }
        else {
            alert("Unfortunately, you happened to reach an unexpected error and we're not sure what to do.");
        }
    }

    function cancel() {
        setBodyShow([false, true, false, false]);
        setProfile(editedProfile);
    }

    function ID() {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    return (
        <div className="edit">
            <p className="title">Edit Cover Letter</p>
            <div className="flex-row">
                <p>Profile Name: </p>
                <input type="text" ref={profileRef} ></input>
            </div>
            <textarea ref={textRef} ></textarea>
            <div className="flex-row">
                <button className="mr-20" onClick={() => complete()} >Save</button>
                <button onClick={() => cancel()} >Cancel</button>
            </div>
        </div>
    );
}

export default Edit;