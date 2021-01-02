import "../styles/style.css";
import script from "../core/script.js";
import { useState, createRef } from 'react';

function Posting({ profile, setPosting, setBodyShow }) {
    const [showURL, setShowURL] = useState(true);

    const urlRef = createRef();
    const textRef = createRef();

    async function submitURL(url) {
        //check if it's a valid url
        // /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g
        let bool = url.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g);
        if(bool) {
            let cv = await script.main(url, profile);
            if(cv === "NOT VALID URL") {
                alert("Unfortunately, the URL posted is currently not supported. We currently only support indeed, the canada job bank (not CSJ), workday, and linkedin.");
            }
            else if (cv !== "HTTP/HTTPS") {
                setBodyShow([false, false, false, true]);
                setPosting(cv);
            }
        }
        else {
            alert('Please enter a valid URL');
        }
    }

    async function submitText(text) {
        if(text === ''){
            alert('Please enter a job posting first.');
        }
        else {
            let cv = await script.secondary(text, profile);
            setBodyShow([false, false, false, true]);
            setPosting(cv);
        }
    }

    return (
        <div className="posting">
            <div className="box">
                <p className="title">{ profile }</p>
                <hr />
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
        </div>
    );
}

export default Posting;