import React from "react";
import "./archive_call.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faSlidersH,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import { archiveAllCalls } from "../../util";

const ArchiveCall = (props) => {
  const {
    setActiveCallMenu,
    // renderedCalls,
    // setInitialCallData,
    // setRenderedCalls,
    setArchiveAllCalls,
    archiveAllCalls
  } = props;


  const handleArchiveAllCalls = () => {
    console.log("hhhh");
    setActiveCallMenu("Archive");
    // setIsArchived(true)
    setArchiveAllCalls(!archiveAllCalls);
    // const archiveAll = archiveAllCalls(renderedCalls, archiveAllCalls);
    // setInitialCallData(archiveAll);
    // setRenderedCalls(archiveAll);
  };

  return (
    <>
      <div className="archiveCalls">
        <button onClick={() => handleArchiveAllCalls()}>
          {/* <button> */} <FontAwesomeIcon icon={faBriefcase} />{" "}
          <span>Archive all calls</span>
        </button>
      </div>
    </>
  );
};

export default ArchiveCall;
