import "../styles/style.css";
import {ReactComponent as Close} from "../assets/close.svg";

function Add({ setPopupShow, mainRef }) {
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
                <div className="flex-row">
                    <label>
                        Name:
                        <input type="text" name="name" />
                    </label>  
                </div>
                <div className="flex-row">
                    <button type="button class=btn" >
                        
                        Upload Cover Letter:
                    </button>
                </div>   
            </div>
        </div>

    );
}

export default Add;