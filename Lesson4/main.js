awesomeProperty = 42;

function testingThis() {
	console.log(this.awesomeProperty);  // "this" is the global object in  this case, object on which the function was called --> it was calle in the global scope
}

testingThis();

let testing = {
	awesomeProperty: 1337
};

testing.yo = testingThis;

delete testing.awesomeProperty;   // removes the property from that object
testing.yo();

// function.prototype.bind()

//override the meaning of "this" with the bind() method

let bindTest = {
	awesomeProperty: "sdklfsaj"
};

const boundFunction = testingThis.bind(bindTest);

boundFunction();

// call()
// apply()  - both redefine the meaning of this


// -------------------

// constructor functions -  create a new object

function Rapper(name) {
	this.name = name;

	// private property - not existing in JS --> bound 
	// private property example  -- not private variables - can access them on the closure
	let motto = "Rappers are the best";

	this.sayMotto = function(newMotto) {
		console.log(motto);
	}
	this.setMotto = function(newMotto) {
		motto = newMotto;
	}
}

Rapper.prototype = {
	speakFast: function() {
		console.log("I am " + this.name);
	},
	shootGuns: function() {
		console.log("bang");
	}
};

const eminem = new Rapper("eminem"); // created a ne object from a function

eminem.speakFast();
eminem.shootGuns();

console.log(eminem.__proto__);
console.log(eminem);

// override the functionality

eminem.speakFast = function() {
	console.log("skfsakfpasofkpsafosdfsdf");
};

eminem.speakFast();
console.log(eminem);

// prototype inheritance

function EastSideRapper(name) {
	this.name = name;
}

EastSideRapper.prototype = new Rapper("yopp");

EastSideRapper.prototype.dealDrugs = function() {
	console.log("Gimmme tha caash");
};

EastSideRapper.prototype.speakFast = function() {
	console.log("Eastside is tha best" + " I am " + this.name);
};

const drDre = new EastSideRapper("DrDre");

drDre.speakFast();  // drDre does not have a speakFast function, JS checks the prototype --> inheritance
drDre.dealDrugs();
drDre.shootGuns();  // checks the prototype of the prototype

console.log(drDre.__proto__);
console.log(drDre.__proto__.__proto__);

EastSideRapper.yop = function() {

}

// classes -- prototypes, not real classes

class WestSideRapper extends Rapper {
	constructor(name) {
		super();
		this.name = name;
	}

	pimp() {
		console.log("Ima pimp yo");
	}
}

const iceCube = new WestSideRapper("Ice Cube");
iceCube.speakFast();
iceCube.pimp();

console.log(typeof WestSideRapper);

// factory methods

function createRapper() {
	function shootGuns() {
		console.log("BANG");
	}

	return {
		speakFast: function() {
			console.log("I am " + name );
		},
		shootGuns: shootGuns
	};
}

function createEastSideRapper(name) {		// not working
	let rapper = createRapper(name);

	const prevSpeakFast = rapper.speakFast;

	rapper.speakFast = () => {
		prevSpeakFast();
		console.log("speaking fast");
	};

	rapper.dealDrugs = () => {
		console.log("YOOOOO");

	};

	return rapper;
}

const tupac = createEastSideRapper("2pac");
tupac.speakFast();



// object.create  --> inheritance is object based in JS not class-based

const rapper = { 				//will be the prototype of every rapper
	speakFast: function() {
		console.log("I am " + this.name);
	},
	shootGuns: function() {
		console.log("bang");
	}
};

const dopeman = Object.create(rapper);
dopeman.name = "dopeman";
dopeman.speakFast();

// propertiesObject

/*const dopeman = Object.create(rapper, {name: {		// not working
	value: "dopeman"

}});*/

let realRappingSkill = 0;
Object.defineProperty(dopeman, "rappingSkill", {
	set: function(newValue) {
		//console.log("It wont work");
		realRappingSkill = newValue / 2;
	},
	get: function() {
		//return "nothing";
		return realRappingSkill;
	}
});

console.log(dopeman.rappingSkill);

dopeman.rappingSkill = 100000000000;
console.log(dopeman.rappingSkill);


// this keyword not changeable in arrow functions  -- hiányos

let bindToObj = {
	x: 42
};

let testObj = {
	x: 1337,
	testFunction: (callback) => {
		callback();
	}
}

// video - fun fun functions - Composition over Inheritance

