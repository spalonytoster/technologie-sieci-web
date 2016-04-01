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
  return function fibWithCache(arg) {
    if (arg < cache.length) {
      console.log(cache[arg]);
      return cache[arg];
    }
    else console.log(cache.push(fibWithCache(arg-1) + fibWithCache(arg-2)));
  };
};

var fibonacci = memo([0, 1], function (recur, n) {
    return recur(n - 1) + recur(n - 2);
});

console.log(fib(5));
console.log(" === ");
console.log(fibonacci(5));
