/* jshint esversion: 6, node: true */
"use strict";
// var _ = require('underscore');
//
// /* collections */
// var a = _.map([1, 2, 3], el => el + 1);
// console.log(a);
//
// var b = _.map({one: 1, two: 2, three: 3}, (num, key) => num * 3);
// console.log(b);
//
// var c = _.reduce([1, 2, 3], (curr, next) => curr + next);
// console.log(c);
//
// var d = _.find([1, 2, 3], el => el % 2 === 1);
// console.log(d);
//
// var e = _.filter([1, 2, 3], el => el % 2 === 1);
// console.log(e);
//
// var f = _.groupBy([1.3, 2.3, 2.7, 2.9, 3.0, 3.3], num => Math.floor(num));
// console.log(f);
//
// /* arrays */
// var g = _.filter(_.zip([2, 3, 5, 7, 1], [2, 2, 4, 5, 2]), a => a[0] === a[1]);
// console.log(g);

var async = require('async');

var f1 = function (callback) {
  setTimeout(function () {
    console.log("f1");
    callback();
  }, 1700);
};

var f2 = function (callback) {
  setTimeout(function () {
    console.log("f2");
    callback();
  }, 1500);
};

async.series([f1, f2]);
// async.series({
//     one: function(callback){
//         setTimeout(function(){
//           console.log("one");
//             callback(null, 1);
//         }, 200);
//     },
//     two: function(callback){
//         setTimeout(function(){
//           console.log("two");
//             callback(null, 2);
//         }, 100);
//     }
// },
// function(err, results) {
//     // results is now equal to: {one: 1, two: 2}
//     console.log(results);
// });
