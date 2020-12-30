import "../styles/style.css";
import {ReactComponent as Close} from "../assets/close.svg";

function Delete({ setPopupShow, mainRef, deleteProfile }) {
    function close() {
        setPopupShow([false, false, false]);
        mainRef.current.classList.remove('blur');
    }

    function confirmDelete(profile) {

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