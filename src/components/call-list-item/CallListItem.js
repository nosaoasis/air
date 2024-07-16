import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faArrowDown,
  faArrowUp,
  faCircle,
  faClock,
  faBoxArchive,
} from "@fortawesome/free-solid-svg-icons";
import "./call_item.css";
import { formatTime } from "../../util";

const CallListItem = (props) => {
  const { call,handleSingleCallArchive } = props;

  const [showModal, setShowModal] = useState(false);
  // console.log("a single call data value is", call);
  return (
    <>
      <div className="singleCallItem">
        <div className="singleCall" onClick={() => setShowModal(!showModal)}>
          <div className="callIcon">
            <FontAwesomeIcon icon={faPhone} />{" "}
            {call.direction === "inbound" ? (
              <span>
                <FontAwesomeIcon icon={faArrowDown} />
              </span>
            ) : (
              <span>
                <FontAwesomeIcon icon={faArrowUp} />
              </span>
            )}
          </div>
          <div className="callData">
            <p className="callIdentity">
              {call.from} {call.count > 1 ? <span>{call.count}</span> : ""}
            </p>
            <p className="callIdentityDesc">tried to call on Xavier</p>
          </div>
          <div className="timeStamp">{formatTime(call.created_at)}</div>
        </div>
        {/* {showModal && (
          <> */}
            <hr />
            <div className="callModal">
              {/* {call.call_type === "answered" ? (
            <span style={{ color: "green" }}>
              <FontAwesomeIcon icon={faCircle} />{" "}
            </span>
          ) : (
            <span style={{ color: "red" }}>
              <FontAwesomeIcon icon={faCircle} />
            </span>
          )} */}
              <div>
                {call.call_type === "answered" ? (
                  <span style={{ color: "green", fontSize: "0.7rem" }}>
                    <FontAwesomeIcon icon={faClock} />{" "}
                    {formatTime(call.duration, false)}{" "}
                  </span>
                ) : (
                  <span style={{ color: "red", fontSize: "0.7rem" }}>
                    <FontAwesomeIcon icon={faClock} />
                  </span>
                )}
              </div>
              <div>
                <button onClick={() => handleSingleCallArchive(call.id)}>
                  <FontAwesomeIcon icon={faBoxArchive} /> <span>Archive</span>
                </button>
              </div>
            </div>
          {/* </>
        )} */}
      </div>
    </>
  );
};

export default CallListItem;
