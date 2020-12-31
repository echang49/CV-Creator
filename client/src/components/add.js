import "../styles/style.css";
import {ReactComponent as Close} from "../assets/close.svg";

function Add({ setPopupShow, mainRef }) {
    function close() {
        setPopupShow([false, false, false]);
        mainRef.current.classList.remove('blur');
    }

    function next() {

    }

    return(
        <div className="popup" id="add">
            <div className="flex-column">
                <div className="delete">
                    <Close onClick={() => close()} />
                </div>
                <p className="title">Create New Profile</p>
                <div className="flex-row">
                    <label>Name: </label>
                    <input type="text" />
                </div>
                <div className="flex-row" style={{flexGrow : 1}}>
                    <label>Upload Cover Letter: </label>
                    <input type="file" />
                </div>   
                <div className="button">
                    <button onClick={() => next()} >Next</button>
                </div>
            </div>
        </div>

    );
}

export default Add;