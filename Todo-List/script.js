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
  const li = document.createElement("li");

  // checkBox to check
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.checked = !!todo.completed;

  checkBox.addEventListener("change", () => {
    todo.completed = checkBox.checked;
    saveTodos();
    render();
  });

  // input-box
  const textSpan = document.createElement("span");
  textSpan.textContent = todo.text;

  if (todo.completed) {
    textSpan.style.textDecoration = "line-through";
  }

  // delete button
  const delBtn = document.createElement("button");
  delBtn.textContent = "🗑️";
  delBtn.addEventListener("click", () => {
    todos.splice(index, 1);
    saveTodos();
    render();
  });

  li.appendChild(checkBox);
  li.appendChild(textSpan);
  li.appendChild(delBtn);

  return li;
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
  input.value = "";
}

function render() {
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const node = createTodoNode(todo, index);
    list.appendChild(node);
  });
}

button.addEventListener("click", addTodo);

input.addEventListener("keydown", (event) => {
  if (event.key == "Enter") addTodo();
});

render();
