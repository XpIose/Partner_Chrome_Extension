//Should open popup when icon is clicked
// chrome.browserAction.setPopup({
//     popup: "popup.html"
// });

var domainTimes = {}; 
let currUrl = [];
let ticker;
function incrimentTime() {
    if(domainTimes[currUrl[0]] === undefined) domainTimes[currUrl[0]] = 0;
    domainTimes[currUrl[0]] += 1;
    console.log(domainTimes)
    ticker = setInterval(incrimentTime(), 1000);
}
console.log(navigator.serviceWorker)

// chrome.tabs.query({ currentWindow: true, active: true },

// chrome.tabs.onActivated.addListener((activeTab) => {
//     console.log("test")
//     chrome.tabs.get(activeInfo.tabId, (tab) => { 
//         //should clean url here 
//         currUrl[0] = tab.url
//         incrimentTime();
//     });
// });

// var activeTabId;

// chrome.tabs.onActivated.addListener(function(activeInfo) {
//   activeTabId = activeInfo.tabId;
// });

// function getActiveTab(callback) {
//   chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
//     var tab = tabs[0];

//     if (tab) {
//       callback(tab);
//     } else {
//       chrome.tabs.get(activeTabId, function (tab) {
//         if (tab) {
//           callback(tab);
//         } else {
//           console.log('No active tab identified.');
//         }
//       });

//     }
//   });
// }




// TO-DO LIST



//Find out how to check for active tab 

//set Interval function to check website name every X seconds.




navigator.serviceWorker.addEventListener('message', function(event) {
    console.log("entered")
    // Check that the message is from the service worker
    if (event.source === navigator.serviceWorker) {
      // Access the value of the 'finalUrl' variable from the message
      var finalUrl = event.data;
      console.log(finalUrl);
    }
});


//Notes 

// chrome == document 
// chrome.tabs => tabs 
// chrome.tabs.query({ active: true, currentWindow: true })

//Function to get current tab
// async function getCurrentTab() {
//     let queryOptions = { active: true, lastFocusedWindow: true };
//     // `tab` will either be a `tabs.Tab` instance or `undefined`.
//     let [tab] = await chrome.tabs.query(queryOptions);
//     return tab;
//   }

//Tab Properties => https://developer.chrome.com/docs/extensions/reference/tabs/#type-Tab
// important properties => .url, .active
// important methods => .query(queryInfo: Object, callback?: function)



// need to grab message from background
// store curr tab
// chrome.runtime.onMessage.addListener()x
let currentTab;
chrome.runtime.onMessage.addListener((obj, sender, respsonse) => { 
    console.log(obj, sender, respsonse); //response sends a message back where it came from
    currentTab = obj;
    //  const { type, value, newTabId } = obj;
    //  if (type === 'NEW') {

    //      currentTab = newTabId; //store id in gloabal var
    //     //  newTabLoaded();  //   call new function to track time?? 
    //  }
});
console.log("curr tab: ", currentTab);
//
//
//
// in the page being controlled
// if (navigator.serviceWorker) {

//     navigator.serviceWorker.register('background.js');
  
//     navigator.serviceWorker.addEventListener('message', event => {
//       // event is a MessageEvent object
//       console.log(`The service worker sent me a message: ${event.data}`);
//     });
  
//     navigator.serviceWorker.ready.then( registration => {
//       registration.active.postMessage("Hi service worker");
//     });
  
//   }