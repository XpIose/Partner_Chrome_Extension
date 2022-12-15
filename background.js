let test = "test"
let finalUrl = [];
self.addEventListener('message', function(event) {
    if (event.data === 'getFinalUrl') {
      event.source.postMessage(finalUrl);
    }
});
var finalUrlProxy = new Proxy(finalUrl, {
    set: function(target, property, value) {
      // Set the value of the 'finalUrl' variable
      target[property] = value;
      // Use the 'postMessage' function to send the updated value of the 'finalUrl' variable
      self.postMessage(finalUrl);
    }
});

//   addEventListener('message', event => {
//     // event is an ExtendableMessageEvent object
//     console.log(`The client sent me a message: ${event.data}`);
  
//     event.source.postMessage("Hi client");
//   });
  
chrome.tabs.onActivated.addListener((tab) => { //onupdated
    console.log('test')
    console.log(chrome.tabs)
    //if curr tab is a valid URL
    console.log(tab);


    function cleanURL(url) {
        let cleanedURL = "";
        const testString = "moc."
        for (let i = url.length-1; i >=0; i--) {
            let curLetter = url[i];
            let lookingForIdx = 0;
            if (curLetter === testString[lookingForIdx] && url[i-1] === testString[lookingForIdx+1] && url[i-2] === testString[lookingForIdx+2] && url[i-3] === testString[lookingForIdx+3]) {
                let j = i-4;
                while(j >= 0 && url[j] != "." && url[j] != "/") {
                    cleanedURL += url[j]
                    j--;
                }
                let splitString = cleanedURL.split('');
                let reversedArray = splitString.reverse()
                cleanedURL = reversedArray.join('');
                cleanedURL += ".com"
                console.log(cleanedURL)
                i = -1;
                break;
            }
        }
        return cleanedURL
    }
    
    chrome.tabs.get(tab.tabId, (tab1) => { 
        let url = cleanURL(tab1.url);
        console.log(url)
        if(finalUrl[0] !== url) finalUrl[0] = url;
    });

    

    
 
    
    // someEventThatCompletes.oncomplete = event => {
    //     client.postMessage('renderList');
    // }
    
    
    // chrome.tabs.sendMessage(finalUrl);

    //sent message
    // if (finalUrl) {
    //     // stores URL data for tracking curr tab
    //     const queryParamenters = finalUrl;
    //     console.log("tabURL = ", queryParamenters)
    //     // //add url parameters interface
    //     const urlParameters = new URLSearchParams(queryParamenters);
    //     // //send main file tab opened/curr tab info
    //     console.log(urlParameters); //should have methods on it when logged
    //     chrome.tabs.sendMessage(finalUrl[0]);
    //     // chrome.tabs.sendMessage(finalUrl, {
    //     //     type: "NEW",
    //     //     newTabId: urlParameters.get(finalUrl) //may not grab correct url, .get('url')
    //     // });
    // }
});

// 