const taskInput= document.getElementById("task");
const priorityInput= document.getElementById("priority");
const dateInput= document.getElementById("task-deadline");
const addTaskButton= document.getElementById("add-task");
const tasklist= document.getElementById("list");

addTaskButton.addEventListener("click", function(){
    const task= taskInput.value;
    const priority= priorityInput.value;
    const deadline= dateInput.value;

    if(deadline.trim()=== " "){
        alert("add an upcoming date for deadline");
    }

    const selectedDate = new Date(deadline);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
        alert("Please select an upcoming date for the deadline.");
        return; 
    }

    const taskItem= document.createElement("div");
    taskItem.innerHTML = `
    <p>${task}</p>
    <p>Priority: ${priority}</p>
    <p>Deadline: ${deadline}</p>
    <button class="mark-done">Mark Done</button>
  `;

    tasklist.appendChild(taskItem);
 
    taskInput.value = "";
    priorityInput.value = "top";
    deadlineInput.value = "";

});

tasklist.addEventListener("click", (event) => {
    if (event.target.classList.contains("mark-done")) {
        const taskItem = event.target.parentElement;
        taskItem.style.backgroundColor = "#7fffd4";
        event.target.disabled = true;
    }
});