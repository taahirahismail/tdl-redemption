const text = document.getElementById("text");
const addTaskBtn = document.getElementById("add-task-btn");
const saveTaskBtn = document.getElementById("save-task-btn");
const listBox = document.getElementById("list-box");
const saveIndex = document.getElementById("save-index");

let tasks = [];

addTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let todo = localStorage.getItem("todo");

    if (todo === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(todo);
    }

    tasks.push(text.value);
    text.value = "";
    localStorage.setItem("todo", JSON.stringify(tasks));

    displayTask();
});

displayTask();

function displayTask() {
    let todo = localStorage.getItem("todo");
    if (todo === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(todo);
    }

    let htmlCode = "";
    tasks.forEach((list, index) => {
        htmlCode += `
        <div class="m-1 p-1 border border-2 rounded-2 border-warning">
        <h5>${list}</h5>
        <button onclick="editTask(${index})" class="btn btn-outline-warning">Edit</button>
        <button onclick="deleteTask(${index})" class="btn btn-outline-danger">Delete</button>
        </div>`;
    });

    listBox.innerHTML = htmlCode;
}

function deleteTask(index) {
    let todo = localStorage.getItem("todo");
    tasks = JSON.parse(todo);
    tasks.splice(index, 1);
    localStorage.setItem("todo", JSON.stringify(tasks));

    displayTask();
}

function editTask(index) {
    saveIndex.value = index;
    let todo = localStorage.getItem("todo");
    tasks = JSON.parse(todo);
    text.value = tasks[index];
    addTaskBtn.style.display = "none";
    saveTaskBtn.style.display = "block";
}

saveTaskBtn.addEventListener("click", () => {
    let todo = localStorage.getItem("todo");
    tasks = JSON.parse(todo);
    let id = saveIndex.value;
    tasks[id] = text.value;
    addTaskBtn.style.display = "block";
    saveTaskBtn.style.display = "none";
    text.value = "";
    localStorage.setItem("todo", JSON.stringify(tasks));
    displayTask();
})