// This event listener ensures the script runs after the entire HTML document is fully loaded.
document.addEventListener('DOMContentLoaded', function() {

    // Select DOM Elements and store them in constants.
    // This improves performance and code readability.
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when the page loads.
    loadTasks();

    // Define a function to add a new task to the list.
    function addTask(taskText, save = true) {
        // Check if the task text is not empty.
        if (taskText !== '') {
            // Create a new list item (li) element.
            const li = document.createElement('li');
            // Set the text content of the list item to the task text.
            li.textContent = taskText;
            li.classList.add('task-items');

            // Create a new button element for removing the task.
            const removeButton = document.createElement('button');
            // Set the button's text to "Remove".
            removeButton.textContent = 'Remove';
            // Assign a class name for styling purposes.
            removeButton.className = 'remove-btn';

            // Attach an onclick event listener to the remove button.
            // When triggered, it will remove the parent li element from the task list.
            removeButton.addEventListener('click', () => {
                li.remove();
                removeTaskFromLocalStorage(taskText);
            });

            // Append the remove button to the list item.
            li.appendChild(removeButton);
            // Append the complete list item to the unordered list (task-list).
            taskList.appendChild(li);

            // Save the task to Local Storage if the 'save' parameter is true.
            if (save) {
                saveTaskToLocalStorage(taskText);
            }

        } else {
            // If the input field is empty, alert the user.
            alert('Please enter a task.');
        }
    };

    // The function to load tasks from Local Storage.
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' prevents re-saving to localStorage.
    }

    // The function to save a task to Local Storage.
    const saveTaskToLocalStorage = (taskText) => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    };

    // The function to remove a task from Local Storage.
    const removeTaskFromLocalStorage = (taskText) => {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    };

    // Attach an event listener to the "Add Task" button.
    // When the button is clicked, the addTask function is called.
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        addTask(taskText);
        taskInput.value = ''; // Clear input field after adding.
    });

    // Attach a keypress event listener to the task input field.
    // This allows tasks to be added by pressing the "Enter" key.
    taskInput.addEventListener('keypress', function (event) {
        // Check if the pressed key is "Enter".
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            addTask(taskText);
            taskInput.value = ''; // Clear input field after adding.
        }
    });
});