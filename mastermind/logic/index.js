/* jshint node: true, esversion: 6 */

var _ = require('underscore');

var Z = [2, 1, 2, 3, 1];
var K = [2, 2, 4, 1, 3];

var countOccurences = (array, limit) => {
  var toRet = _.countBy(array, (num) => {
    return num;
  });
  return toRet;
};

var zCount = countOccurences(Z);
var kCount = countOccurences(K);

console.log(zCount);
console.log(kCount);
