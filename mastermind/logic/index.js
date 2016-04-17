/* jshint node: true, esversion: 6 */

var _ = require('underscore');

var Z = [1, 1, 2, 1, 2];
var R = [3, 2, 2, 3, 3];

var countOccurences = (array, limit) => {
  return _.countBy(array, (num) => {
    return num;
  });
};

var zCount = countOccurences(Z);
var rCount = countOccurences(R);

console.log(zCount);
console.log(rCount);
