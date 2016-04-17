/* jshint node: true, esversion: 6 */
var _ = require('underscore');

exports.getMarks = function getMarks(Z, R) {
  var zCount = _.countBy(Z, (num) => num),
      rCount = _.countBy(R, (num) => num),
      black, white, toRet = {};

      black = _.size(_.filter(_.zip(Z, R), (array) => (array[0] === Number(array[1]))));
      white = _.reduce(_.mapObject(_.pick(zCount, _.keys(rCount)), (val, key) => (val <= rCount[key] ? val : rCount[key])), (memo, num) => memo + num, 0) - black;
      toRet.black = black;
      toRet.white = white;
      return toRet;
};
