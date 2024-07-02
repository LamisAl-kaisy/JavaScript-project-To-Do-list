document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    const saveTasksToLocalStorage = () => {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(li => {
            tasks.push({
                text: li.querySelector('.task-text').textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const loadTasksFromLocalStorage = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTaskToDOM(task.text, task.completed);
        });
    };

    const addTaskToDOM = (taskText, completed = false) => {
        const listItem = document.createElement('li');
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        taskSpan.classList.add('task-text');

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');

        const completedCheckbox = document.createElement('input');
        completedCheckbox.type = 'checkbox';
        completedCheckbox.checked = completed;

        if (completed) {
            listItem.classList.add('completed');
        }
        completedCheckbox.addEventListener('change', () => {
            listItem.classList.toggle('completed');
            saveTasksToLocalStorage();
        });
        editButton.addEventListener('click', () => {
            const newText = prompt('Edit task:', taskSpan.textContent);
            if (newText !== null && newText.trim() !== '') {
                taskSpan.textContent = newText;
                saveTasksToLocalStorage();
            }
        });

        deleteButton.addEventListener('click', () => {
            listItem.remove();
            saveTasksToLocalStorage();
        });

        listItem.appendChild(completedCheckbox);
        listItem.appendChild(taskSpan);
        listItem.appendChild(editButton); listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);

        saveTasksToLocalStorage();
    };

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTaskToDOM(taskText);
            taskInput.value = "";
        }
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key == 'Enter') {
            addTaskButton.click();
        }
    });

    loadTasksFromLocalStorage();
});