const taskInput = document.getElementById("task");
const priorityInput = document.getElementById("priority");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("task-deadline");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("list");
const totalTasksElement = document.getElementById("total-tasks");
const remainingTasksElement = document.getElementById("remaining-tasks");

let tasks = [];

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

function addTask(task, priority, category, deadline) {
    tasks.push({ task, priority, category, deadline });
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");
        taskItem.innerHTML = `
        <p>${task.task}</p>
        <p>Priority: ${task.priority}</p>
        <p>Category: ${task.category}</p>
        <p>Deadline: ${task.deadline}</p>
        <button class="mark-done" onclick="completeTask(${index})">Mark Done</button>
        <button class="edit-task" onclick="editTask(${index})">Edit</button>
        <button class="delete-task" onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });

    updateTaskCounts();
}

function editTask(index) {
    const updatedTask = prompt("Edit task:", tasks[index].task);
    const updatedPriority = prompt("Edit priority (high, mid, low):", tasks[index].priority);
    const updatedDeadline = prompt("Edit deadline (YYYY-MM-DD):", tasks[index].deadline);

    if (updatedTask && updatedPriority && updatedDeadline) {
        tasks[index].task = updatedTask;
        tasks[index].priority = updatedPriority;
        tasks[index].deadline = updatedDeadline;
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function completeTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function updateTaskCounts() {
    totalTasksElement.textContent = tasks.length;
    remainingTasksElement.textContent = tasks.filter(task => !task.completed).length;
}

function filterTasks(category) {
    const filteredTasks = category === "all" ? tasks : tasks.filter(task => task.category === category);
    renderFilteredTasks(filteredTasks);
}

function renderFilteredTasks(filteredTasks) {
    taskList.innerHTML = "";
    filteredTasks.forEach((task, index) => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");
        taskItem.innerHTML = `
        <p>${task.task}</p>
        <p>Priority: ${task.priority}</p>
        <p>Category: ${task.category}</p>
        <p>Deadline: ${task.deadline}</p>
        <button class="mark-done" onclick="completeTask(${index})">Mark Done</button>
        <button class="edit-task" onclick="editTask(${index})">Edit</button>
        <button class="delete-task" onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });

    updateTaskCounts();
}

function sortTasks() {
    const sortBy = document.getElementById("sort-by").value;
    if (sortBy === "priority") {
        tasks.sort((a, b) => {
            const priorityOrder = { high: 3, mid: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        });
    } else if (sortBy === "deadline") {
        tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    }
    renderTasks();
}

addTaskButton.addEventListener("click", function () {
    const task = taskInput.value;
    const priority = priorityInput.value;
    const category = categoryInput.value;
    const deadline = dateInput.value;

    if (deadline.trim() === "") {
        alert("Add an upcoming date for the deadline");
    }

    const selectedDate = new Date(deadline);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
        alert("Please select an upcoming date for the deadline.");
        return;
    }

    addTask(task, priority, category, deadline);

    taskInput.value = "";
    priorityInput.value = "high";
    categoryInput.value = "work";
    dateInput.value = "";
});


