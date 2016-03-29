/*jshint browser: true, esversion: 6 */

domReady(function () {
  var clickAction = function clickAction(event) {
    var nextSibling = event.srcElement.nextElementSibling;
    if (nextSibling.attributes.active) {
      nextSibling.style.display = "none";
      nextSibling.attributes.active = false;
      this.style["background-color"] = "blue";
    }
    else {
      nextSibling.style.display = "block";
      nextSibling.attributes.active = true;
      this.style["background-color"] = "rgba(23, 39, 247, 0.63)";
    }
  };

  var mouseoverAction = function clickAction(event) {
    var nextSibling = this.nextElementSibling;
    if (nextSibling.attributes.hidden) {
      if (!nextSibling.attributes.active) {
        nextSibling.style.display = "block";
        nextSibling.attributes.hidden = false;
      }
    }
  };

  var mouseoutAction = function clickAction(event) {
    var nextSibling = this.nextElementSibling;
    if (!nextSibling.attributes.hidden) {
      if (!nextSibling.attributes.active) {
        nextSibling.style.display = "none";
        nextSibling.attributes.hidden = true;
      }
    }
  };

  var headers = document.getElementsByClassName('hd');

  for (var i = 0; i < headers.length; i++) {
    headers[i].nextElementSibling.style.display = "none";
    headers[i].nextElementSibling.attributes.hidden = true;
    headers[i].nextElementSibling.attributes.active = false;
    headers[i].addEventListener("click", clickAction, false);
    headers[i].addEventListener("mouseover", mouseoverAction, false);
    headers[i].addEventListener("mouseout", mouseoutAction, false);
    //addEvent(headers[i], "click", clickAction);
    // addEvent(headers[i], "mouseover", mouseoverAction);
    // addEvent(headers[i], "mouseout", mouseoutAction);
  }
});
