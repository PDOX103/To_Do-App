document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
    const clearTasksButton = document.getElementById('clear-tasks');

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task.text, task.completed));
    };

    const saveTasks = () => {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(taskItem => {
            tasks.push({
                text: taskItem.querySelector('span').textContent,
                completed: taskItem.querySelector('input').checked
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const addTaskToDOM = (taskText, completed = false) => {
        const li = document.createElement('li');
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        if (completed) taskSpan.classList.add('task-completed');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = completed;
        checkbox.addEventListener('change', () => {
            taskSpan.classList.toggle('task-completed');
            saveTasks();
        });

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(li);
            saveTasks();
        });

        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.addEventListener('click', () => {
            const newTaskText = prompt('Edit your task', taskSpan.textContent);
            if (newTaskText !== null) {
                taskSpan.textContent = newTaskText;
                saveTasks();
            }
        });

        li.appendChild(checkbox);
        li.appendChild(taskSpan);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    };

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTaskToDOM(taskText);
            taskInput.value = '';
            saveTasks();
        }
    });

    clearTasksButton.addEventListener('click', () => {
        taskList.innerHTML = '';
        saveTasks();
    });

    loadTasks();
});
