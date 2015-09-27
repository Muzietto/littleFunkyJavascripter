/*
	LittleFunkyJavascripter - a few implementations from the Little Schemer
	Author: Marco Faustinelli (contacts@faustinelli.net)
	Web: http://faustinelli.net/
	     http://faustinelli.wordpress.com/
	Version: 1.0

	The MIT License - Copyright (c) 2012 LittleFunkyJavascripter Project
*/

var expect = chai.expect;

describe('a fully functional JS implementation of the Little Schemer', function () {

  describe('in chapter 3', function() {
    it('should feature a working implementation of isLat', function() {
      expect(isLat(List())).to.be.ok;
      expect(isLat(List('a','b'))).to.be.ok;
      expect(isLat(ArrayToList([['a'],'b']))).to.be.not.ok;
    })
    it('should handle tuples', function() {
      var myTuple = build('a','b');
      expect(size(myTuple)).to.be.equal(2);
      expect(first(myTuple)).to.be.equal('a');
      expect(second(myTuple)).to.be.equal('b');
      safeThrow(function(){first(cons('c', myTuple));}, 'Not a tuple!');
      safeThrow(function(){second(cons('c', myTuple));}, 'Not a tuple!');
    });
  });

  describe('in chapter 4', function() {
    it('should feature a working implementation of pick', function() {
      var myList = ArrayToList([['a'],'b',['c','d']])
      expect(pick(2, myList)).to.be.equal('b');
      expect(pick(2, pick(3, myList))).to.be.equal('d');
      expect(isEmpty(pick(212, myList))).to.be.ok;
    });
  });

  describe('in chapter 5', function() {
    it('should feature a working implementation of eqlist', function() {
      expect(eqlist(ArrayToList([]), ArrayToList([]))).to.be.ok;
      expect(eqlist(ArrayToList(['a']), ArrayToList(['a']))).to.be.ok;
      expect(eqlist(ArrayToList(['a']), ArrayToList(['b']))).to.be.not.ok;
      expect(eqlist(ArrayToList(['a']), ArrayToList(['b','c']))).to.be.not.ok;
      expect(eqlist(ArrayToList([]), ArrayToList(['a']))).to.be.not.ok;
      expect(eqlist(ArrayToList(['a',['b','c']]), ArrayToList(['a',['b','c']]))).to.be.ok;
      expect(eqlist(ArrayToList(['a',['b','c'],'d']), ArrayToList(['a',['b','c']]))).to.be.not.ok;
    });
    it('should feature a working implementation of rember', function() {
      // rember 'a' (a) -> ( ) 
      expect(eqlist(ArrayToList([]),rember('a', ArrayToList(['a'])))).to.be.ok;
      // rember 'b' (a,(b),b) -> (a,( b))  that's to say it DOES NOT recur inside sublists
      expect(eqlist(ArrayToList(['a',['b']]),rember('b', ArrayToList(['a',['b'],'b'])))).to.be.ok;
      // rember (a,b) ((a,b,(a,b)) -> (a,b)  that's to say it removes only S-list COMPLETELY matched
      expect(eqlist(ArrayToList(['a','b']),rember(ArrayToList(['a','b']), ArrayToList(['a','b',['a','b']])))).to.be.ok;
    });
    it('should feature a working implementation of remberStar', function() {
      // rember* 'a' (a) -> ( )
      expect(eqlist(ArrayToList([]), remberStar('a', ArrayToList(['a'])))).to.be.ok;
      // rember* 'b' (a,(b),b) -> (a,( ))  that's to say it DOES recur inside sublists
      expect(eqlist(ArrayToList(['a',[]]), remberStar('b', ArrayToList(['a',['b'],'b'])))).to.be.ok;
    });
  });
    
  describe('in chapter 7', function() {
    it('should feature a working implementation of isIntersection', function() {
      expect(isIntersection(List('a'),List('a'))).to.be.ok;
      expect(isIntersection(List(),List())).to.be.not.ok;
      expect(isIntersection(List('a'),List('b'))).to.be.not.ok;
      expect(isIntersection(List('a'),List())).to.be.not.ok;
      expect(isIntersection(List(),List('c'))).to.be.not.ok;
      expect(isIntersection(List('a','b','c'),List('b','a'))).to.be.ok;
      expect(isIntersection(List('a','b','c'),List('z','y','z'))).to.be.not.ok;
      expect(isIntersection(List('a','b','c'),List('z','c','z'))).to.be.ok;
    });
    it('should feature a working implementation of intersection', function() {
      expect(consToString(intersection(List('a'),List('a')))).to.be.equal('[a]');
      expect(consToString(intersection(List(),List()))).to.be.equal('[]');
      expect(consToString(intersection(List('a'),List('b')))).to.be.equal('[]');
      expect(consToString(intersection(List('a'),List()))).to.be.equal('[]');
      expect(consToString(intersection(List(),List('a')))).to.be.equal('[]');
      expect(consToString(intersection(List('a','b','c'),List('b','a')))).to.be.equal('[a,b]');
      expect(consToString(intersection(List('a','b','c'),List('x','y','z')))).to.be.equal('[]');
      expect(consToString(intersection(List('a','b','c'),List('x','c','z')))).to.be.equal('[c]');
    });
    it('should feature a working implementation of intersectall', function() {
      expect(eqlist(EMPTY,intersectall(EMPTY)),'empty set').to.be.ok;  // added after reading Seasoned Schemer, page 38
      var input = ArrayToList([['a','b','c'],['c','a','d','e'],['e','f','g','h','a','b']]);    
      expect(eqlist(ArrayToList(['a']),intersectall(input)),'input').to.be.ok;
      var input2 = ArrayToList([[6,'pears','and'],[3,'peaches','and',6,'peppers'],[8,'pears','and',6,'plums'],['and',6,'prunes','with','some','apples']]);    
      expect(eqlist(ArrayToList([6,'and']),intersectall(input2)),'input2').to.be.ok;
    });
    it('should feature a working implementation of union', function() {
      expect(consToString(union(List('a'),List('a')))).to.be.equal('[a]');
      expect(consToString(union(List(),List()))).to.be.equal('[]');
      expect(consToString(union(List('a'),List('b')))).to.be.equal('[a,b]');
      expect(consToString(union(List('a'),List()))).to.be.equal('[a]');
      expect(consToString(union(List(),List('a')))).to.be.equal('[a]');
      expect(consToString(union(List('a','b','c'),List('b','a')))).to.be.equal('[c,b,a]');
      expect(consToString(union(List('a','b','c'),List('x','y','z')))).to.be.equal('[a,b,c,x,y,z]');
      expect(consToString(union(List('a','b','c'),List('x','c','z')))).to.be.equal('[a,b,x,c,z]');
    });
    it('should feature a working implementation of isSet', function() {
      expect(isSet(List('a'))).to.be.ok;
      expect(isSet(List())).to.be.ok;
      expect(isSet(List('a','a'))).to.be.not.ok;
      expect(isSet(List('a','b','c'))).to.be.ok;
    });
    it('should feature a working implementation of makeset', function() {
      var madeset = makeset(List('a','b','a'));
      expect(isMember('a',madeset)).to.be.ok;
      expect(isMember('b',madeset)).to.be.ok;
      expect(size(madeset)).to.be.equal(2);
      expect(consToString(madeset)).to.be.equal('[b,a]');
    });
    it('should feature a working implementation of isSubset', function() {
      expect(isSubset(List(), List('a'))).to.be.ok;
      expect(isSubset(List('a'), List())).to.be.not.ok;
      expect(isSubset(List('a'), List('a'))).to.be.ok;
      expect(isSubset(List('a'), List('a','b'))).to.be.ok;
      expect(isSubset(List('b'), List('a','b'))).to.be.ok;
      expect(isSubset(List('b','a'), List('a','b'))).to.be.ok;
    });
    it('should feature a working implementation of equalSet', function() {
      expect(equalSet(List(), List())).to.be.ok;
      expect(equalSet(List(), List('a'))).to.be.not.ok;
      expect(equalSet(List('a'),List())).to.be.not.ok;
      expect(equalSet(List('a','b'),List('b'))).to.be.not.ok;
      expect(equalSet(List('a'), List('a'))).to.be.ok;
      expect(equalSet(List('a','b'), List('b','a'))).to.be.ok;
    });
    it('should feature a working implementation of isMember', function() {
      expect(isMember('a', List('a'))).to.be.ok;
      expect(isMember(List(), List('a'))).to.be.not.ok;
      expect(isMember(List('a'), Nil)).to.be.not.ok;
      expect(isMember('a', List('b','a'))).to.be.ok;
      expect(isMember('a', List('b'))).to.be.not.ok;
    });
  });

  describe('in chapter 8', function() {
    it('should feature a working implementation of multiRember&Co', function() {
      //  make list without, list with and cons their lengths
      var lengthsCollector = function(removed,left) {return cons(size(removed),cons(size(left),EMPTY));}
      var input = List('a',true,123,'b','a')
      var output = multiremberAndCo('a', input, lengthsCollector)
      expect(eqlist(ArrayToList([3,2]), output)).to.be.ok;
    });
    it('should feature a working implementation of multiInsertLr&Co', function() {
      var myCollector = function(insertionResult, numLeftInsertions, numRightInsertions) {
        return pick(numLeftInsertions+numRightInsertions, insertionResult)
      }
      var input = List('chips','and','fish','or','fish','and','chips')
      expect(multiinsertLrAndCo('salty', 'fish', 'chips', input, myCollector)).to.be.equal('salty');
    });
    it('should feature a working implementation of evensOnly', function() {
      expect(eqlist(ArrayToList([2,4,6,8,10]), evensOnly(ArrayToList([1,2,3,4,5,6,7,8,9,10])))).to.be.ok;
    });
    it('should feature a working implementation of evensOnly*', function() {
      var input = ArrayToList([[1],2,3,[4,[7,8,[]],5,6,[9,[10]]]]);
      var output = evensOnlyStar(input);
      expect(equal(ArrayToList([[],2,[4,[8,[]],6,[[10]]]]), output)).to.be.ok;
    });
    it('should feature a working implementation of evensOnly*&Co', function() {
      //var input = ArrayToList([[1],2,3,[4,[7,8,[]],5,6,[9,[10]]]]);
      var input = ArrayToList([[1],2,3,[4,[7,8,[]],5,6,[9,[10]]]]);
      var oddAdder = function (listOfNumbers, productOfEvens, sumOfOdds) {
        return cons(listOfNumbers, cons(productOfEvens, cons(sumOfOdds, EMPTY)));
      }
      var output = evensOnlyStarAndCo(input, oddAdder)
      //expect(equal(ArrayToList([[[],2],2,1]), output)).to.be.ok; // fix me
      expect(equal(ArrayToList([[[],2,[4,[8,[]],6,[[10]]]],3840,25]), output)).to.be.ok;
    });
  });

  describe('in chapter 9', function() {
    describe('it should start by refreshing refactorings in functional programming style:', function() {
      beforeEach(function() {
        /* here is the fixture */
        this.gi = function(x) {return 'gi-' + x}
        expect(this.gi('pippo')).to.be.equal('gi-pippo');
      });

      /* 1) Tennent Correspondence Principle - wrapping a function and immediately invoking the wrapper returns the original function */
      it('Tennent Correspondence Principle', function(){
        var gi = this.gi;
        var teCoPrGi = function(){return gi}
        expect(teCoPrGi()('pippo')).to.be.equal(gi('pippo'));
      });

      /* 2) Introduce Binding -  I may introduce a new variable as long as it's not bound elsewhere */
      it('Introduce Binding', function(){
        var gi = this.gi;
        var inBiGi = function(toBeBound){return gi}    
        expect(inBiGi('value given to the variable to be bound but blatantly ignored')('pippo')).to.be.equal(gi('pippo'));
      });
      
      /* 3) [Invisible] Wrapper Function - wraps and returns the application to itself of the original function */
      it('[Invisible] Wrapper Function', function(){
        var gi = this.gi;
        var wrapperGi = function(v){return (gi)(v)}
        expect(wrapperGi('pippo')).to.be.equal(gi('pippo'));
      });
      
      /* 4) Inline Function - anonymous bonanza */
      it('Inline Function', function(){
        var gi = this.gi;
        var teCoPrGiInline = function(){return function(x) {return 'gi-' + x}}
        expect(teCoPrGiInline()('pippo')).to.be.equal(gi('pippo'));
        var inBiGiInline = function(toBeBound){return function(x) {return 'gi-' + x}}    
        expect(inBiGiInline('value given to the variable to be bound but blatantly ignored')('pippo')).to.be.equal(gi('pippo'));
        var wrapperGiInline = function(v){return (function(x) {return 'gi-' + x})(v)}
        expect(wrapperGiInline('pippo')).to.be.equal(gi('pippo'));
      });
    });

    it('should tread carefully while approaching the Y-combinator - testProtoCombinator', function() {
      var apples = ArrayToList(['a','p','p','l','e','s','a','p','p','l','e','s']);
      expect(MAma(apples)).to.be.equal(12);
    });

    /* NB - the following function is the attempt at page 168 to extract 
    make-length(make-length) from the innermost loop. This function is shown to generate an infinite loop 
    Instead of "lenght" (which is what the book does) I am calling male(male) a "composite", shortened in "comp".*/
    it.skip('should tread carefully while approaching the Y-combinator - testProtoCombinatorComp', function() {
    var apples = ArrayToList(['a','p','p','l','e','s','a','p','p','l','e','s']);
    /* see lines around 170 in littleFunkyJavascripter.js */
    var MAmaComp = function(MALE) { return (MALE(MALE))}
      (function(male){return function(comp){ return function(list){return isEmpty(list)?0:1+comp(cdr(list))}}(male(male))});
    try{
      var result = MAmaComp(apples);
      expect(true).to.be.not.ok;
      //Assert.isTrue(false, 'MAmaComp should be either not-a-function or be causing too much recursion')
    } catch (err) {
      expect(true).to.be.ok;
    }
   });
    it('should tread carefully while approaching the Y-combinator - testProtoCombinatorOfun', function() {
      var apples = ArrayToList(['a','p','p','l','e','s','a','p','p','l','e','s']);
      // See notes at the definition of MAmaOfun inside littleFunkyJavascripter.js
      var MAmaOfunLocal = function(MALE) { return MALE(MALE)}  // definition inside this test will work
        (function(male){return function(oFun) { return function(list){return isEmpty(list)?0:1+oFun(cdr(list))}}(function(x){return male(male)(x)})});  // male = make-length in inner loop
      expect(MAmaOfunLocal(apples)).to.be.equal(12);
      try{  // using the definition in the library file
        var result = MAmaOfun(apples)   // definition outside this test will NOT work!
        expect(true).to.be.not.ok;
        //Assert.isTrue(false, 'MAmaOfun should be not-a-function')
      } catch (err) {
        expect(true).to.be.ok;
      }
    });
    it('should verify the helper functions that plug into the Y-combinator, in clean TDD-style', function() {
      /* 1) a plain factorial does its job (obviously) */
      var plainFactorial = function(n) {
        return (n==0) ? 1 : n*plainFactorial(n-1)
      }
      expect(plainFactorial(5)).to.be.equal(120);
      
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
      expect(MyY(factorialWorker)(5)).to.be.equal(120);

      /* 3) assigning a plain factorial to a factorialWorker you get back ... a factorial function!! */
      expect(factorialWorker(plainFactorial)(5)).to.be.equal(120);
      
      /* as Jim Weirich (http://www.infoq.com/presentations/Y-Combinator) says:
        - a recursive function is the fixed point of its own worker(*)
        - the Y combinator calculates the fixed points of a worker function
        - the Y combinator is the fixpoint combinator
       (*) Jim Weirich calls it an "improver" 
      */    
    });
    it('...and eventually it should feature a Y-COMBINATOR worth its name!', function() {
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
      expect(myLength(apples)).to.be.equal(12);

      var factorialWorker = function(oFun) {
        return function(n) {
          return (n === 0) ? 1 : n * oFun(n - 1);
        }
      }
      var myFactorial = MyY(factorialWorker)
      expect(myFactorial(4)).to.be.equal(24);
    });
  });

  describe('in chapter 10', function() {
    it('should XXX - to be continued', function() {
      var alal = function(xxx){alert(xxx)}
      var myTuple = new_entry('a','b')
      expect(size(myTuple)).to.be.equal(2);
      expect(keys(myTuple)).to.be.equal('a');
      expect(values(myTuple)).to.be.equal('b');
      
      var myEntry = new_entry(atl(['key1','key2','key3']),atl(['val1','val2','val2']))
      expect(lookup_in_entry('key2',myEntry,alal)).to.be.equal('val2');
      expect(lookup_in_entry('key3',car(extend_table(myEntry,EMPTY)),alal)).to.be.equal('val2');
      var myEntry2 = new_entry(atl(['key11','key2']),atl(['val11','will_be_found']))
      var myTable = extend_table(myEntry2,extend_table(myEntry,EMPTY))
      expect(lookup_in_table('key11',myTable,alal)).to.be.equal('val11');
      expect(lookup_in_table('key2',myTable,alal)).to.be.equal('will_be_found');
    });
  });

  function safeThrow(command, string) {
    try {
      command();
    } catch(err) {
      expect(err).to.be.equal(string);
    }
  }
});
