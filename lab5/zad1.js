/*jshint browser: true, esversion: 6 */

domReady(function () {
  var headers = document.getElementsByClassName('hd');
  console.log("I've found " + headers.length + " headers");
  console.log(headers);
  var clickAction = function clickAction(event) {
    var body = event.srcElement.nextElementSibling;
    if (!body.attributes.hidden) {
      body.style.display = "none";
      body.attributes.hidden = true;
    }
    else {
      body.style.display = "block";
      body.attributes.hidden = false;
    }
  };
  for (var i = 0; i < headers.length; i++) {
    console.log("hello");
    addEvent(headers[i], "click", clickAction);
  }
  var contents;
});
