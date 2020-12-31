import Sidebar from "./components/sidebar.js"; 
import Default from "./components/default.js";
import Posting from "./components/posting.js";
import Add from "./components/add.js";
import Delete from "./components/delete.js";
import {ReactComponent as Help} from "./assets/help.svg";

import { useState, createRef } from 'react';

function App() {
  //only one of these can be true at a time
  //default, posting, edit, finished
  const [bodyShow, setBodyShow] = useState([true, false, false, false]);
  //add, delete, help
  const [popupShow, setPopupShow] = useState([false, false, false]);

  const [profile, setProfile] = useState();
  const [deleteProfile, setDeleteProfile] = useState();

  const [edited, setEdited] = useState();

  const mainRef = createRef();

  function help() {
    alert('HELP!!')
  }

  return (
    <div>
      <div className="main" ref={mainRef}>
        <Sidebar setPopupShow={setPopupShow} mainRef={mainRef} setProfile={setProfile} setBodyShow={setBodyShow} setDeleteProfile={setDeleteProfile} edited={edited} />
        <div className="body">
          {
            bodyShow[0] ?
              <div className="body-default">
                <Default />
              </div>
            :
              <div />
          }
          {
            bodyShow[1] ?
              <div className="body-posting">
                <Posting profile={profile} />
              </div>
            :
              <div />
          }
        </div>
        <div className="help">
          <Help onClick={() => help()} />
        </div>
      </div>
      {
        popupShow[0] ?
          <Add setPopupShow={setPopupShow} mainRef={mainRef} setEdited={setEdited} />
        :
          <div />
      }
      {
        popupShow[1] ?
          <Delete setPopupShow={setPopupShow} mainRef={mainRef} deleteProfile={deleteProfile} setEdited={setEdited} />
        :
          <div />
      }
    </div>
  );
}

export default App;
