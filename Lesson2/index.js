// save current state not working

const todoContainer = document.getElementById("todo-container");

const todos = [];

function addTodo(todo) {
	todo = todo || {};

	if (typeof todo.label !== "string") {
		throw new Error("todo.label has to be a string");
	}

	if (typeof todo.done !== "boolean") {
		throw new Error("todo.label has to be a boolean");
	}

	todos.push(todo);

	const todoElem = document.createElement("div");
	const todotext = document.createTextNode(todo.label);
	
	if (todo.done) {
		todoElem.style.textDecoration = "line-through";
	}

	todoElem.appendChild(todotext);

	todoElem.addEventListener("click", function() {
		todo.done = !todo.done;

		if (todo.done) {
			todoElem.style.textDecoration = "line-through";
		} else {
			todoElem.style.textDecoration = "";
		}

		save();
	});

	todoContainer.appendChild(todoElem);



	save();
}

function save() {
	const json = JSON.stringify(todos); // creates JSON representation of an array
	localStorage.setItem("todo-state", json);
	console.log(json);
}

document.getElementById("add-button").addEventListener("click", function() {
	const newTodo = document.getElementById("todo-input").value.trim();

	if (!newTodo) {
		return;
	}

	addTodo({
		label: newTodo,
		done: false
	});
});

const savedJson = localStorage.getItem("todo-state");

if (savedJson) {
	const lastState = JSON.parse(savedJson);

	for (let idx = 0; idx < lastState.length; idx += 1) {  // restores the last state of programme, even if we change (cross an item), than refresh the page, wont change
		addTodo(lastState[idx]);
	}
}

addTodo({
	label: "eat",
	done: false
});

addTodo({
	label: "sleep",
	done: true
});

addTodo({
	label: "sleep more",
	done: true
});