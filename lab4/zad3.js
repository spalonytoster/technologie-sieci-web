/*jshint globalstrict: true, devel: true, esversion: 6 */
'use strict';

var Template = function (body) {
  this.body = body;
  this.podstaw = function (data) {
    return body.replace(/\{([a-zA-Z0-9]+)\}/g, (match, p1) => {
      if (data.hasOwnProperty(p1)) {
        return data[p1];
      }
      else {
        return match;
      }
    });
  };
};

var szablon =
  '<table border="{border}">' +
  '  <tr><td>{first}</td><td>{last}</td></tr>' +
  '</table>';

var dane = {
  first: "Jan",
  last: "Kowalski",
  pesel: "97042176329"
};

var myTemplate = new Template(szablon);

console.log(myTemplate.podstaw(dane));
