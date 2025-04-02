import "../css/main.css";

let currentPage = "all";
let isProject = false;

const notes = [
    {
        id: 1,
        title: "Note 1",
        description: "Description for Note 1",
    },
    {
        id: 2,
        title: "Note 2",
        description: "Description for Note 2"
    }
]

const tasksToday = [
    {
        id: 1,
        title: "Task 1",
        description: "Description for Task 1",
        dueDate: "2023-10-01",
        priority: "High"
    },
    {
        id: 2,
        title: "Task 2",
        description: "Description for Task 2",
        dueDate: "2023-10-02",
        priority: "Medium"
    },
    {
        id: 3,
        title: "Task 3",
        description: "Description for Task 3",
        dueDate: "2023-10-03",
        priority: "Low"
    }
];
const tasksThisWeek = [
    {
        id: 4,
        title: "Task 4",
        description: "Description for Task 4",
        dueDate: "2023-10-04",
        priority: "High"
    },
    {
        id: 5,
        title: "Task 5",
        description: "Description for Task 5",
        dueDate: "2023-10-05",
        priority: "Medium"
    },
    {
        id: 6,
        title: "Task 6",
        description: "Description for Task 6",
        dueDate: "2023-10-06",
        priority: "Low"
    }
];

const projectsTasks = [
    {
        name: "Project 1",
        tasks: [
            {
                id: 7,
                title: "Task 7",
                description: "Description for Task 7",
                dueDate: "2023-10-07",
                priority: "High"
            },
            {
                id: 8,
                title: "Task 8",
                description: "Description for Task 8",
                dueDate: "2023-10-08",
                priority: "Medium"
            }
        ]
    },
    {
        name: "Project 2",
        tasks: [
            {
                id: 9,
                title: "Task 9",
                description: "Description for Task 9",
                dueDate: "2023-10-09",
                priority: "Low"
            },
            {
                id: 10,
                title: "Task 10",
                description: "Description for Task 10",
                dueDate: "2023-10-10",
                priority: "High"
            }
        ]
    },
    {
        name: "Project 3",
        tasks: [
            {
                id: 11,
                title: "Task 11",
                description: "Description for Task 11",
                dueDate: "2023-10-11",
                priority: "Medium"
            },
            {
                id: 12,
                title: "Task 12",
                description: "Description for Task 12",
                dueDate: "2023-10-12",
                priority: "Low"
            }
        ]
    },
    {
        name: "Project 4",
        tasks: [
            {
                id: 13,
                title: "Task 13",
                description: "Description for Task 13",
                dueDate: "2023-10-13",
                priority: "High"
            },
            {
                id: 14,
                title: "Task 14",
                description: "Description for Task 14",
                dueDate: "2023-10-14",
                priority: "Medium"
            }
        ]
    },
    {
        name: "Project 5",
        tasks: [
            {
                id: 15,
                title: "Task 15",
                description: "Description for Task 15",
                dueDate: "2023-10-15",
                priority: "Low"
            },
            {
                id: 16,
                title: "Task 16",
                description: "Description for Task 16",
                dueDate: "2023-10-16",
                priority: "High"
            }
        ]
    },
];



// Functions

function addTask(tasks) {

    const taskForm = document.createElement("task-form");
    const taskFormContainer = document.getElementById("content");

    taskFormContainer.innerHTML = ""; // Clear existing tasks

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.placeholder = "Title";
    const descriptionInput = document.createElement("input");
    descriptionInput.type = "text";
    descriptionInput.placeholder = "Description";
    const priorityInput = document.createElement("input");
    priorityInput.type = "text";
    priorityInput.placeholder = "Priority";
    const dueDateInput = document.createElement("input");
    dueDateInput.type = "date";
    const addButton = document.createElement("button");
    addButton.textContent = "add";
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "cancel";
    taskFormContainer.appendChild(taskForm);
    taskForm.appendChild(titleInput);
    taskForm.appendChild(descriptionInput);
    taskForm.appendChild(priorityInput);
    taskForm.appendChild(dueDateInput);
    taskForm.appendChild(addButton);
    taskForm.appendChild(cancelButton);

    addButton.addEventListener("click", () => {
        const newTask = {
            id: Date.now(),
            title: titleInput.value,
            description: descriptionInput.value,
            dueDate: dueDateInput.value,
            priority: priorityInput.value
        }
        tasks.push(newTask);
        taskFormContainer.removeChild(taskForm);
        renderTasks(tasks);
    });
    cancelButton.addEventListener("click", () => {
        taskFormContainer.removeChild(taskForm);
        renderTasks(tasks);
    });
}

function renderTasks(tasks) {
    const taskList = document.getElementById("content");
    taskList.innerHTML = ""; // Clear existing tasks

    const addButton = document.createElement("button");
    addButton.classList = "add-btn";
    addButton.textContent = "+";

    addButton.addEventListener("click", () => addTask(tasks));

    taskList.appendChild(addButton);

    tasks.forEach(task => {
        // Create task elements
        const taskItem = document.createElement("div");
        taskItem.className = "task";
        const taskCheckbox = document.createElement("button");
        taskCheckbox.className = "checkbox";
        const taskTitle = document.createElement("h3");
        taskTitle.textContent = task.title;
        taskTitle.className = "title";
        const taskPriority = document.createElement("button");
        taskPriority.textContent = task.priority;
        taskPriority.className = "priority";
        const taskDueDate = document.createElement("input");
        taskDueDate.type = "date";
        taskDueDate.value = task.dueDate;
        taskDueDate.className = "due-date";
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit";
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete";

        // Add event listeners for edit and delete buttons
        editButton.addEventListener("click", () => handleEdit(task.id, tasks));
        deleteButton.addEventListener("click", () => handleDelete(task.id, tasks));
        taskCheckbox.addEventListener("click", () => {
            if(taskTitle.classList.contains("checked")) {
                taskTitle.classList.remove("checked");
                taskCheckbox.classList.remove("checked-btn");
            }
            else {
                taskTitle.classList.add("checked");
                taskCheckbox.classList.add("checked-btn");
            }
        });

        // Append elements to task item
        taskItem.appendChild(taskCheckbox);
        taskItem.appendChild(taskTitle);
        taskItem.appendChild(taskPriority);
        taskItem.appendChild(taskDueDate);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    });
}

function handleDelete(id, tasks) {
    const updatedTasks = tasks.filter(task => task.id !== id);
    tasks.length = 0; // Clear the original array
    tasks.push(...updatedTasks); // Update the original array
    const taskElement = document.getElementById(id).parentElement;
    taskElement.remove(); // Remove the task element from the DOM
}

function handleEdit(id, tasks) {

    const task = tasks.find(task => task.id === id);
    if (task) {
        const editForm = document.createElement("edit-form");
        const editFormContainer = document.getElementById("content");
        const titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.value = task.title;
        const descriptionInput = document.createElement("input");
        descriptionInput.type = "text";
        descriptionInput.value = task.description;
        const dueDateInput = document.createElement("input");
        dueDateInput.type = "date";
        dueDateInput.value = task.dueDate;
        const priorityInput = document.createElement("input");
        priorityInput.type = "text";
        priorityInput.value = task.priority;
        const saveButton = document.createElement("button");
        saveButton.textContent = "Save";
        const cancelButton = document.createElement("button");
        cancelButton.textContent = "Cancel";

        editFormContainer.appendChild(editForm);
        editForm.appendChild(cancelButton);
        editForm.appendChild(titleInput);
        editForm.appendChild(descriptionInput);
        editForm.appendChild(dueDateInput);
        editForm.appendChild(priorityInput);
        editForm.appendChild(saveButton);

        saveButton.addEventListener("click", () => {
            task.title = titleInput.value;
            task.description = descriptionInput.value;
            task.dueDate = dueDateInput.value;
            task.priority = priorityInput.value;
            editFormContainer.removeChild(editForm);
            renderTasks(tasks);
        });
        cancelButton.addEventListener("click", () => {
            editFormContainer.removeChild(editForm);
        });
    }
}

function renderNotes() {
    const notesList = document.getElementById("content");
    notesList.innerHTML = "";

    notes.forEach(note => {
        const noteItem = document.createElement("div");
        noteItem.className = "note";
        const noteTitle = document.createElement("input");
        noteTitle.value = note.title;
        const noteDescription = document.createElement("input");
        noteDescription.value = note.description;
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete";

        // Add event listener for delete button
        deleteButton.addEventListener("click", () => deleteNote(note.id));

        // Append elements to note item
        noteItem.appendChild(noteTitle);
        noteItem.appendChild(noteDescription);
        noteItem.appendChild(deleteButton);
        notesList.appendChild(noteItem);
    })
}

function deleteNote(id) {
    const updatedNotes = notes.filter(note => note.id !== id);
    notes.length = 0; // Clear the original array
    notes.push(...updatedNotes); // Update the original array
    renderNotes();
}



function renderTodayTasks() {
    isProject = false;
    currentPage = "today";
    renderTasks(tasksToday);
}

function renderThisWeekTasks() {
    isProject = false;
    currentPage = "week";
    renderTasks(tasksThisWeek);
}

function renderAllTasks() {
    isProject = false;
    currentPage = "all";
    const allTasks = [...tasksToday, ...tasksThisWeek];
    renderTasks(allTasks);
}

const allTasksButton = document.getElementById("tasks")
allTasksButton.addEventListener("click", renderAllTasks);
const todayButton = document.getElementById("today");
todayButton.addEventListener("click", renderTodayTasks);
const thisWeekButton = document.getElementById("week");
thisWeekButton.addEventListener("click", renderThisWeekTasks);
const notesButton = document.getElementById("notes");
notesButton.addEventListener("click", renderNotes);

const projects = document.getElementById("projects");
projectsTasks.forEach(project => {
    const projectList = document.createElement("div");
    projectList.className = "project";
    const projectIndex = projectsTasks.indexOf(project);
    projectList.textContent = project.name;
    projectList.addEventListener("click", () => {
        isProject = true;
        currentPage = projectIndex;
        renderTasks(project.tasks);
    });
    projects.appendChild(projectList);
});

renderAllTasks();