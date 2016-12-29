/*jshint node: true, esversion: 6 */
'use strict';

function fib(arg) {
  if (arg === 1) {
    return 1;
  }
  if (arg <= 0) {
     return 0;
  }
   return fib(arg - 1) + fib(arg - 2);
}

function fibMemoized(arg, cache) {
  if (!cache) {
    cache = [0, 1];
  }
  if (arg < cache.length) {
    // console.log(`fib(${arg}) taken from cache`);
    return cache[arg];
  }
  else {
    let result = fibMemoized(arg-1, cache) + fibMemoized(arg-2, cache);
    cache[arg] = result;
    // console.log(`inserted fib(${arg}) into cache`);
    return result;
  }
}

let arg = Number.parseInt(process.argv[2], 10);
console.log(arg);
console.log(fibMemoized(arg));
console.log(fib(arg));
