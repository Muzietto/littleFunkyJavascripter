/* a few implementations from the Little Schemer
*/

YAHOO.namespace('LFJ.test');

var Assert = YAHOO.util.Assert;

YAHOO.LFJ.test.oTestIsLat = new YAHOO.tool.TestCase({
	name : "TestIsLat",
	testIsLat : function() {
		Assert.isTrue(isLat(List()))
		Assert.isTrue(isLat(List('a','b')))
		Assert.isFalse(isLat(ArrayToList([['a'],'b'])))
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
		Assert.areEqual('List(a)',consToString(intersection(List('a'),List('a'))))
		Assert.areEqual('List()',consToString(intersection(List(),List())))
		Assert.areEqual('List()',consToString(intersection(List('a'),List('b'))))
		Assert.areEqual('List()',consToString(intersection(List('a'),List())))
		Assert.areEqual('List()',consToString(intersection(List(),List('a'))))
		Assert.areEqual('List(a,b)',consToString(intersection(List('a','b','c'),List('b','a'))))
		Assert.areEqual('List()',consToString(intersection(List('a','b','c'),List('x','y','z'))))
		Assert.areEqual('List(c)',consToString(intersection(List('a','b','c'),List('x','c','z'))))
	}
});

YAHOO.LFJ.test.oTestUnion = new YAHOO.tool.TestCase({
	name : "TestUnion",
	testUnion : function() {
		Assert.areEqual('List(a)',consToString(union(List('a'),List('a'))))
		Assert.areEqual('List()',consToString(union(List(),List())))
		Assert.areEqual('List(a,b)',consToString(union(List('a'),List('b'))))
		Assert.areEqual('List(a)',consToString(union(List('a'),List())))
		Assert.areEqual('List(a)',consToString(union(List(),List('a'))))
		Assert.areEqual('List(c,b,a)',consToString(union(List('a','b','c'),List('b','a'))))
		Assert.areEqual('List(a,b,c,x,y,z)',consToString(union(List('a','b','c'),List('x','y','z'))))
		Assert.areEqual('List(a,b,x,c,z)',consToString(union(List('a','b','c'),List('x','c','z'))))
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
		Assert.areEqual('List(b,a)', consToString(madeset));
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

YAHOO.LFJ.test.oTestProtoCombinator = new YAHOO.tool.TestCase({
	name : "TestProtoCombinator",
	testProtoCombinator : function() {
		var apples = ArrayToList(['a','p','p','l','e','s','a','p','p','l','e','s']);
		Assert.areEqual(12,MAma(apples));
	}
});

YAHOO.LFJ.test.oTestProtoCombinatorComp = new YAHOO.tool.TestCase({
	name : "TestProtoCombinatorComp",
	testProtoCombinatorComp : function() {
		var apples = ArrayToList(['a','p','p','l','e','s','a','p','p','l','e','s']);
		/* see lines around 170 in littleFunkyJavascripter.js */
		//function MAmaComp(MALE) { return (MALE(MALE))}
		//	(function(male){return function(comp){ return function(list){return isEmpty(list)?0:1+comp(cdr(list))}}(male(male))});
		try{
			var result = MAmaComp(apples)
			Assert.isTrue(false, 'MAmaComp should be either not-a-function or be causing too much recursion')
		} catch (err) {
			Assert.isTrue(true)
		}		
	}
});

YAHOO.LFJ.test.oTestProtoCombinatorOfun = new YAHOO.tool.TestCase({
	name : "TestProtoCombinatorOfun",
	testProtoCombinatorOfun : function() {
		var apples = ArrayToList(['a','p','p','l','e','s','a','p','p','l','e','s']);
		// See notes at the definition of MAmaOfun inside littleFunkyJavascripter.js
		var MAmaOfunLocal = function(MALE) { return MALE(MALE)}  // definition inside this test will work
			(function(male){return function(oFun) { return function(list){return isEmpty(list)?0:1+oFun(cdr(list))}}(function(x){return male(male)(x)})});  // male = make-length in inner loop
		Assert.areEqual(12,MAmaOfunLocal(apples));
		try{  // using the definition in the library file
			var result = MAmaOfun(apples)   // definition outside this test will NOT work!
			Assert.isTrue(false, 'MAmaOfun should be not-a-function')
		} catch (err) {
			Assert.isTrue(true)
		}		
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

					var logger = new YAHOO.tool.TestLogger("testLogger_LFJ");
			logger.hideCategory("info");

			YAHOO.tool.TestRunner
					.add(YAHOO.LFJ.test.LFJ_TestSuite);

		});

