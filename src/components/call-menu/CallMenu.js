import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArchiveCall from "../archive-call/ArchiveCalls";
import {
  faPhone,
  faSlidersH,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";

import "./call_menu.css";

const CallMenu = (props) => {
  const {
    setActiveCallMenu,
    isArchived,
    setIsArchived,
    // setInitialCallData,
    // setRenderedCalls,
    setArchiveAllCalls,
    // renderedCalls,
    archiveAllCalls
  } = props;
  const [activeIndex, setActiveIndex] = useState(0);

  const menuList = [
    {
      name: "Inbox",
    },
    {
      name: "All calls",
    },
    {
      name: "Archive",
    },
  ];

  const handleMenuClick = (menuName, index) => {
    console.log("direction", menuName);
    setActiveIndex(index);
    setIsArchived(menuName === "Archive" ? true : false);
    setActiveCallMenu(menuName);
  };

  const handleArchiveAllCalls = () => {
    console.log("hhhh");
    // setActiveCallMenu("Archive");
    // setIsArchived(true)
  };

  return (
    <>
      <div className="menuList">
        <div className="phoneActivity">
          <span className="phoneIcon">
            <FontAwesomeIcon icon={faPhone} />
          </span>{" "}
          <span className="activityTitle">Activity</span>
        </div>
        <div className="menuItem">
          {menuList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleMenuClick(item.name, index)}
              style={{
                borderBottom: activeIndex === index ? "2px solid red" : "none",
                fontWeight: activeIndex === index ? "bold" : "normal",
              }}
              className="singleMenuItem"
            >
              <p key={index}>{item.name}</p>
            </div>
          ))}
        </div>
        <div className="shuffleIcon">
          <FontAwesomeIcon icon={faSlidersH} />
        </div>
      </div>
      <ArchiveCall
      // renderedCalls={renderedCalls}
        setActiveCallMenu={setActiveCallMenu}
        // setInitialCallData={setInitialCallData}
        // setRenderedCalls={setRenderedCalls}
        setArchiveAllCalls={setArchiveAllCalls}
        archiveAllCalls={archiveAllCalls}
      />
    </>
  );
};

export default CallMenu;

// {/* <div className="archiveCalls">
//   <button onClick={() => handleArchiveAllCalls()}>
//   {/* <button> */}
//     {" "}
//     <FontAwesomeIcon icon={faBriefcase} /> <span>Archive all calls</span>
//   </button>
// </div> */}
