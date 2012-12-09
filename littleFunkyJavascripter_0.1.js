/* a few implementations from the Little Schemer
*/
function car(cons) { return cons(function(x,y){return x})}
function cdr(cons) { return cons(function(x,y){return y})}

// list of atoms
function isLat(list) {
	return isEmpty(list) || ((typeof(car(list)) !== "function") && isLat(cdr(list)))
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

// remberStar 'b' (a,(b),b) -> (a,())
function remberStar(a, list) {
	if (isEmpty(list)) return EMPTY;
	else if (isAtom(car(list))) {
		if (equal(a, car(list))) return remberStar(a, cdr(list))
		else return cons(car(list), remberStar(a, cdr(list)))
	}
	else return cons(remberStar(a, car(list)), remberStar(a, cdr(list)))
}

// rember (a,b) ((a,b,(a,b)) -> (a,b)  that's to say it removes only S-list COMPLETELY matched
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
