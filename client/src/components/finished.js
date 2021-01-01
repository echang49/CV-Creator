import "../styles/style.css";

function Finished({ posting, setBodyShow }) {

    function research() {
        setBodyShow([false, true, false, false]);
    }

    return (
        <div className="finished">
            <p className="title">Updated Cover Letter</p>
            <textarea value={posting} readOnly={true}></textarea>
            <button onClick={() => research()} >Search Again</button>
        </div>
    );
}

export default Finished;