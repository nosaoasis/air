import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios"

import Header from "./Header.jsx";
import CallMenu from "./components/call-menu/CallMenu.js";
import CallList from "./components/call-list/CallList.js";
import CallFooter from "./components/call-footer/CallFooter.js";
import { callList } from "./callData.js";
import { contacts } from "./contacts.js";
import {
  formatCallLog,
  syncCallLogContacts,
  generateCallLogs,
  filterWRTMenuTitle,
  archiveAllCallsUtil
  
} from "./util.js";

const App = () => {
  const [activeCallMenu, setActiveCallMenu] = useState("Inbox");
  const [isArchived, setIsArchived] = useState(false);
  const [initialCallData, setInitialCallData] = useState([]);
  const [renderedCalls, setRenderedCalls] = useState([]);
  const [archiveAllCalls, setArchiveAllCalls] = useState(false);
  const [singleCallArchive, setSingleCallArchive] = useState(false)

  // const cleanedCallLog = formatCallLog(callList);
  // const addContactToCallLog = syncCallLogContacts(cleanedCallLog, contacts);
  // const callLogs = generateCallLogs(10, 10);
  // console.log("lllll", callLogs)
  // const newcleanedCallLog = formatCallLog(callLogs);
  // console.log("kndlnklndksklvkmkmlkmmlml",newcleanedCallLog);
  // const newaddContactToCallLog = syncCallLogContacts(
  //   newcleanedCallLog,
  //   contacts
  // );
  // console.log("active call menu value is", activeCallMenu);

  // initial render
  useEffect(() => {
    axios.get("https://aircall-backend.onrender.com/activities").then((res) => {
      const callData = res.data
      const filteredCallLog = filterWRTMenuTitle(callData, activeCallMenu, isArchived)
    setInitialCallData(callData)
    setRenderedCalls(filteredCallLog);
    }).catch(err => console.log("an error occurred", err))
  }, [])


  // archive all calls
  useEffect(() => {
    const setCallArchiving = archiveAllCallsUtil(renderedCalls, archiveAllCalls);
    setInitialCallData(setCallArchiving);
    setRenderedCalls(setCallArchiving);
  }, [archiveAllCalls])


  // for change in call menu
  useEffect(() => {
    const filteredCallLog = filterWRTMenuTitle(initialCallData, activeCallMenu, isArchived)
    setRenderedCalls(filteredCallLog)
  }, [activeCallMenu])

  const handleSingleCallArchive = (id) => {
    console.log("id value is", id)
    // Create a new array with the updated call objects
    const updatedCalls = renderedCalls.map(call => {
      if (call.id === id) {
          return { ...call, is_archived: true };
      }
      return call;
  });

  console.log("jd-----------------", updatedCalls);
    const filteredCallLog = filterWRTMenuTitle(filterCallOut, activeCallMenu, isArchived)
    setInitialCallData(filterCallOut)
    setRenderedCalls(filteredCallLog);
  }


  // for setting a single call archive
  // useEffect(() => {
  //   const
  // }, [singleCallArchive])

  // useEffect(() => {
  //   const cleanedCallLog = formatCallLog(callList);
  //   const addContactToCallLog = syncCallLogContacts(cleanedCallLog, contacts);
  //   console.log("daaaaata", addContactToCallLog);

  //   if (archiveAllCalls) {
  //     const allCalls = acchiveAllCalls(addContactToCallLog, archiveAllCalls);
  //     setRenderedCalls(allCalls);
  //     return;
  //   }

  //   const filterCallLog = filterWRTMenuTitle(
  //     addContactToCallLog,
  //     activeCallMenu,
  //     isArchived
  //   );
  //   setRenderedCalls(filterCallLog);
  // }, [activeCallMenu]);

  const setActiveCallMenuState = (menu) => {
    setActiveCallMenu(menu);
  };

  return (
    <div className="container">
      <Header />
      <CallMenu
        setActiveCallMenu={setActiveCallMenuState}
        isArchived={isArchived}
        setIsArchived={setIsArchived}
        setArchiveAllCalls={setArchiveAllCalls}
        // setInitialCallData={setInitialCallData}
        // setRenderedCalls={setRenderedCalls}
        // renderedCalls={renderedCalls}
        archiveAllCalls={archiveAllCalls}
      />
      {/* <div className="container-view">Some activities should be here</div> */}
      <div className="container-view">
        <CallList callLog={renderedCalls} handleSingleCallArchive={handleSingleCallArchive} />
        {/* <CallList callLog={addContactToCallLog} /> */}
        {/* <CallList callLog={newaddContactToCallLog} /> */}
      </div>
      <CallFooter renderedCalls={renderedCalls} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
