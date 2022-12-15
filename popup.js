document.addEventListener('DOMContentLoaded', () => {
    
    
    
    function reset() {
        // let test1 = document.createElement('div');
        // test1.innerHTML = "test1";
        // body.appendChild(test1);
        chrome.runtime.sendMessage({ txt: 'get-url-counter' }, function(response) {
            // on response logic here
            console.log(response);
            //Dom manipulation
            let graphContainer = document.getElementById('gc')
            const prevGraphs = gc.getElementsByClassName('singleGraphContainer')
            console.log(prevGraphs)
            let i = prevGraphs.length-1; 
            while(prevGraphs[0] != undefined) {
                prevGraphs[i].remove();
                prevGraphs[i] = undefined;
                i--;
            }
            
            console.log(prevGraphs)
            let sortable = [];
            for (var url in response) {
                sortable.push([url, response[url]]);
            }
            sortable.sort(function(a, b) {
                return b[1] - a[1];
            });
            console.log(sortable)
            let sum = 0;
            for (const [url, count] of Object.entries(response)) {
                if (url != 'undefined' && url != '') sum += count;

            }
            let j = 0; 
            while (j < sortable.length && j < 5) {
                if (sortable[j][0] != 'undefined' && sortable[j][0] != "") {
                    let singleGraphContainer = document.createElement('div');
                    singleGraphContainer.setAttribute('class', 'singleGraphContainer');
                    graphContainer.appendChild(singleGraphContainer);
    
                    let domainContainer = document.createElement('div');
                    domainContainer.setAttribute('class', 'domainContainer');
                    domainContainer.innerHTML = "<p class='url'>" + sortable[j][0] + "</p>"
                    singleGraphContainer.appendChild(domainContainer)
    
                    let usageContainer = document.createElement('div');
                    usageContainer.setAttribute('class', 'usageContainer');
                    usageContainer.innerHTML = "<div class='usage' style='width:" + Math.floor((sortable[j][1]/sum)*100) + "px'></div>"
                    singleGraphContainer.appendChild(usageContainer)
                }
                j++;
            }
            // for (const [url, count] of Object.entries(response)) {
            //     if (url != undefined && url != ""){
            //         let singleGraphContainer = document.createElement('div');
            //         singleGraphContainer.setAttribute('class', 'singleGraphContainer');
            //         graphContainer.appendChild(singleGraphContainer);
    
            //         let domainContainer = document.createElement('div');
            //         domainContainer.setAttribute('class', 'domainContainer');
            //         domainContainer.innerHTML = "<p class='url'>" + url + "</p>"
            //         singleGraphContainer.appendChild(domainContainer)
    
            //         let usageContainer = document.createElement('div');
            //         usageContainer.setAttribute('class', 'usageContainer');
            //         usageContainer.innerHTML = "<div class='usage' style='width:" + Math.floor((count/sum)*100) + "px'></div>"
            //         singleGraphContainer.appendChild(usageContainer)
            //     }
            // }
        });
    }
    reset()

    let resetButton = document.getElementById('reset');
    resetButton.addEventListener("click", reset);
});