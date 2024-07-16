import React from "react";
import "./call_list.css";
import moment from "moment";

import CallListItem from "../call-list-item/CallListItem";
import { groupAndMergeCalls, groupCallsByDate  } from "../../util";

const CallList = (props) => {
  const { callLog, handleSingleCallArchive } = props;

   
  // const groupedCalls = groupAndMergeCalls(callLog);
  
  const callListItem = callLog.map((call, index) => (
      <li key={index}>
        <CallListItem call={call} handleSingleCallArchive={handleSingleCallArchive} />
      </li>
    ));
    
    /*
  //   const groupedCalls = groupAndMergeCalls(callLog);*/
  // const callListItem = callLog.map((call) => {
  //   return (
  //     <div key={call}>
  //       <h3>{moment(call.created_at).format("MMMM, DD YYYY")}</h3>
  //       <ul>
          
  //             <CallListItem call={call} />
            
  //       </ul>
  //     </div>
  //   );
  // }); 
  
  
    // const groupedCalls = groupCallsByDate (callLog);
    // const callListItem = callLog.map(call => (
    //   <div key={call} className="dateGroup">
    //     <h3 className="dateHeader">{call}</h3>
    //     <ul>
          
    //           <CallListItem call={call} />
            
    //     </ul>
    //   </div>
    // ))

  return (
    <>
      <div className="callList">
        <ul>{callListItem}</ul>
      </div>
    </>
  );
};

export default CallList;
