function uid() {
    return Date.now().toString(16) + Math.random().toString(16).substring(2);
}
const taskData = [
    {
        id: uid(),
        name: "Estudar React com TypeScript",
        toDo: true
    },
    {
        id: uid(),
        name: "Estudar C# e Front End",
        toDo: false
    }
]


const taskInput = document.getElementById("task_input");
const addTaskButton = document.getElementById("new_task_button");
const tasksList = document.querySelector(".tasks_list");
const emptyTask = document.querySelector(".empty_tasks");
const taskTotal = document.querySelector("#todo_count");
const taskDoneTotal = document.querySelector("#done_count");

function completeTask() { }
function incompleteTask() { }

function deleteTask() { }

function counter() {
    let toDoTotal = 0;
    let doneTotal = 0;


    for (let item in taskData) {
        if (!taskData[item].toDo) {
            doneTotal++;
        }
    }

    toDoTotal = taskData.length;
    taskTotal.innerHTML = toDoTotal;
    taskDoneTotal.innerHTML = doneTotal;
}
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
    doneIcon.addEventListener("click", incompleteTask);

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
    taskInput.value = "";
    counter();
}

if (taskData.length > 0) {
} else {
    tasksList.classList.add("hidden");
    emptyTask.classList.remove("hidden");
}

counter();
addTaskButton.addEventListener("click", addTask);




