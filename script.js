'use strict' // Use strict mode to help catch errors and improve quality of code

// Set up variables
const newTasks = document.querySelector('.newTasks');
const completedTasks = document.querySelector('.completedTasks');
const taskInput = document.querySelector('#taskInput');

// Load existing tasks or create empty array if no tasks saved in localstorage
const tasks = localStorage.getItem('tasks') ? 
JSON.parse(localStorage.getItem('tasks')) : [];

tasks.forEach(addTask);

// Add tasks to list
function addTask(taskObj) {
    const li = document.createElement('li');
    li.name = taskObj.id;
    li.innerHTML = `
        <span class="taskName">${taskObj.name}</span>
        <span class="completeBtn" onclick="changeCheckbox(this)">\u2714</span>
        <span class="deleteBtn" onclick="removeTask(this)">\u2716</span>
    `
    if (taskObj.complete) {
        completedTasks.appendChild(li); // Add the completed task to the bottom of the completed list
    } else {
        newTasks.insertBefore(li, newTasks.firstChild); // Insert the new task in the start of the list of uncompleted tasks
    }
}

// Create new task object 
function add() {
    const taskObj = {
        name: taskInput.value,
        complete: false, 
        id: Date.now()
    }
    tasks.push(taskObj);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    addTask(taskObj);
    taskInput.value = '';
}

// Delete all task objects
function del() {
    localStorage.removeItem('tasks');
    newTasks.innerHTML = '';
    completedTasks.innerHTML = '';
    tasks = [];
}

// Evoked from user checking or unchecking a task
function changeCheckbox(taskEl) {
    const taskId = taskEl.parentNode.name;
    const taskObj = tasks.find(task => task.id === taskId); // Find the marked task
    taskObj.complete = !taskObj.complete;   // So it becomes the opposite of what is was
    if (taskObj.complete) {
        completedTasks.appendChild(taskEl.parentNode);
    } else {
        newTasks.insertBefore(taskEl.parentNode, newTasks.firstChild)
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove single task object
function removeTask(taskEl) {
    taskEl.parentNode.remove();
    const taskId = taskEl.parentNode.name;
    const indexOfTask = tasks.findIndex(task => task.id === taskId);
    tasks.splice(indexOfTask, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Set up an event listener if user presses Enter in input bar
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.querySelector('.addButton').click();
    }
})