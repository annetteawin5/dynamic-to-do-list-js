// This event listener ensures the script runs after the entire HTML document is fully loaded.
document.addEventListener('DOMContentLoaded', () => {

    // Select DOM Elements and store them in constants.
    // This improves performance and code readability.
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Define a function to add a new task to the list.
    const addTask = () => {
        // Retrieve and trim the value from the task input field.
        const taskText = taskInput.value.trim();

        // Check if the task text is not empty.
        if (taskText !== '') {
            // Create a new list item (li) element.
            const li = document.createElement('li');
            // Set the text content of the list item to the task text.
            li.textContent = taskText;

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
            });

            // Append the remove button to the list item.
            li.appendChild(removeButton);
            // Append the complete list item to the unordered list (task-list).
            taskList.appendChild(li);

            // Clear the task input field after adding the task.
            taskInput.value = '';
        } else {
            // If the input field is empty, alert the user.
            alert('Please enter a task.');
        }
    };

    // Attach an event listener to the "Add Task" button.
    // When the button is clicked, the addTask function is called.
    addButton.addEventListener('click', addTask);

    // Attach a keypress event listener to the task input field.
    // This allows tasks to be added by pressing the "Enter" key.
    taskInput.addEventListener('keypress', (event) => {
        // Check if the pressed key is "Enter".
        if (event.key === 'Enter') {
            // If it is, call the addTask function.
            addTask();
        }
    });
});