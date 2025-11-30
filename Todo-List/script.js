const input = document.getElementById("todoInput");
const button = document.getElementById("addButton");
const list = document.getElementById("todoList");

// get back old todoLists from localstorage (if any)
const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

/**
 * todo = {text: text; completed: false}
 */
function createTodoNode(todo, index) {
  const list = document.createElement("li");

  // checkBox to check
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.checked = !!todo.completed;

  checkBox.addEventListener("change", () => {
    checkBox.checked = todo.completed;
    saveTodos();
    render();
  });

  // input-box
  const textSpan = document.createElement("span");
  textSpan.textContent = todo.text;

  if (todo.completed) {
    textSpan.style.textDecoration = "line-through";
  }
}

function addTodo() {
  const text = input.value.trim();

  if (!text) return;
  todos.push({
    text: text,
    completed: false,
  });
  saveTodos();
  render();
}

function render() {
  // code
}
