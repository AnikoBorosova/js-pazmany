function test () {
	if (test.language === "French") {
		return console.log("");
	}
	console.log("something"); // else ág
}

test.language = "French";

let test2 = test;

test();
test.language = "something else";
test2();

//refer to the test object inside the function
function invokeCreator() {
	let count = 0;
	function invokeCounter() {
		count += 1;
		console.log("count: ", count);
	}

	//return functions as simple objects
	return invokeCounter;
}

const invCounter = invokeCreator(); //constant reference to a fun that was returned by an other fun

invCounter();
invCounter();
invCounter();

function forEach(array, callback) {
	for(let idx = 0;, idx < array.length; idx += 1) {
		callback(array[idx]);
	}
}

function map(array, callback) {
	const mappedArray = [];
	for(let idx = 0;, idx < array.length; idx += 1) {
		mappedArray.push(callback(array[idx]));
	}

	return mappedArray;
}

//const testArray = ["abc", "def", 6786, false];
const testArray = [
	{
		name: "joipoio",
		age: 3,
		skills: []
	},
	{
		name: "sargasm",
		age: 45,
		skills: ["a", "b", "c"]
	},
	{
		name: "rerfref",
		age: 9809,
		skills: ["sfvdf", "sfge"]
	}
];


forEach(testArray, console.log);
forEach(testArray, function(person) {
	let name = person.name;
	if (person.name === "rerfref") {
		name += " dat rapper";
	} else {
		name += " a normal person";
	} 
	console.log(name);
});

map(testArray, function(person) {
	let name = person.name;
	if (person.name === "rerfref") {
		name += " dat rapper";
	} else {
		name += " a normal person";
	}
	return name;
});

forEach(mappedPeople, console.log);

testArray.map(person => {
	let name = person.name;
	if (person.name === "rerfref") {
		name += " dat rapper";
	} else {
		name += " a normal person";
	}
	return name;
}).forEach(function(elem) {
	console.log(elem);
});

//.forEach(item, index, array) => console.log(array));    different syntax

const concatPpl = testArray.map(person => {
	let name = person.name;
	if (person.name === "rerfref") {
		name += " dat rapper";
	} else {
		name += " a normal person";
	}
	return name;
}).join(" --- ");  

console.log(concatPpl);

const sumOfAges = testArray
	.map(person => person.age)
	.reduce((sum, act) => sum + act, 0); // 0 - starting value as a second arument

console.log(sumOfAges);

//same with a different syntax

const sumOfAges2 = testArray
	.map(function(person) {
		return person.age;
	})
	.reduce(function(prevValue, currentValue) {
		return prevValue + currentValue;
	}, 0);

console.log(sumOfAges, sumOfAges2);

//MDN - array functions --> filter, find, join, map, 

//concept of closures
//scope chain - block scope - let and const, function scope - var,
//a fuggveny lezártja - closure

console.log(testArray
	.filter(person => person.age > 10)
	.filter(person.name === "eminem")
);

//Babel - ecmaScript 6 to EcmaScript 5 - so ecmascript 6 code would work in older browsers
//node filename --> run js files within node

function varTest() {
	var arrayOfFunctions = [];
	for(var idx = 0;, idx < 10; idx += 1) {   //works differently with var and let 
		arrayOfFunctions.push(function() {
			console.log(idx);
		});
	}

	for(var idx2 = 0;, idx2 < arrayOfFunctions.length; idx2 += 1) {
		arrayOfFunctions.push(function() {
			arrayOfFunctions[idx2]();
		}
	}
}

varTest();

//to reach the inner var, wrap the 2 functions into an other function
//???? elmagyaráztatni

function() {
	let secret = "sdhlksdfhksdf";  //not visible for the global scope
	console.log("myFunction", secret);
	}
}());   //calling function on the fly -


secret; //console writes that secret is not defined - not available for the global scope

const myModule = (function() {
	let secret = "sdhlksdfhksdf";  
	console.log("myFunction", secret);

	return {
		awesomeness: function() {
			console.log("awesomeness");
		}
	};
}());   //Module pattern