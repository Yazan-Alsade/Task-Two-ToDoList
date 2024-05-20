document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    loadTasks();

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter a task!',
            });
            return;
        }

        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <div class="actions">
                <i class="fas fa-check complete-task"></i>
                <i class="fas fa-trash delete-task"></i>
            </div>
        `;

        taskList.appendChild(taskItem);
        taskInput.value = '';

        const completeTaskBtn = taskItem.querySelector('.complete-task');
        const deleteTaskBtn = taskItem.querySelector('.delete-task');

        completeTaskBtn.addEventListener('click', () => {
            taskItem.classList.toggle('completed');
            saveTasks();
        });

        deleteTaskBtn.addEventListener('click', () => {
            taskList.removeChild(taskItem);
            saveTasks();
        });

        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(taskItem => {
            tasks.push({
                text: taskItem.querySelector('span').textContent.trim(),
                completed: taskItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <span>${task.text}</span>
                <div class="actions">
                    <i class="fas fa-check complete-task"></i>
                    <i class="fas fa-trash delete-task"></i>
                </div>
            `;
            if (task.completed) {
                taskItem.classList.add('completed');
            }

            taskList.appendChild(taskItem);

            const completeTaskBtn = taskItem.querySelector('.complete-task');
            const deleteTaskBtn = taskItem.querySelector('.delete-task');

            completeTaskBtn.addEventListener('click', () => {
                taskItem.classList.toggle('completed');
                saveTasks();
            });

            deleteTaskBtn.addEventListener('click', () => {
                taskList.removeChild(taskItem);
                saveTasks();
            });
        });
    }
});
