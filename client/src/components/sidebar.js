import "../styles/style.css";
import {ReactComponent as Add} from "../assets/add.svg";
import {ReactComponent as Edit} from "../assets/edit.svg";
import {ReactComponent as Delete} from "../assets/cancel.svg";
import { useState, useEffect, useRef } from 'react';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

function Sidebar({setPopupShow, mainRef, setProfile, setBodyShow, setDeleteProfile, deleted}) {
    const [profiles, setProfiles] = useState([])

    useEffect(() => {
        let array = ipcRenderer.sendSync('load-profiles');
        setProfiles(array);
    }, []);

    const isInitialDeleteMount = useRef(true);
    useEffect(() => {
        if (isInitialDeleteMount.current) {
            isInitialDeleteMount.current = false;
        } else {
            let array = ipcRenderer.sendSync('load-profiles');
            setProfiles(array);
        }
    }, [deleted]);
    
    function addItem() {
        setPopupShow([true, false, false]);
        mainRef.current.classList.add('blur');
    }

    function editItem(profile) {
        alert('time to edit ' + profile);
    }

    function deleteItem(profile) {
        setPopupShow([false, true, false]);
        mainRef.current.classList.add('blur');
        setDeleteProfile(profile);
    }

    function displayProfile(profile) {
        setBodyShow([false, true, false, false])
        setProfile(profile)
    }

    return (
        <div className="sidebar">
            <div className="container">
                <div className="container-child">
                    <div className="sidebar-header">
                        <p className="title">CV Creator</p>
                        <Add className="icon" onClick={() => addItem()} />
                    </div>
                    <hr />
                    <div className="sidebar-body">
                        {
                            profiles.map((data) => 
                                <div className="list">
                                    <p className="bold" onClick={() => displayProfile(data)} >{data}</p>
                                    <div className="icons">
                                        <Edit className="mr-20 icon" onClick={() => editItem(data)} />
                                        <Delete className="icon" onClick={() => deleteItem(data)} />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                
                <p className="sidebar-footer">Made by <a className="bold" href="https://echang.dev/" target="_blank">Edward Chang</a>, <a className="bold" href="https://vmaken.dev/" target="_blank">Vimal Makenthirarasa</a>, and <a className="bold" href="https://github.com/chriswan12" target="_blank">Chris Wan</a>.</p>
            </div>
        </div>
    );
}

export default Sidebar;