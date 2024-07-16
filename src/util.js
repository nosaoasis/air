import moment from "moment";

export const formatCallLog = (calls) => {
  calls = calls.sort((a, b) => parseInt(b.timeStamp) - parseInt(a.timeStamp));

  return calls.map((call) => ({
    ...call,
    timeStamp: new Date(call.timeStamp * 1000).toLocaleString(),
  }));
};

export const syncCallLogContacts = (callLog, contacts) => {
  const contactsLookup = contacts.reduce((acc, contact) => {
    acc[contact.number] = contact.name;
    return acc;
  }, {});

  callLog.forEach((call) => {
    if (contactsLookup[call.number]) {
      call.number = contactsLookup[call.number];
    }
  });

  return callLog;
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomTimestamp(baseTimestamp) {
  const hours = getRandomInt(0, 23);
  const minutes = getRandomInt(0, 59);
  const seconds = getRandomInt(0, 59);
  const randomTime = new Date(baseTimestamp);
  randomTime.setHours(hours, minutes, seconds, 0);
  return Math.floor(randomTime.getTime() / 1000);
}

export const generateCallLogs = (days, itemsPerDay) => {
  const callLogs = [];
  const baseNumber = "+33 6 45 13 ";

  for (let day = 0; day < days; day++) {
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() - day); // Go back 'day' days from today
    baseDate.setHours(0, 0, 0, 0); // Set to start of the day

    for (let item = 0; item < itemsPerDay; item++) {
      const callLog = {
        number: baseNumber + getRandomInt(10, 99) + " " + getRandomInt(10, 99),
        type: ["outgoing", "incoming", "missed"][getRandomInt(0, 2)],
        timeStamp: generateRandomTimestamp(baseDate),
        isArchived: getRandomInt(10, 99) % 2 === 0 ? true : false,
      };
      callLogs.push(callLog);
    }
  }

  return callLogs;
};

export const formatTime = (dateString, am = true) => {
  const date = new Date(dateString);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const formattedHours = hours < 10 ? "0" + hours : hours;

  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  // const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
  const time = am ? `${formattedHours}:${formattedMinutes} ${ampm}` :`${formattedHours}:${formattedMinutes}`

  return time
  // return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

// export const groupAndMergeCalls = (callLog) => {
//   const groupedCalls = {};

//   // Group calls by date
//   callLog.forEach((call) => {
//     const date = moment.unix(call.created_at).format("YYYY-MM-DD");
//     if (!groupedCalls[date]) {
//       groupedCalls[date] = [];
//     }
//     groupedCalls[date].push(call);
//   });

//   // Merge consecutive calls within each date group
//   callLog.forEach((date) => {
//     const mergedCalls = [];
//     let prevCall = null;

//     groupedCalls[date].forEach((call) => {
//       if (
//         prevCall &&
//         prevCall.from === call.from &&
//         prevCall.direction === call.direction
//       ) {
//         prevCall.count += 1;
//       } else {
//         if (prevCall) mergedCalls.push(prevCall);
//         prevCall = { ...call, count: 1 };
//       }
//     });

//     if (prevCall) mergedCalls.push(prevCall);
//     groupedCalls[date] = mergedCalls;
//   });

//   return groupedCalls;
// };

// export const groupCallsByDate = (callLog) => {
//   const groupedCalls = {};

//   callLog.forEach((call) => {
//     const date = moment.unix(call.timeStamp).format("MMMM DD, YYYY");
//     if (!groupedCalls[date]) {
//       groupedCalls[date] = [];
//     }
//     groupedCalls[date].push(call);
//   });

//   return groupedCalls;
// };

export const filterWRTMenuTitle = (callLog, callMenuTitle, archive = false) => {
  console.log("rendered call value is", callLog);
  console.log("the callMenuTitle valuee is", callMenuTitle);
  console.log("the archive valuee is", archive);
  if (archive) return callLog.filter((call) => call.is_archived);
  console.log("7777");

  if (callMenuTitle === "All calls") return callLog;
  console.log("99999");

  callMenuTitle = callMenuTitle === "Inbox" ? "inbound" : "";

  console.log("55555");
  const filteredCallLog = callLog.filter(
    (call) => call.direction === callMenuTitle
  );
  console.log("filtered call log value is", filteredCallLog);
  return filteredCallLog;
};

export const archiveAllCallsUtil = (callList, archiveAllCalls) => {
  return callList.map((call) => {
    return {
      ...call,
      is_archived: archiveAllCalls,
    };
  });
};
