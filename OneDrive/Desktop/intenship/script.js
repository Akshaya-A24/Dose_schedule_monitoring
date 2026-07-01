let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

function addTask() {

    const title = document.getElementById("taskTitle").value;
    const description = document.getElementById("taskDescription").value;
    const priority = document.getElementById("taskPriority").value;
    const dueDate = document.getElementById("taskDate").value;

    if(title === ""){
        alert("Please enter task title");
        return;
    }

    const task = {
        id: Date.now(),
        title,
        description,
        priority,
        dueDate,
        completed:false
    };

    tasks.push(task);

    saveTasks();
    displayTasks();

    document.getElementById("taskTitle").value="";
    document.getElementById("taskDescription").value="";
    document.getElementById("taskDate").value="";
}

function displayTasks(){

    const taskList = document.getElementById("taskList");

    taskList.innerHTML="";

    tasks.forEach(task => {

        const div = document.createElement("div");

        div.className = task.completed
            ? "task completed"
            : "task";

        div.innerHTML = `
            <div class="task-header">
                <h3>${task.title}</h3>
                <span class="priority ${task.priority.toLowerCase()}">
                    ${task.priority}
                </span>
            </div>

            <p>${task.description}</p>

            <p><b>Due Date:</b> ${task.dueDate || "Not Set"}</p>

            <div class="task-buttons">
                <button onclick="toggleComplete(${task.id})">
                    ${task.completed ? "Undo" : "Complete"}
                </button>

                <button onclick="editTask(${task.id})">
                    Edit
                </button>

                <button onclick="deleteTask(${task.id})">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(div);
    });
}

function toggleComplete(id){

    tasks = tasks.map(task=>{
        if(task.id === id){
            task.completed = !task.completed;
        }
        return task;
    });

    saveTasks();
    displayTasks();
}

function editTask(id){

    const task = tasks.find(t => t.id === id);

    const newTitle = prompt("Edit Title", task.title);
    const newDescription = prompt("Edit Description", task.description);

    if(newTitle !== null){
        task.title = newTitle;
    }

    if(newDescription !== null){
        task.description = newDescription;
    }

    saveTasks();
    displayTasks();
}

function deleteTask(id){

    if(confirm("Delete this task?")){

        tasks = tasks.filter(task => task.id !== id);

        saveTasks();
        displayTasks();
    }
}

function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}