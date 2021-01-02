import Sidebar from "./components/sidebar.js"; 
import Default from "./components/default.js";
import Posting from "./components/posting.js";
import Add from "./components/add.js";
import Delete from "./components/delete.js";
import Finished from "./components/finished.js";
import Edit from './components/edit.js';
import HelpComp from './components/help.js';
import {ReactComponent as Help} from "./assets/help.svg";
import {ReactComponent as Help2} from "./assets/help-2.svg";

import { useState, createRef } from 'react';

function App() {
  //only one of these can be true at a time
  //default, posting, edit, finished
  const [bodyShow, setBodyShow] = useState([true, false, false, false]);
  //add, delete, help
  const [popupShow, setPopupShow] = useState([false, false, false]);

  const [profile, setProfile] = useState();
  const [deleteProfile, setDeleteProfile] = useState();
  const [posting, setPosting] = useState();
  const [edited, setEdited] = useState();
  const [editedProfile, setEditedProfile] = useState();

  const mainRef = createRef();

  function help() {
    mainRef.current.classList.add('blur');
    setPopupShow([false, false, true]);
  }

  return (
    <div>
      <div className="main" ref={mainRef}>
        <Sidebar setPopupShow={setPopupShow} mainRef={mainRef} setProfile={setProfile} setBodyShow={setBodyShow} setDeleteProfile={setDeleteProfile} edited={edited} setEditedProfile={setEditedProfile} />
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
                <Posting profile={profile} setPosting={setPosting} setBodyShow={setBodyShow} />
              </div>
            :
              <div />
          }
          {
            bodyShow[2] ?
              <div className="body-finished">
                <Edit setBodyShow={setBodyShow} editedProfile={editedProfile} setEdited={setEdited} />
              </div>
            :
              <div />
          }
          {
            bodyShow[3] ?
              <div className="body-finished">
                <Finished posting={posting} setBodyShow={setBodyShow} />
              </div>
            :
              <div />
          }
        </div>
        <div className="help">
          {
            bodyShow[1] ?
              <Help2 onClick={() => help()} />
            :
              <Help onClick={() => help()} />
          }
          
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
      {
        popupShow[2] ?
          <HelpComp setPopupShow={setPopupShow} mainRef={mainRef} />
        :
          <div />
      }
    </div>
  );
}

export default App;
