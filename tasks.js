(() => {
    function uid() {
        return Date.now().toString(16) + Math.random().toString(16).substring(2);
    }

    let taskData = [
        {
            id: uid(),
            name: "Estudar React com TypeScript",
            toDo: true
        },
        {
            id: uid(),
            name: "Estudar C# e .NET",
            toDo: true
        }
    ]

    const taskInput = document.querySelector("#task_input");
    const addTaskButton = document.querySelector("#new_task_button");
    const tasksList = document.querySelector("#tasks_list");
    const emptyTaskList = document.querySelector("#empty_tasks");
    const taskTotal = document.querySelector("#todo_count");
    const taskDoneTotal = document.querySelector("#done_count");

    function counter() {
        let todoTotal = 0;
        let doneTotal = 0;


        for (let task of taskData) {
            if (!task.toDo) doneTotal++;
        }

        todoTotal = taskData.length;
        taskTotal.innerHTML = todoTotal;
        taskDoneTotal.innerHTML = doneTotal;
    }

    function amptyList() {
        if (taskData.length > 0) {
            tasksList.classList.remove("hidden");
            emptyTaskList.classList.add("hidden");
        } else {
            emptyTaskList.classList.remove("hidden");
            tasksList.classList.add("hidden");
        }
    }

    function completeTask(e) {
        const todoIcon = e.target;
        todoIcon.classList.add("hidden");

        const doneIcon = todoIcon.parentNode.childNodes[1];
        const text = todoIcon.parentNode.childNodes[2];
        const task = todoIcon.parentNode.parentNode;

        task.classList.remove("todo");
        task.classList.add("done");

        doneIcon.classList.remove("hidden");
        text.classList.add("risked");

        taskData = taskData.map(item => {

            if (item.id === task.id) item.toDo = !item.toDo

            return item
        })

        counter();
    }

    function incompleteTask(e) {
        const doneIcon = e.target;
        doneIcon.classList.add("hidden");

        const todoIcon = doneIcon.parentNode.childNodes[0]
        const text = todoIcon.parentNode.childNodes[2];
        const task = todoIcon.parentNode.parentNode;

        task.classList.remove("done");
        task.classList.add("todo");

        todoIcon.classList.remove("hidden");
        text.classList.remove("risked");

        taskData = taskData.map(item => {

            if (item.id === task.id) item.toDo = !item.toDo

            return item
        })

        counter();
    }

    function deleteTask(e) {
        const el = e.target;
        const task = el.parentNode;
        tasksList.removeChild(task)

        taskData = taskData.filter(item => item.id !== task.id)

        counter();
        amptyList();
    }


    function createElementTask(taskName, taskId) {
        const task = document.createElement("li");
        task.classList.add("task");
        task.classList.add("todo");
        task.setAttribute("id", taskId);

        const contentOfLeft = document.createElement("div");
        contentOfLeft.classList.add("content_left");

        const todoIcon = document.createElement("i");
        todoIcon.classList.add("ph-duotone");
        todoIcon.classList.add("ph-circle-dashed");
        todoIcon.classList.add("check_btn");
        todoIcon.addEventListener("click", completeTask);

        const doneIcon = document.createElement("i");
        doneIcon.classList.add("ph-duotone");
        doneIcon.classList.add("ph-check-circle");
        doneIcon.classList.add("check_btn");
        doneIcon.classList.add("hidden");
        doneIcon.addEventListener("click", incompleteTask);

        const name = document.createElement("p");
        name.innerHTML = taskName;

        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add("ph-duotone");
        deleteIcon.classList.add("ph-trash");
        deleteIcon.classList.add("delete_btn");
        deleteIcon.addEventListener("click", deleteTask)

        contentOfLeft.appendChild(todoIcon);
        contentOfLeft.appendChild(doneIcon);
        contentOfLeft.appendChild(name);

        task.appendChild(contentOfLeft);
        task.appendChild(deleteIcon);

        return task;
    }

    function addTask(e) {
        e.preventDefault();
        const taskText = taskInput.value;

        if (taskText.length <= 0) return;

        const newTask = {
            id: uid(),
            name: taskText,
            toDo: true
        }

        taskData.push(newTask);
        const taskElement = createElementTask(newTask.name, newTask.id);

        tasksList.appendChild(taskElement);
        taskInput.value = "";

        amptyList();
        counter();
    }


    for (let item of taskData) {
        const el = createElementTask(item.name, item.id);
        tasksList.appendChild(el);
    }

    amptyList();
    counter();
    addTaskButton.addEventListener("click", addTask);

})();
