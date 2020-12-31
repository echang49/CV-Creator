import "../styles/style.css";
import {ReactComponent as Close} from "../assets/close.svg";

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

function Delete({ setPopupShow, mainRef, deleteProfile, setEdited }) {
    function close() {
        setPopupShow([false, false, false]);
        mainRef.current.classList.remove('blur');
    }

    function confirmDelete(profile) {
        let bool = ipcRenderer.sendSync('delete-profile', profile);
        if(bool) {
            setEdited(deleteProfile);
            setPopupShow([false, false, false]);
            mainRef.current.classList.remove('blur');
        }
        else {
            alert('Sorry! We ran into an error and was unable to delete the profile. If you would like to do it manually, please go into where you installed the program -> Client -> Profiles, and then delete your selected profile');
        }
    }

    return(
        <div className="popup" id="delete">
            <div className="flex-column">
                <div className="delete">
                    <Close onClick={() => close()} />
                </div>
                <p>Are you <strong>SURE</strong> that you want to delete {deleteProfile}?</p>
                <div>
                    <button onClick={() => confirmDelete(deleteProfile)} >Yes</button>
                    <button onClick={() => close()} >No</button>
                </div>
            </div>
        </div>
    );
}

export default Delete;