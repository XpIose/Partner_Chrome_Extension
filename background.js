let finalUrl;
const urlCounter = {};
let ticker;
chrome.tabs.onActivated.addListener((tab) => { //onupdated
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
                i = -1;
                break;
            }
        }
        return cleanedURL
    }
    
    chrome.tabs.get(tab.tabId, (tab1) => { 
        let url = cleanURL(tab1.url);
        if(finalUrl !== url) finalUrl = url;
        console.log(finalUrl)
        // incrimentTime();
    });

    function incrimentTime() {
        if (ticker != undefined) clearInterval(ticker)
        if(urlCounter[finalUrl] === undefined) urlCounter[finalUrl] = 0;
        urlCounter[finalUrl] += 1;
        console.log(urlCounter)
        ticker = setInterval(incrimentTime, 1000);
    }
    incrimentTime()

});
// trev was still here hehehe