import "../styles/style.css";
import {ReactComponent as SVG} from "../assets/default.svg";

function Default() {
    
    return (
        <div className="default">
            <SVG />
            <p>Currently nothing to show.</p>
            <p>Click on a profile to begin.</p>
        </div>
    );
}

export default Default;