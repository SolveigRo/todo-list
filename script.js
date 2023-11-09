
// Set up variables for input field and list container
const listCon = document.querySelector('ul');
const taskInput = document.querySelector('#taskInput');

// Load existing tasks or create empty array if no tasks saved in localstorage
let tasks = localStorage.getItem('tasks') ? 
JSON.parse(localStorage.getItem('tasks')) : [];

// Load each existing task into the list
// Used forEach with addTask as the callback function 
// Works as addTask is a named function and already loaded
tasks.forEach(addTask);

// Add new tasks to list
function addTask(taskName) {
    const li = document.createElement('li');

    // Add text content
    const spanText = document.createElement('span')
    spanText.textContent = taskName;
    spanText.className = 'taskName';
    li.appendChild(spanText);

    // Add complete checkbox to each item in the list
    const spanComplete = document.createElement('span');
    const completeMrk = document.createTextNode('\u2714'); 
    spanComplete.className = 'completeBtn';
    spanComplete.appendChild(completeMrk);
    li.appendChild(spanComplete);

    // Add delete mark to each item in list
    const spanDelete = document.createElement('span');
    const deleteMrk = document.createTextNode('\u2716');
    spanDelete.className = 'deleteBtn';
    spanDelete.appendChild(deleteMrk);
    li.appendChild(spanDelete);

    // Add the item to the displayed list
    listCon.appendChild(li);
}

function add() {
    tasks.push(taskInput.value);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    addTask(taskInput.value)
    taskInput.value = '';
}

function del() {
    localStorage.clear();
    listCon.innerHTML = '';
    tasks = [];
}