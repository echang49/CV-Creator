import "../styles/style.css";
import {ReactComponent as Close} from "../assets/close.svg";

function Delete({ setPopupShow, mainRef }) {
    function close() {
        setPopupShow([false, false, false]);
        mainRef.current.classList.remove('blur');
    }


    return(
        <div className="popup">
            <div className="flex-column">
                <div className="delete">
                    <Close onClick={() => close()} />
                </div>
            </div>
        </div>

    );
}

export default Delete;