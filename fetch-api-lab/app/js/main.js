var app = (function() {
  'use strict';

  function logResult(result) {
    console.log(result);
  }

  function logError(error) {
    console.log('Looks like there was a problem: \n', error);
  }


  if (!('fetch' in window)) {
    console.log('Fetch API not found, try including the polyfill');
    return;
  }

  function fetchJSON() {
    // fetch fresh data
    fetch('examples/animals.json')
    .then(validateResponse)
    .then(readResponseAsJSON)
    .then(logResult)
    .catch(logError)

  }

  function validateResponse(response) {

    if (!response.ok) {
      throw(response.statusText);
    } else return response;
  }

  function readResponseAsJSON(response) {

    return response.json();
  }

  function showImage(responseAsBlob) {
    var container = document.getElementById('container');
    var imgElem = document.createElement('img');
    container.appendChild(imgElem);
    var imgUrl = URL.createObjectURL(responseAsBlob);
    imgElem.src = imgUrl;
  }

  function readResponseAsBlob(response) {

    return response.blob();
  }

  function fetchImage() {
    fetch('examples/kitten.jpg')
    .then(validateResponse)
    .then(readResponseAsBlob)
    .then(showImage)
    .catch(logError)
  }

  function showText(responseAsText) {
    var message = document.getElementById('message');
    console.log(responseAsText);
    message.textContent = responseAsText;
  }

  function readResponseAsText(response) {

    console.log(response);
    return response.text();
  }

  function fetchText() {

    fetch('examples/words.txt')
    .then(validateResponse)
    .then(readResponseAsText)
    .then(showText)
    .catch(logError)
  }


  function readHeaderContentLength(response) {
    return response.headers.get('Content-Length') ;
  }

  function headRequest() {

    fetch('examples/words.txt',{
      'method': 'HEAD'
    })
    .then(validateResponse)
    .then(getSize)
    .then(logResult)
    .catch(logError)
  }

  function getSize(response) {
    return response.headers.get('Content-Length') ;
  }

  /* NOTE: Never send unencrypted user credentials in production! */
  function postRequest() {
    var formData = new FormData(document.getElementById('myForm'));
    for (var pair of  formData.entries()){
      console.log(pair[0] + ':' + pair[1]);
    }
    var headers = new Headers();
    var init = {
      method : 'POST',
      mode: 'cors',
      body: formData,
      headers: customHeaders
    }
    fetch('http://localhost:5000/', init)
    .then(validateResponse)
    .then(readResponseAsText)
    .then(logResult)
    .catch(logError)
  }

  var customHeaders = new Headers({
    'Content-Type': 'text/plain',
    'X-Custom': 'hello world',
    'X-Usermd': 'some user metadata'
  });

  return {
    readResponseAsJSON: (readResponseAsJSON),
    readResponseAsBlob: (readResponseAsBlob),
    readResponseAsText: (readResponseAsText),
    validateResponse: (validateResponse),
    fetchJSON: (fetchJSON),
    fetchImage: (fetchImage),
    fetchText: (fetchText),
    headRequest: (headRequest),
    postRequest: (postRequest)
  };

})();
