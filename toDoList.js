document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("addButton");
    const inputField = document.getElementById("input");
    const list = document.getElementById("list");

    function updateTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        list.innerHTML = "";
        tasks.forEach(function (taskText) {
            createTask(taskText);
        });
    }

    function saveTasks() {
        const tasks = [];
        list.querySelectorAll("li span").forEach(function (taskSpan) {
            tasks.push(taskSpan.textContent);
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function createTask(taskText) {
        const taskItem = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        const taskSpan = document.createElement("span");
        taskSpan.textContent = taskText;
        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskSpan);
        list.appendChild(taskItem);

        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                taskSpan.style.textDecoration = "line-through";
            } else {
                taskSpan.style.textDecoration = "none";
            }
            saveTasks();
        });
        taskItem.addEventListener("dblclick", function () {
            list.removeChild(taskItem);
            saveTasks();
        });
    }

    updateTasks();

    inputField.addEventListener("input", function () {
        if (inputField.value.trim() === "") {
            addButton.disabled = true;
            addButton.style.backgroundColor = "grey";
        } else {
            addButton.disabled = false;
        }
    });

    addButton.addEventListener("click", function () {
        const taskText = inputField.value.trim();
        if (taskText !== "") {
            createTask(taskText);
            inputField.value = "";
            addButton.disabled = true;
            saveTasks();
        }
    });
});
