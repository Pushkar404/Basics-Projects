const task = document.getElementById("task");
const addTaskBtn = document.getElementById("add-task-btn");
const taskContainer = document.getElementById("task-container");

addTaskBtn.addEventListener("click", () => {
  task.focus();
});

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskContainer.innerHTML = "";

  tasks.forEach((taskText, index) => {
    const todoWrapper = document.createElement("div");
    const deleteButton = document.createElement("button");
    const text = document.createElement("p");

    todoWrapper.classList.add("todo-container");
    deleteButton.classList.add("delete-button");
    text.classList.add("task-text");

    text.textContent = taskText;
    deleteButton.textContent = "🗑️";

    deleteButton.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    todoWrapper.append(text, deleteButton);
    taskContainer.append(todoWrapper);
  });
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const taskText = task.value.trim();

  if (taskText === "") return;

  tasks.push(taskText);
  saveTasks();
  renderTasks();

  task.value = "";
}

addTaskBtn.addEventListener("click", addTask);
task.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

renderTasks();
