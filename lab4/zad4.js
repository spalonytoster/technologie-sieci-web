/*jshint globalstrict: true, devel: true, esversion: 6 */
'use strict';

var fib = function fib(arg) {
   if (arg <= 0) {
       return 0;
   }
   if (arg === 1) {
       return 1;
   }
   return fib(arg - 1) + fib(arg - 2);
};

var memo = function (cache, fun) {
    let n = fun.arguments;
    return n;
};

//memo.recur = fib;

var fibonacci = function (n) {
  return memo([0, 1], function (recur, n) {
      return recur(n - 1) + recur(n - 2);
  });
};

console.log(fibonacci(5));
