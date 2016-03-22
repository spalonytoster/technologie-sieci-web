/* jshint browser: true */

domReady(function () {
  var sendRequest, handleResponse, button;

  sendRequest = function () {
    console.log("button clicked - sendRequest");
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      handleResponse(xhr);
    };
    xhr.open("GET", "http://127.0.0.1:3000", true);
    xhr.send();
  };

  handleResponse = function (xhr) {
    console.log("Hello from handleResponse");
    console.dir(xhr);
    var target = document.getElementById("responseOutput");
    target.innerHTML = xhr.responseText;
  };

  button = document.getElementById("button");
  addEvent(button, "click", sendRequest);


});
