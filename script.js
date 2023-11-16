'use strict' // Use strict mode to help catch errors and improve quality of code

// Set up variables
const newTasks = document.querySelector('.newTasks'); 
const completedTasks = document.querySelector('.completedTasks');
const taskInput = document.querySelector('#taskInput');

// Check localStorage if tasks exists, if not, assign empty array
const tasks = localStorage.getItem('tasks') ? 
JSON.parse(localStorage.getItem('tasks')) : [];

tasks.forEach(addTask); // Add html elements for each task in list

// Add tasks as html elements
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

// Create new task object, create html elements for task, and add to list in localStorage.
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

// Delete all tasks from html list and localStorage
function del() {
    localStorage.removeItem('tasks');
    newTasks.innerHTML = '';
    completedTasks.innerHTML = '';
    tasks = [];
}

// Evoked from user checking or unchecking a task
function changeCheckbox(taskEl) {
    const taskId = taskEl.parentNode.name; // Task id is saved on li element
    const taskObj = tasks.find(task => task.id === taskId);
    taskObj.complete = !taskObj.complete;   
    if (taskObj.complete) { // If complete, add it to start of completed tasks list
        completedTasks.insertBefore(taskEl.parentNode, completedTasks.firstChild);
    } else { // If marked uncompleted, add it to start of new tasks list
        newTasks.insertBefore(taskEl.parentNode, newTasks.firstChild)
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove single task from html and localStorage list
function removeTask(taskEl) {
    taskEl.parentNode.remove(); // Remove task from html by removing its li element and children
    const taskId = taskEl.parentNode.name;
    const indexOfTask = tasks.findIndex(task => task.id === taskId);
    tasks.splice(indexOfTask, 1); // Remove task from task list
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Set up an event listener if user presses Enter in input bar
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.querySelector('.addButton').click();
    }
})