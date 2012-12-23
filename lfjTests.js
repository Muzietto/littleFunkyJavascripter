/* a few implementations from the Little Schemer
*/

YAHOO.namespace('LFJ.test');

var Assert = YAHOO.util.Assert;

// which chapter?
YAHOO.LFJ.test.oTestIsLat = new YAHOO.tool.TestCase({
	name : "TestIsLat",
	testIsLat : function() {
		Assert.isTrue(isLat(List()))
		Assert.isTrue(isLat(List('a','b')))
		Assert.isFalse(isLat(ArrayToList([['a'],'b'])))
	}
});

// which chapter?
YAHOO.LFJ.test.oTestTupleManagement = new YAHOO.tool.TestCase({
	name : "TestTupleManagement",
	testTupleManagement : function() {
		var myTuple = build('a','b')
		Assert.isTrue(size(myTuple)===2)
		Assert.areEqual('a', first(myTuple))
		Assert.areEqual('b', second(myTuple))
		try{
			first(cons('c',myTuple))
			Assert.isTrue(false,'first should refuse lists of three!')
		}catch(err){
			Assert.areEqual('Not a tuple!',err)
		}
		try{
			second(cons('c',myTuple))
			Assert.isTrue(false,'second should refuse lists of three!')
		}catch(err){
			Assert.areEqual('Not a tuple!',err)
		}
	}
});

// chapter 4
YAHOO.LFJ.test.oTestPick = new YAHOO.tool.TestCase({
	name : "TestPick",
	testPick : function() {
		var myList = ArrayToList([['a'],'b',['c','d']])
		Assert.areEqual('b',pick(2,myList))
		Assert.areEqual('d',pick(2,pick(3,myList)))
		Assert.isTrue(isEmpty(pick(212,myList)))
	}
});

// chapter 5
// compare S_EXPRESSIONS && LISTS
YAHOO.LFJ.test.oTestEqualEqlist = new YAHOO.tool.TestCase({
	name : "TestEqualEqlist",
	testEqualEqlist : function() {
		Assert.isTrue(eqlist(ArrayToList([]),ArrayToList([])))
		Assert.isTrue(eqlist(ArrayToList(['a']),ArrayToList(['a'])))
		Assert.isFalse(eqlist(ArrayToList(['a']),ArrayToList(['b'])))
		Assert.isFalse(eqlist(ArrayToList(['a']),ArrayToList(['b','c'])))
		Assert.isFalse(eqlist(ArrayToList([]),ArrayToList(['a'])))
		Assert.isTrue(eqlist(ArrayToList(['a',['b','c']]),ArrayToList(['a',['b','c']])))
		Assert.isFalse(eqlist(ArrayToList(['a',['b','c'],'d']),ArrayToList(['a',['b','c']])))
	}
});

YAHOO.LFJ.test.oTestRemberStar = new YAHOO.tool.TestCase({
	name : "TestRemberStar",
	testRemberStar : function() {
		// rember* 'a' (a) -> ( )
		Assert.isTrue(eqlist(ArrayToList([]),remberStar('a', ArrayToList(['a']))))
		// rember* 'b' (a,(b),b) -> (a,( ))  that's to say it DOES recur inside sublists
		Assert.isTrue(eqlist(ArrayToList(['a',[]]),remberStar('b', ArrayToList(['a',['b'],'b']))))
	}
});

YAHOO.LFJ.test.oTestRember = new YAHOO.tool.TestCase({
	name : "TestRember",
	testRember : function() {
		// rember 'a' (a) -> ( ) 
		Assert.isTrue(eqlist(ArrayToList([]),rember('a', ArrayToList(['a']))))
		// rember 'b' (a,(b),b) -> (a,( b))  that's to say it DOES NOT recur inside sublists
		Assert.isTrue(eqlist(ArrayToList(['a',['b']]),rember('b', ArrayToList(['a',['b'],'b']))))
		// rember (a,b) ((a,b,(a,b)) -> (a,b)  that's to say it removes only S-list COMPLETELY matched
		Assert.isTrue(eqlist(ArrayToList(['a','b']),rember(ArrayToList(['a','b']), ArrayToList(['a','b',['a','b']]))))
	}
});


// chapter 7
YAHOO.LFJ.test.oTestIsIntersection = new YAHOO.tool.TestCase({
	name : "TestIsIntersection",
	testIsIntersection : function() {
		Assert.isTrue(isIntersection(List('a'),List('a')))
		Assert.isFalse(isIntersection(List(),List()))
		Assert.isFalse(isIntersection(List('a'),List('b')))
		Assert.isFalse(isIntersection(List('a'),List()))
		Assert.isFalse(isIntersection(List(),List('c')))
		Assert.isTrue(isIntersection(List('a','b','c'),List('b','a')))
		Assert.isFalse(isIntersection(List('a','b','c'),List('z','y','z')))
		Assert.isTrue(isIntersection(List('a','b','c'),List('z','c','z')))
	}
});

YAHOO.LFJ.test.oTestIntersection = new YAHOO.tool.TestCase({
	name : "TestIntersection",
	testIntersection : function() {
		Assert.areEqual('[a]',consToString(intersection(List('a'),List('a'))))
		Assert.areEqual('[]',consToString(intersection(List(),List())))
		Assert.areEqual('[]',consToString(intersection(List('a'),List('b'))))
		Assert.areEqual('[]',consToString(intersection(List('a'),List())))
		Assert.areEqual('[]',consToString(intersection(List(),List('a'))))
		Assert.areEqual('[a,b]',consToString(intersection(List('a','b','c'),List('b','a'))))
		Assert.areEqual('[]',consToString(intersection(List('a','b','c'),List('x','y','z'))))
		Assert.areEqual('[c]',consToString(intersection(List('a','b','c'),List('x','c','z'))))
	}
});

YAHOO.LFJ.test.oTestIntersectall = new YAHOO.tool.TestCase({
	name : "TestIntersectall",
	testIntersectall : function() {
		Assert.isTrue(eqlist(EMPTY,intersectall(EMPTY)),'empty set')  // added after reading Seasoned Schemer, page 38
		var input = ArrayToList([['a','b','c'],['c','a','d','e'],['e','f','g','h','a','b']]);		
		Assert.isTrue(eqlist(ArrayToList(['a']),intersectall(input)),'input')
		var input2 = ArrayToList([[6,'pears','and'],[3,'peaches','and',6,'peppers'],[8,'pears','and',6,'plums'],['and',6,'prunes','with','some','apples']]);		
		Assert.isTrue(eqlist(ArrayToList([6,'and']),intersectall(input2)),'input2')
	}
});

YAHOO.LFJ.test.oTestUnion = new YAHOO.tool.TestCase({
	name : "TestUnion",
	testUnion : function() {
		Assert.areEqual('[a]',consToString(union(List('a'),List('a'))))
		Assert.areEqual('[]',consToString(union(List(),List())))
		Assert.areEqual('[a,b]',consToString(union(List('a'),List('b'))))
		Assert.areEqual('[a]',consToString(union(List('a'),List())))
		Assert.areEqual('[a]',consToString(union(List(),List('a'))))
		Assert.areEqual('[c,b,a]',consToString(union(List('a','b','c'),List('b','a'))))
		Assert.areEqual('[a,b,c,x,y,z]',consToString(union(List('a','b','c'),List('x','y','z'))))
		Assert.areEqual('[a,b,x,c,z]',consToString(union(List('a','b','c'),List('x','c','z'))))
	}
});

YAHOO.LFJ.test.oTestIsSet = new YAHOO.tool.TestCase({
	name : "TestIsSet",
	testIsSet : function() {
		Assert.isTrue(isSet(List('a')))
		Assert.isTrue(isSet(List()))
		Assert.isFalse(isSet(List('a','a')))
		Assert.isTrue(isSet(List('a','b','c')))
	}
});

YAHOO.LFJ.test.oTestMakeset = new YAHOO.tool.TestCase({
	name : "TestMakeset",
	testMakeset : function() {
		var madeset = makeset(List('a','b','a'));
		Assert.isTrue(isMember('a',madeset));
		Assert.isTrue(isMember('b',madeset));
		Assert.areEqual(2,size(madeset));
		Assert.areEqual('[b,a]', consToString(madeset));
	}
});

YAHOO.LFJ.test.oTestIsSubset = new YAHOO.tool.TestCase({
	name : "TestIsSubset",
	testIsSubset : function() {
		Assert.isTrue(isSubset(List(), List('a')))
		Assert.isFalse(isSubset(List('a'), List()))
		Assert.isTrue(isSubset(List('a'), List('a')))
		Assert.isTrue(isSubset(List('a'), List('a','b')))
		Assert.isTrue(isSubset(List('b'), List('a','b')))
		Assert.isTrue(isSubset(List('b','a'), List('a','b')))
	}
});

YAHOO.LFJ.test.oTestEqualSet = new YAHOO.tool.TestCase({
	name : "TestEqualSet",
	testEqualSet : function() {
		Assert.isTrue(equalSet(List(), List()))
		Assert.isFalse(equalSet(List(), List('a')))
		Assert.isFalse(equalSet(List('a'),List()))
		Assert.isFalse(equalSet(List('a','b'),List('b')))
		Assert.isTrue(equalSet(List('a'), List('a')))
		Assert.isTrue(equalSet(List('a','b'), List('b','a')))
	}
});

YAHOO.LFJ.test.oTestIsMember = new YAHOO.tool.TestCase({
	name : "TestIsMember",
	testIsMember : function() {
		Assert.isTrue(isMember('a', List('a')))
		Assert.isFalse(isMember(List(), List('a')))
		Assert.isFalse(isMember(List('a'), Nil))
		Assert.isTrue(isMember('a', List('b','a')))
		Assert.isFalse(isMember('a', List('b')))	
	}
});

// chapter 8
YAHOO.LFJ.test.oTestMultiremberAndCo = new YAHOO.tool.TestCase({
	name : "TestMultiremberAndCo",
	testMultiremberAndCo : function() {
		//  make list without, list with and cons their lengths
		var lengthsCollector = function(removed,left) {return cons(size(removed),cons(size(left),EMPTY));}
		var input = List('a',true,123,'b','a')
		var output = multiremberAndCo('a', input, lengthsCollector)
		Assert.isTrue(eqlist(ArrayToList([3,2]), output))
	}
});

YAHOO.LFJ.test.oTestMultiinsertLrAndCo = new YAHOO.tool.TestCase({
	name : "TestMultiinsertLrAndCo",
	testMultiinsertLrAndCo : function() {
		var myCollector = function(insertionResult, numLeftInsertions, numRightInsertions) {
			return pick(numLeftInsertions+numRightInsertions, insertionResult)
		}
		var input = List('chips','and','fish','or','fish','and','chips')
		Assert.areEqual('salty', multiinsertLrAndCo('salty', 'fish', 'chips', input, myCollector))
	}
});

YAHOO.LFJ.test.oTestEvensOnly = new YAHOO.tool.TestCase({
	name : "TestEvensOnly",
	testEvensOnly : function() {
		Assert.isTrue(eqlist(ArrayToList([2,4,6,8,10]), evensOnly(ArrayToList([1,2,3,4,5,6,7,8,9,10]))));
	}
});

YAHOO.LFJ.test.oTestEvensOnlyStar = new YAHOO.tool.TestCase({
	name : "TestEvensOnlyStar",
	testEvensOnlyStar : function() {
		var input = ArrayToList([[1],2,3,[4,[7,8,[]],5,6,[9,[10]]]]);
		var output = evensOnlyStar(input);
		Assert.isTrue(equal(ArrayToList([[],2,[4,[8,[]],6,[[10]]]]), output));
	}
});

YAHOO.LFJ.test.oTestEvensOnlyStarAndCo = new YAHOO.tool.TestCase({
	name : "TestEvensOnlyStarAndCo",
	testEvensOnlyStarAndCo : function() {
//		var input = ArrayToList([[1],2,3,[4,[7,8,[]],5,6,[9,[10]]]]);
		var input = ArrayToList([[1],2,3,[4,[7,8,[]],5,6,[9,[10]]]]);
		var oddAdder = function (listOfNumbers, productOfEvens, sumOfOdds) {
			return cons(listOfNumbers,cons(productOfEvens,cons(sumOfOdds,EMPTY)));
		}
		var output = evensOnlyStarAndCo(input,oddAdder)
//		Assert.isTrue(equal(ArrayToList([[[],2],2,1]), output));
		Assert.isTrue(equal(ArrayToList([[[],2,[4,[8,[]],6,[[10]]]],3840,25]), output));
	}
});

/* here begin the test regarding chapter 9 */ 
YAHOO.LFJ.test.oTestProtoCombinator = new YAHOO.tool.TestCase({
	name : "TestProtoCombinator",
	testProtoCombinator : function() {
		var apples = ArrayToList(['a','p','p','l','e','s','a','p','p','l','e','s']);
		Assert.areEqual(12,MAma(apples));
	}
});

/* NB - the following function is the attempt at page 168 to extract 
make-length(make-length) from the innermost loop. This function is shown to generate an infinite loop 
Instead of "lenght" (which is what the book does) I am calling male(male) a "composite", shortened in "comp".*/
YAHOO.LFJ.test.oTestProtoCombinatorComp = new YAHOO.tool.TestCase({
	name : "TestProtoCombinatorComp",
	testProtoCombinatorComp : function() {
		var apples = ArrayToList(['a','p','p','l','e','s','a','p','p','l','e','s']);
		/* see lines around 170 in littleFunkyJavascripter.js */
/*		
		var MAmaComp = function(MALE) { return (MALE(MALE))}
			(function(male){return function(comp){ return function(list){return isEmpty(list)?0:1+comp(cdr(list))}}(male(male))});
		try{
			var result = MAmaComp(apples)
			Assert.isTrue(false, 'MAmaComp should be either not-a-function or be causing too much recursion')
		} catch (err) {
			Assert.isTrue(true)
		}		
*/	}
});

YAHOO.LFJ.test.oTestProtoCombinatorOfun = new YAHOO.tool.TestCase({
	name : "TestProtoCombinatorOfun",
	testProtoCombinatorOfun : function() {
		var apples = ArrayToList(['a','p','p','l','e','s','a','p','p','l','e','s']);
		// See notes at the definition of MAmaOfun inside littleFunkyJavascripter.js
		var MAmaOfunLocal = function(MALE) { return MALE(MALE)}  // definition inside this test will work
			(function(male){return function(oFun) { return function(list){return isEmpty(list)?0:1+oFun(cdr(list))}}(function(x){return male(male)(x)})});  // male = make-length in inner loop
		Assert.areEqual(12,MAmaOfunLocal(apples));
/*		try{  // using the definition in the library file
			var result = MAmaOfun(apples)   // definition outside this test will NOT work!
			Assert.isTrue(false, 'MAmaOfun should be not-a-function')
		} catch (err) {
			Assert.isTrue(true)
		}
*/	}
});

/* and here is my Y combinator - variables are named in a meaningful way, rather than x x x everywhere */ 
YAHOO.LFJ.test.oTestMyYCombinator = new YAHOO.tool.TestCase({
	name : "TestMyYCombinator",
	testMyYCombinator : function() {
		var MyY = function(worker) { return function(MALE) { return MALE(MALE) }  // MALE = make-length in combinator function
			(function (male) {  // male = make-length in argument function
				return worker(function(x){return male(male)(x)})
			})
		}
		var apples = ArrayToList(['a','p','p','l','e','s','a','p','p','l','e','s']);
		var lengthWorker = function(oFun) { 
			return function(list){
				return isEmpty(list)?0:1+oFun(cdr(list)); 
			}
		}
		var myLength = MyY(lengthWorker)
		Assert.areEqual(12,myLength(apples));

		var factorialWorker = function(oFun) {
			return function(n) {
				return (n === 0) ? 1 : n * oFun(n - 1);
			}
		}
		var myFactorial = MyY(factorialWorker)
		Assert.areEqual(24,myFactorial(4));
	}
});

/* this is an exercise with the functions that plug into a Y combinator */
YAHOO.LFJ.test.oTestFactorialWorker = new YAHOO.tool.TestCase({
	name : "TestFactorialWorker",
	testFactorialWorker : function() {
		/* 1) a plain factorial does its job (obviously) */
		var plainFactorial = function(n) {
			return (n==0) ? 1 : n*plainFactorial(n-1)
		}
		Assert.areEqual(120,plainFactorial(5));
		
		/* 2) a factorialWorker was born to be given as argument to a Y combinator */
		var factorialWorker = function (partial) {
			return function(n){
				return (n==0) ? 1 : n*partial(n-1)
			}
		}
		var MyY = function(worker) { return function(MALE) { return MALE(MALE) }
			(function (male) {
				return worker(function(x){return male(male)(x)})
			})
		}
		Assert.areEqual(120,MyY(factorialWorker)(5));

		/* 3) assigning a plain factorial to a factorialWorker you get back ... a factorial function!! */
		Assert.areEqual(120,factorialWorker(plainFactorial)(5));
		
		/* as Jim Weirich (http://www.infoq.com/presentations/Y-Combinator) says:
			- a recursive function is the fixed point of its own worker(*)
			- the Y combinator calculates the fixed points of a worker function
			- the Y combinator is the fixpoint combinator
		(*) Jim Weirich calls it an "improver" 
		*/		
	}
	
});

/* This is a verification of the ways if doing refactoring mentioned in http://www.infoq.com/presentations/Y-Combinator */
YAHOO.LFJ.test.oTestFunctionalRefactorings = new YAHOO.tool.TestCase({
	name : "TestFunctionalRefactorings",
	testFunctionalRefactorings : function() {
		/* here is the fixture */
		var gi = function(x) {return 'gi-' + x}
		Assert.areEqual('gi-pippo',gi('pippo'));

		/* 1) Tennent Correspondence Principle - wrapping a function and immediately invoking the wrapper returns the original function */
		var teCoPrGi = function(){return gi}
		Assert.areEqual(gi('pippo'),teCoPrGi()('pippo'));
		
		/* 2) Introduce Binding -  I may introduce a new variable as long as it's not bound elsewhere */
		var inBiGi = function(toBeBound){return gi}		
		Assert.areEqual(gi('pippo'),inBiGi('value given to the variable to be bound but blatantly ignored')('pippo'));
		
		/* 3) [Invisible] Wrapper Function - wraps and returns the application to itself of the original function */
		var wrapperGi = function(v){return (gi)(v)}
		Assert.areEqual(gi('pippo'),wrapperGi('pippo'));
		
		/* 4) Inline Function - anonymous bonanza */
		var teCoPrGiInline = function(){return function(x) {return 'gi-' + x}}
		Assert.areEqual(gi('pippo'),teCoPrGiInline()('pippo'));
		var inBiGiInline = function(toBeBound){return function(x) {return 'gi-' + x}}		
		Assert.areEqual(gi('pippo'),inBiGiInline('value given to the variable to be bound but blatantly ignored')('pippo'));
		var wrapperGiInline = function(v){return (function(x) {return 'gi-' + x})(v)}
		Assert.areEqual(gi('pippo'),wrapperGiInline('pippo'));
	}
});

// Chapter 10
YAHOO.LFJ.test.oTestSSS = new YAHOO.tool.TestCase({
	name : "TestSSS",
	testSSS : function() {
		var alal = function(xxx){alert(xxx)}
		var myTuple = new_entry('a','b')
		Assert.isTrue(size(myTuple)===2)
		Assert.areEqual('a', keys(myTuple))
		Assert.areEqual('b', values(myTuple))
		
		var myEntry = new_entry(atl(['key1','key2','key3']),atl(['val1','val2','val2']))
		Assert.areEqual('val2',lookup_in_entry('key2',myEntry,alal))
		Assert.areEqual('val2',lookup_in_entry('key3',car(extend_table(myEntry,EMPTY)),alal))
		var myEntry2 = new_entry(atl(['key11','key2']),atl(['val11','will_be_found']))
		var myTable = extend_table(myEntry2,extend_table(myEntry,EMPTY))
		Assert.areEqual('val11',lookup_in_table('key11',myTable,alal))
		Assert.areEqual('will_be_found',lookup_in_table('key2',myTable,alal))
		
		
	}
});

YAHOO.util.Event
		.onDOMReady(function() {
		
			if (!YAHOO.LFJ.test.LFJ_TestSuite) 
				YAHOO.LFJ.test.LFJ_TestSuite = new YAHOO.tool.TestSuite("YUI Test Suite for Little Funky Javascripter");
		
			YAHOO.LFJ.test.LFJ_TestSuite
					.add(YAHOO.LFJ.test.oTestIsMember);
			YAHOO.LFJ.test.LFJ_TestSuite
					.add(YAHOO.LFJ.test.oTestIsSet);
			YAHOO.LFJ.test.LFJ_TestSuite
					.add(YAHOO.LFJ.test.oTestMakeset);
			YAHOO.LFJ.test.LFJ_TestSuite
					.add(YAHOO.LFJ.test.oTestIsSubset);
			YAHOO.LFJ.test.LFJ_TestSuite
					.add(YAHOO.LFJ.test.oTestEqualSet);
			YAHOO.LFJ.test.LFJ_TestSuite
					.add(YAHOO.LFJ.test.oTestIsIntersection);
			YAHOO.LFJ.test.LFJ_TestSuite
					.add(YAHOO.LFJ.test.oTestIntersection);
			YAHOO.LFJ.test.LFJ_TestSuite
					.add(YAHOO.LFJ.test.oTestUnion);
			YAHOO.LFJ.test.LFJ_TestSuite
					.add(YAHOO.LFJ.test.oTestIntersectall);

			YAHOO.LFJ.test.LFJ_TestSuite
					.add(YAHOO.LFJ.test.oTestIsLat);
			YAHOO.LFJ.test.LFJ_TestSuite
					.add(YAHOO.LFJ.test.oTestPick);
			YAHOO.LFJ.test.LFJ_TestSuite
					.add(YAHOO.LFJ.test.oTestEqualEqlist);
			YAHOO.LFJ.test.LFJ_TestSuite
					.add(YAHOO.LFJ.test.oTestRemberStar);
			YAHOO.LFJ.test.LFJ_TestSuite
					.add(YAHOO.LFJ.test.oTestRember);
					
			YAHOO.LFJ.test.LFJ_TestSuite
					.add(YAHOO.LFJ.test.oTestMultiremberAndCo);
			YAHOO.LFJ.test.LFJ_TestSuite
					.add(YAHOO.LFJ.test.oTestMultiinsertLrAndCo);
			YAHOO.LFJ.test.LFJ_TestSuite
					.add(YAHOO.LFJ.test.oTestEvensOnly);
			YAHOO.LFJ.test.LFJ_TestSuite
					.add(YAHOO.LFJ.test.oTestEvensOnlyStar);
			YAHOO.LFJ.test.LFJ_TestSuite
					.add(YAHOO.LFJ.test.oTestEvensOnlyStarAndCo);

			YAHOO.LFJ.test.LFJ_TestSuite
					.add(YAHOO.LFJ.test.oTestProtoCombinator);
			YAHOO.LFJ.test.LFJ_TestSuite
					.add(YAHOO.LFJ.test.oTestProtoCombinatorComp);
			YAHOO.LFJ.test.LFJ_TestSuite
					.add(YAHOO.LFJ.test.oTestProtoCombinatorOfun);
			YAHOO.LFJ.test.LFJ_TestSuite
					.add(YAHOO.LFJ.test.oTestMyYCombinator);

			YAHOO.LFJ.test.LFJ_TestSuite
					.add(YAHOO.LFJ.test.oTestFactorialWorker);
			YAHOO.LFJ.test.LFJ_TestSuite
					.add(YAHOO.LFJ.test.oTestFunctionalRefactorings);

			YAHOO.LFJ.test.LFJ_TestSuite
					.add(YAHOO.LFJ.test.oTestTupleManagement);
					
			YAHOO.LFJ.test.LFJ_TestSuite
					.add(YAHOO.LFJ.test.oTestSSS);

			var logger = new YAHOO.tool.TestLogger("testLogger_LFJ");
			logger.hideCategory("info");

			YAHOO.tool.TestRunner
					.add(YAHOO.LFJ.test.LFJ_TestSuite);

			YAHOO.tool.TestRunner.run();
		});

