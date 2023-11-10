// Set up variables
const newTasks = document.querySelector('.newTasks');
const completedTasks = document.querySelector('.completedTasks');
const taskInput = document.querySelector('#taskInput');

// Load existing tasks or create empty array if no tasks saved in localstorage
let tasks = localStorage.getItem('tasks') ? 
JSON.parse(localStorage.getItem('tasks')) : [];

tasks.forEach(addTask);

// Add new tasks to list
function addTask(taskObj) {
    const li = document.createElement('li');

    // Add text content
    const spanText = document.createElement('span')
    spanText.textContent = taskObj.name;
    spanText.className = 'taskName';
    li.appendChild(spanText);

    // Add complete checkbox to each item in the list
    const spanComplete = document.createElement('span');
    const completeMrk = document.createTextNode('\u2714'); 
    spanComplete.className = 'completeBtn';
    spanComplete.onclick = function() {changeCheckbox(taskObj)};
    spanComplete.appendChild(completeMrk);
    li.appendChild(spanComplete);

    // Add delete mark to each item in list
    const spanDelete = document.createElement('span');
    const deleteMrk = document.createTextNode('\u2716');
    spanDelete.className = 'deleteBtn';
    spanDelete.onclick = function() {removeTask(taskObj)}
    spanDelete.appendChild(deleteMrk);
    li.appendChild(spanDelete);

    if (taskObj.complete) {
        completedTasks.appendChild(li); // Add the completed task to the bottom of the list
    } else {
        newTasks.insertBefore(li, newTasks.firstChild); // Insert the new task in front of the list
    }
}

// Set up an event listener if user presses Enter in input bar
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.querySelector('.addButton').click();
    }
})

function add() {
    const taskObj = {
        name: taskInput.value,
        complete: false
    }
    tasks.push(taskObj);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    addTask(taskObj)
    taskInput.value = '';
}

function del() {
    localStorage.clear();
    newTasks.innerHTML = '';
    completedTasks.innerHTML = '';
    tasks = [];
}

function changeCheckbox(taskObj) {
    taskObj.complete = !taskObj.complete;   // So it becomes the opposite of what is was
    if (taskObj.complete) {
        markComplete();
    } else {
        markUncomplete();
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
}

function markComplete() {
    const elementToMove = event.target.parentElement;
    completedTasks.appendChild(elementToMove); // Move the list item to bottom
}

function markUncomplete() {
    const elementToMove = event.target.parentElement;
    newTasks.insertBefore(elementToMove, newTasks.firstChild);

}

function removeTask(taskObj) {
    const removedTask = event.target.parentElement;
    removedTask.remove();
    const indexOfTask = tasks.findIndex(task => task.name === taskObj.name);
    tasks.splice(indexOfTask, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}