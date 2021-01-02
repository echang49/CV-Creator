import "../styles/style.css";
import {ReactComponent as Close} from "../assets/close.svg";
import Video from "../assets/help.mp4"

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

function Help({ setPopupShow, mainRef }) {
    function close() {
        setPopupShow([false, false, false]);
        mainRef.current.classList.remove('blur');
    }

    return(
        <div className="popup" id="help">
            <div className="flex-column">
                <div className="delete">
                    <Close onClick={() => close()} />
                </div>
                <video width="1280" height="720" controls>
                    <source src={Video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
}

export default Help;