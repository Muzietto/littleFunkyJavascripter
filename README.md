Little Funky Javascripter
=========================

This is an implementation of the operations described in the Little Schemer. It uses only
crisp clear Javascript lists; no arrays whatsoever in the way. Everything is a function.

Why is all this relevant? Because it's ALL FUNCTIONAL.

Please note that e.g. the Little Javascripter of Douglas Crockford is NOT fully functional, for example:

	function cons(car, cdr) { return [car, cdr];} <-- This gives back a JS array

whereas in this case (read later about the companion project) we have:

	function cons(car, cdr) { return function(op) { return op(car, cdr); }; }

which freezes car(*) and cdr(**) inside a closure,
waiting for some op-erator to come and do something using them as arguments for its own execution.

The catch of using only functions is that JS is not optimized for recurring on closures(***).
That's what makes all this an insightful albeit fruitless exercise.

A complete test suite using YUI is enclosed. Whilst debugging, the method <cons>.c shows a pretty print of the current list.

Companion project - GEIESLISTS
------------------------------
The engine behind all this is contained in the companion repository: https://github.com/Muzietto/geieslists


DEBITS AND CREDITS
------------------
I know this Javascript code is just a bunch of global stuff, but it's not meant to be used in any other way that a study aid.

I am in debt of course with Daniel P. Friedman, Matthias Felleisen and Duane Bibby 
(the last one for all those cute elephants...)


Any feedback is welcome.

(*) itself a number, a string or a function
(**) itself certainly a function
(***) see http://spencertipping.com/js-instabench/ - please compare:
  - allocating small structures -> 1M (int, int) pairs as array literals
  - allocating small structures -> 1M (int, int) pairs as binary CPS closures
  - accessing small structures -> 1M (int, int) pairs as array literals
  - accessing small structures -> 1M (int, int) pairs as binary CPS closures