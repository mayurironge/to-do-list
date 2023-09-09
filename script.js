document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task}</span>
                <button data-index="${index}">Edit</button>
                <button data-index="${index}" class="delete">Delete</button>
            `;
            taskList.appendChild(li);
        });
    }

    renderTasks();

    addTaskButton.addEventListener('click', function () {
        const newTask = taskInput.value.trim();
        if (newTask !== '') {
            tasks.push(newTask);
            updateLocalStorage();
            renderTasks();
            taskInput.value = '';
        }
    });

    taskList.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete')) {
            const index = event.target.getAttribute('data-index');
            tasks.splice(index, 1);
            updateLocalStorage();
            renderTasks();
        } else if (event.target.innerText === 'Edit') {
            const index = event.target.getAttribute('data-index');
            const updatedTask = prompt('Edit the task:', tasks[index]);
            if (updatedTask !== null) {
                tasks[index] = updatedTask;
                updateLocalStorage();
                renderTasks();
            }
        }
    });
});
