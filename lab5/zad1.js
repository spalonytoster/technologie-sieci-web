/* jshint globalstrict: true, devel: true, esversion: 6, jquery: true */
"use strict";

var countDOMDepth = function () {
  let count = 0;
  let element = $("document");
  while (element.hasChildNodes) {
    element = element.first();
    count++;
  }
  return count;
};

$("document").ready(function() {
    alert(countDOMDepth());
});
