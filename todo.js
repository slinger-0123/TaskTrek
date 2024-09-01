const tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

// Function to add a task to the DOM
function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
        <label for="${task.id}">${task.text}</label>
        <img src="bin.svg" class="delete-btn" data-id="${task.id}" />
    `;

    // Add event listener for delete button
    li.querySelector('.delete-btn').addEventListener('click', () => deleteTask(task.id));

    taskList.appendChild(li);
}

// Function to render the task list and update the counter
function renderList() {
    taskList.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        addTaskToDOM(tasks[i]);
    }
    tasksCounter.innerHTML = tasks.length;
}

// Function to toggle the task's done status
function toggleTask(taskId) {
    const task = tasks.find(task => task.id === taskId);

    if (task) {
        task.done = !task.done;
        renderList();
        showNotification('Task toggled successfully');
    } else {
        showNotification('Could not toggle the task');
    }
}

// Function to delete a task
function deleteTask(taskId) {
    const newTasks = tasks.filter(task => task.id !== taskId);
    tasks.length = 0; // Clear the old tasks
    tasks.push(...newTasks); // Push the new tasks
    renderList();
    showNotification("Task deleted successfully");
}

// Function to add a new task
function addTask(task) {
    if (task) {
        tasks.push(task);
        renderList();
        showNotification('Task added successfully');
    } else {
        showNotification("Task cannot be added");
    }
}

// Function to show notifications
function showNotification(text) {
    alert(text);
}

// Function to handle Enter key press
function handleInputKeypress(e) {
    if (e.key === 'Enter') {
        const text = e.target.value;

        if (!text) {
            showNotification('Task text cannot be empty');
            return;
        }

        const task = {
            text,
            id: Date.now().toString(),
            done: false
        };

        e.target.value = '';
        addTask(task);
    }
}

// Event listener for input keypress
addTaskInput.addEventListener('keyup', handleInputKeypress);

// Additional functionality to toggle the task on checkbox change
taskList.addEventListener('change', (e) => {
    if (e.target.classList.contains('custom-checkbox')) {
        toggleTask(e.target.id);
    }
});
