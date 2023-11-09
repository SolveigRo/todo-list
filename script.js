// Set up variables
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
function addTask(taskObj) {
    const li = document.createElement('li');
    li.className = taskObj.complete ? 'completeTask' : 'incompleteTask';

    // Add text content
    const spanText = document.createElement('span')
    spanText.textContent = taskObj.name;
    spanText.className = 'taskName';
    li.appendChild(spanText);

    // Add complete checkbox to each item in the list
    const spanComplete = document.createElement('span');
    const completeMrk = document.createTextNode('\u2714'); 
    spanComplete.className = 'completeBtn';
    spanComplete.onclick = function() {markComplete(taskObj)};
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
    listCon.innerHTML = '';
    tasks = [];
}

function markComplete(taskObj) {
    console.log(`The taskObj marked as complete:}`);
    console.log(taskObj);
    console.log(tasks);
    taskObj.complete = !taskObj.complete;   // So it becomes the opposite of what is was
    event.target.parentNode.className = taskObj.complete ? 'completeTask' : 'incompleteTask';
    localStorage.setItem('tasks', JSON.stringify(tasks));
}