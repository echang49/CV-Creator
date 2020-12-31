import "../styles/style.css";

import { useState, createRef } from 'react';

function Posting({ profile }) {
    const [showURL, setShowURL] = useState(true);

    const urlRef = createRef();
    const textRef = createRef();

    function submitURL(url) {
        alert(url);
    }

    function submitText(text) {
        alert(text);
    }

    return (
        <div className="posting">
            <p className="title">{ profile }</p>
            <div className="flex-row">
                    <p>Please enter job posting here:</p>
                    <button onClick={() => setShowURL(true)} >URL</button>
                    <button onClick={() => setShowURL(false)} >Copy/Paste</button>
                </div>
            <div className="posting-body">
                
                {
                    showURL ?
                        <div>
                            <label>URL: </label>
                            <input type="text" ref={urlRef} />
                            <button onClick={() => submitURL(urlRef.current.value)} >Submit</button>
                        </div>
                    :
                        <div>
                            <label>Copy/Paste: </label>
                            <input type="text" ref={textRef} />
                            <button onClick={() => submitText(textRef.current.value)} >Submit</button>
                        </div>
                }
            </div>
        </div>
    );
}

export default Posting;