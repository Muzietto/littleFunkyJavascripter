/* a few implementations from the Little Schemer
*/
function car(cons) { return cons(function(x,y){return x})}
function cdr(cons) { return cons(function(x,y){return y})}
function atl(arr) { return ArrayToList(arr)}

// list of atoms
function isLat(list) {
	return isEmpty(list) || ((typeof(car(list)) !== "function") && isLat(cdr(list)))
}

// tuples management 
function build(first, second) {return cons(first,cons(second,EMPTY))}
function first(tuple) { 
	if (size(tuple)!==2) throw 'Not a tuple!'
	else return car(tuple)
}
function second(tuple) { 
	if (size(tuple)!==2) throw 'Not a tuple!'
	else return car(cdr(tuple))
}

// chapter 4
// pick(2,List(a,b,c,d)) = b
function pick(n, lat) { // it doesn't have to be a list of atoms!!
	if (isEmpty(lat)) return EMPTY
	else if (n === 1) return car(lat)
	else return pick(n-1, cdr(lat))
}

// chapter 5
// comparison of S-EXPRESSIONS
function equal(s1, s2) { // both s1 and s2 can be either an atom or a list (possibly empty)
	if (isAtom(s1) && isAtom(s2)) return (s1 === s2)
	else if (isAtom(s1) || isAtom(s2)) return false
	else return eqlist(s1, s2)  // surely lists
}

// IMPORTANT comparison of LISTS
function eqlist(s1, s2) { // both s1 and s2 must be a list (possibly empty!!!)
	if (isEmpty(s1) && isEmpty(s2)) return true
	else if (isEmpty(s1) || isEmpty(s2)) return false
	else return (equal(car(s1), car(s2)) && eqlist(cdr(s1),cdr(s2))) // car's are atoms or lists; cdr's are certainly lists
	//  NB - "return (equal(cars) && equal(cdrs))" would work as well
}

// remberStar 'b' (a,(b),b) -> (a,()) that's to say it removes ATOMS and DOES recur inside sublists
function remberStar(a, list) {
	if (isEmpty(list)) return EMPTY;
	else if (isAtom(car(list))) {
		if (equal(a, car(list))) return remberStar(a, cdr(list))
		else return cons(car(list), remberStar(a, cdr(list)))
	}
	else return cons(remberStar(a, car(list)), remberStar(a, cdr(list)))
}

// rember (a,b) ((a,b,(a,b)) -> (a,b)  that's to say it removes only S-list COMPLETELY matched and NO RECURSION inside sublists
function rember(s1, s2) {
	if (isEmpty(s2)) return EMPTY;
	else if (equal(s1, car(s2))) return cdr(s2)  // S-expressions require EQUAL!!!!!
	else return cons(car(s2), rember(s1, cdr(s2)))
}

// chapter 7
function isSet(list) {
	if (isEmpty(list)) return true;
	else return (!isMember(head(list),tail(list)) && isSet(tail(list)));
}

function makeset(list) {
	if (isEmpty(list)) return Nil;
	else if (isMember(head(list), tail(list))) return makeset(tail(list));
	else return cons (head(list),makeset(tail(list)));
}

function isSubset(set1,set2){
	if (isEmpty(set1)) return true;
	else return (isMember(head(set1),set2) && isSubset(tail(set1),set2));
}

/* allows combinations of elements
	by using isSubset */
function equalSet(set1,set2) {
	return (isSubset(set1,set2) && isSubset(set2,set1));
}

function isIntersection(set1, set2){
	if (isEmpty(set1) || isEmpty(set2)) return false;
	else return (isMember(head(set1),set2) || isIntersection(tail(set1),set2));
}

function intersection(set1,set2) {
	if (isEmpty(set1)) return Nil;
	else if (isMember(head(set1),set2)) return cons(head(set1),intersection(tail(set1),set2));
	else return intersection(tail(set1),set2);
}

function union(set1,set2){
	if (isEmpty(set1)) return set2;
	else if (isMember(head(set1),set2)) return union(tail(set1),set2);
	else return cons(head(set1),union(tail(set1),set2));
}

// chapter 8
function multiremberAndCo(a, lat, col) {
	if (isEmpty(lat)) return col(EMPTY, EMPTY);
	else if (equal(car(lat), a)) return multiremberAndCo(
		a, cdr(lat), function(removed, left) {
			return col(removed, cons(car(lat),left));
		}
	);
	else return multiremberAndCo(
		a, cdr(lat), function(removed, left) {
			return col(cons(car(lat),removed), left)
		}
	);
}

function multiinsertLrAndCo(newAtom, oldL, oldR, lat, col) {
	if (isEmpty(lat)) return col(EMPTY,0,0)
	else if (equal(car(lat),oldL)) return multiinsertLrAndCo(
		newAtom, oldL, oldR, cdr(lat), function(result, numL, numR) {
			return col(cons(newAtom,cons(oldL,result)),numL+1,numR);
		}
	);
	else if (equal(car(lat),oldR)) return multiinsertLrAndCo(
		newAtom, oldL, oldR, cdr(lat), function(result, numL, numR) {
			return col(cons(oldR,cons(newAtom,result)),numL,numR+1);
		}
	);
	else return multiinsertLrAndCo(
		newAtom, oldL, oldR, cdr(lat), function(result, numL, numR) {
			return col(cons(car(lat),result), numL, numR)
		}
	);
}

function evensOnly(lat) {
	if (isEmpty(lat)) return EMPTY
	else if (car(lat) % 2 != 0) return evensOnly(cdr(lat))
	else return cons(car(lat),evensOnly(cdr(lat)))
}

function evensOnlyStarAndCo(list, col){
	if (isEmpty(list)) return col(EMPTY, 1, 0);
	else if (isAtom(car(list))) {
		if (car(list) % 2 === 0) {  // even atoms -->
			return evensOnlyStarAndCo(cdr(list), function(ll, product, sum){
				return col(cons(car(list),ll),car(list)*product,sum);
			});
		} else {  // odd atoms
			return evensOnlyStarAndCo(cdr(list), function(ll, product, sum){
				return col(ll,product,car(list)+sum);
			});
		}
	}
	// car(list) is a list
	else return evensOnlyStarAndCo(car(list), function(al, ap, as) {
		return evensOnlyStarAndCo(cdr(list), function(dl,dp,ds) {
			return col(cons(al,dl),ap*dp,as+ds);
		});
	});
}

function evensOnlyStar(list) {
	if (isEmpty(list)) return EMPTY
	else if (isAtom(car(list))) {
		if (car(list) % 2 != 0) return evensOnlyStar(cdr(list))
		else return cons(car(list),evensOnlyStar(cdr(list)))
	}
	else return cons(evensOnlyStar(car(list)),evensOnlyStar(cdr(list)))
}

// chapter 9
/* NB - the following function is the definition of length given at page 167. MAma(List('a','b','c')) = 3
There is a test "TestProtoCombinator" inside lfjTests.js and it works - THIS CRAZY FUNCTION WORKS!!!
...BUT HAVE A LOOK AT THIS STRANGE BEHAVIOR:
- if this function is declared as function MAma(MALE) it fails inside lfjTests.js with error message "w is not a function" at the first application of a cons 
- if is function is declared as var, then everything is fine  */
var MAma = function(MALE) { return MALE(MALE)}  // MALE = make-length in outer loop
	(function(male){return function(list){return isEmpty(list)?0:1+male(male)(cdr(list))}});  // male = make-length in inner loop

/* NB - the following function is the attempt at page 168 to extract 
make-length(make-length) from the innermost loop. This function is shown to generate an infinite loop 
Instead of "lenght" (which is what the book does) I am calling male(male) a "composite", shortened in "comp".
There is a test "TestProtoCombinatorComp" inside lfjTests.js and it fails - THIS FUNCTION WON'T WORK!!!
... BUT HAVE A LOOK AT THIS OTHERWISE STRANGE BEHAVIOR:
- the need to declare it as var (see previous function MAma) still stands
- if the var is declared inside lfjTests.js instead of here, the test fails inside lfjTests.js with correct error message "too much recursion". 
  The failure happens during the DEFINITION of the var, not during its later invocation.
- if the var is declared here, the present file loads without problems, but the test fails inside lfjTests.js with error message "MAmaComp is not a function" */
/* commented out - causes a call stack overflow that blips the debugger of Firebog
var MAmaComp = function(MALE) { return (MALE(MALE))}
	(function(male){return function(comp){ return function(list){return isEmpty(list)?0:1+comp(cdr(list))}}(male(male))});
*/
/* NB - second attempt at the extraction of make-length(make-length) from its outer function - see page 171. MAmaFun(List('a','b','c')) = 3
Instead of "lenght" (which is what the book does) I am calling it an "outer function", shortened in "oFun".
There is a test "TestProtoCombinatorOfun" inside lfjTests.js and it works - THIS CRAZY FUNCTION WORKS!!!  
... BUT AGAIN 
... HAVE A LOOK AT THIS ONCE MORE STRANGE BEHAVIOR:
- if MAmaOfun is declared here, the test in lfjTests.js fails ("MAmaOfun is not a function")
- if MAmaOfun is declared inside the test, everything is fine (see MAmaOfunLocal inside lfjTests.js)
*/
/* commented out - causes a call stack overflow that blips the debugger of Firebog
var MAmaOfun = function(MALE) { return MALE(MALE)}  // MALE = make-length in combinator function
	(function(male){
		return function(oFun) { 
			return function(list){
				return isEmpty(list)?0:1+oFun(cdr(list)); 
			}
		}(function(x){return male(male)(x)})
	});  // male = make-length in argument function
*/
/* ...and here is my version of the Y combinator 
  Once more, it works only if it is declared in the same .js file in which it gets invoked 
    Examples of workers are given hereafter */
/* commented out - causes a call stack overflow that blips the debugger of Firebog
var MyY = function(worker) { return function(MALE) { return MALE(MALE) }
	(function (male) {
		return worker(function(x){return male(male)(x)})
	})
}
*/
/* factorialWorker - THIS IS NOT A TRUE FACTORIAL FUNCTION. 
     It is a function that returns a factorial function once assigned to a Y combinator */
var factorialWorker = function(whateverTheYCombinatorDeemsFitForThePurpose) {
	return function(n) {
		return (n === 0) ? 1 : n * whateverTheYCombinatorDeemsFitForThePurpose(n - 1);
	}
}

/* lengthWorker - THIS IS NOT A TRUE LENGTH FUNCTION. 
     It is a function that returns a length function once assigned to a Y combinator */
var lengthWorker = function(whateverTheYCombinatorDeemsFitForThePurpose) {
	return function(list) {
		return (isEmpty(list) ? EMPTY : 1 + whateverTheYCombinatorDeemsFitForThePurpose(cdr(list)))
	}
} 

/* What does the Y combinator deem fit for the purpose? It chooses a fixed-point of its own argument function bla bla bla
  But there's an interesting little thing - each worker accepts always ONE function by default: 
  try assigning a plain factorial  or length function to te respective worker and you get ...
  ...a factorial or a length function  back!
 Basically, a plain factorial is the fixed-point function of its own worker; in other words: worker(plain) = plain, just as fixed-point(x)=x
  Here are the ingredients. Tests are inside lfjTests.js */
var plainFactorial = function(n) {return (n===0)?1:n*plainFactorial(n-1)}
var plainLength = function(list) {return (isEmpty(list))?EMPTY:1+plainLength(cdr(list))}

// Chapter 10
var new_entry = build
function keys(tuple) { if (size(tuple)!==2) throw 'Not a tuple!'; else return car(tuple);}
function values(tuple) { if (size(tuple)!==2) throw 'Not a tuple!'; else return car(cdr(tuple));}
var extend_table = cons

function lookup_in_entry(name, entry, entry_f){
	function lookup_in_entry_help(name,names,values,entry_f){
		if (isEmpty(names)) return entry_f(name)
		else if (car(names)===name) return car(values)
		else return lookup_in_entry_help(name,cdr(names),cdr(values),entry_f)
	}
	return lookup_in_entry_help(name,first(entry),second(entry),entry_f)
}

function lookup_in_table(name, table, entry_f){
	if (isEmpty(table)) return entry_f(name)
	else return lookup_in_entry(name,car(table),
		function(name){
			return lookup_in_table(name,cdr(table),entry_f)
		})
}
























