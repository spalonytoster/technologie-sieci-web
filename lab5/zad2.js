/*jshint browser: true, esversion: 6 */

domReady(function () {
  var clickAction = function clickAction(event) {
    var body = event.srcElement.nextElementSibling;
    if (body.attributes.active) {
      body.style.display = "none";
      body.attributes.active = false;
    }
    else {
      body.style.display = "block";
      body.attributes.active = true;
    }
  };

  var mouseoverAction = function clickAction(event) {
    var body = this.nextElementSibling;
    if (body.attributes.hidden) {
      body.style.display = "block";
      body.attributes.hidden = false;
    }
  };

  var mouseoutAction = function clickAction(event) {
    var body = this.nextElementSibling;
    if (!body.attributes.hidden) {
      body.style.display = "none";
      body.attributes.hidden = true;
    }
  };

  var headers = document.getElementsByClassName('hd');

  for (var i = 0; i < headers.length; i++) {
    headers[i].nextElementSibling.style.display = "none";
    headers[i].nextElementSibling.attributes.hidden = true;
    headers[i].nextElementSibling.attributes.active = false;
    addEvent(headers[i], "click", clickAction);
    // addEvent(headers[i], "mouseover", mouseoverAction);
    // addEvent(headers[i], "mouseout", mouseoutAction);
  }
});
