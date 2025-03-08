const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');

async function getTasks() {
    //Fetch tasks from the backend
    const response = await fetch('/api/todos');
    const tasks = await response.json();
    tasks.forEach(task => addTaskToUI(task));
}

async function addTask() {
    const taskText = newTaskInput.value;
    if (taskText) {
        const response = await fetch('/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task: taskText })
        });
        const newTask = await response.json();
        addTaskToUI(newTask);
        newTaskInput.value = '';
    }
}

function addTaskToUI(task) {
    const listItem = document.createElement('li');
    listItem.textContent = task.task; // Assuming the API returns { id, task }
    taskList.appendChild(listItem);
}

getTasks(); //Load tasks on page load