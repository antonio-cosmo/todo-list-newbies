function uid() {
    return Date.now().toString(16) + Math.random().toString(16).substring(2);
}
const taskData = [
    {
        id: 1,
        name: "Estudar React com TypeScript",
        toDo: true
    }
]


const taskInput = document.getElementById("task_input");
const addTaskButton = document.getElementById("new_task_button");
const tasksList = document.querySelector(".tasks_list");

function completeTask() { }

function deleteTask() { }


function createElementTask(taskName, taskId) {
    const task = document.createElement("li");
    task.classList.add("task");
    task.classList.add("todo");
    task.setAttribute("id", taskId);

    const contents = document.createElement("div");

    const toDoIcon = document.createElement("i");
    toDoIcon.classList.add("ph-duotone");
    toDoIcon.classList.add("ph-circle-dashed");
    toDoIcon.classList.add("check_btn");
    toDoIcon.addEventListener("click", completeTask);

    const doneIcon = document.createElement("i");
    doneIcon.classList.add("ph-duotone");
    doneIcon.classList.add("ph-check-circle");
    doneIcon.classList.add("check_btn");
    doneIcon.classList.add("hidden");

    const name = document.createElement("p");
    name.innerText = taskName;

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("ph-duotone");
    deleteIcon.classList.add("ph-trash");
    deleteIcon.classList.add("delete_btn");
    deleteIcon.addEventListener("click", deleteTask)

    contents.appendChild(toDoIcon);
    contents.appendChild(doneIcon);
    contents.appendChild(name);

    task.appendChild(contents);
    task.appendChild(deleteIcon);

    return task;
}

function addTask(e) {
    e.preventDefault();
    const taskText = taskInput.value;

    const newTask = {
        id: uid(),
        name: taskText,
        toDo: true
    }

    taskData.push(newTask);
    const taskElement = createElementTask(newTask.name, newTask.id);

    tasksList.appendChild(taskElement);
    taskInput.value = ""
}

addTaskButton.addEventListener("click", addTask);




