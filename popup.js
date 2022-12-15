document.addEventListener('DOMContentLoaded', () => {
    navigator.serviceWorker.register = 'background.js'

    const body = document.querySelector('body');
    let test = document.createElement('div');
    test.innerHTML = 'kajshdjkh';
    body.appendChild(test);

    navigator.serviceWorker.addEventListener('message', function(event) {
        // Check that the message is from the service worker
        if (event.source === navigator.serviceWorker) {
          // Access the value of the 'finalUrl' variable from the message
          var finalUrl = event.data;
          // Create a new div element with the 'finalUrl' variable as its inner HTML
          var div = document.createElement('div');
          div.innerHTML = finalUrl;
          // Add the new div to the body of the HTML document
          document.body.appendChild(div);
        }
      });
});
