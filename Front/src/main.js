const API_URL = "http://127.0.0.1:3000/tasks";

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear(); 
    return `${day}/${month}/${year}`; 
}

async function loadTasks() {
  const response = await fetch(API_URL);
  const tasks = await response.json();
  console.log(tasks)
  const tableBody = document.getElementById("task-table-body");
  tableBody.innerHTML = "";

  tasks.forEach(task => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${getStatusLabel(task.status)}</td>
      <td>${task.title}</td>
      <td>${Number(task.date) ? formatDate(task.date) : task.date}</td>
      <td>
        <button class="btn btn-edit" onclick="editTask(${task.id})">Editar</button>
        <button class="btn btn-delete" onclick="deleteTask(${task.id})">Excluir</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

async function addTask() {
  const title = document.getElementById("task-title").value;
  const description = document.getElementById("task-description").value;
  const status = document.getElementById("task-status").value;
  date = new Date().getTime();

  if (!title || !description || !status) {
    alert("Preencha todos os campos!");
    return;
  }

  const newTask = { title, date, description, status: parseInt(status), id: Date.now() };

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTask),
  });

  document.getElementById("task-title").value = "";
  document.getElementById("task-description").value = "";
  document.getElementById("task-status").value = "0";

  loadTasks();
}

async function editTask(id) {
  const title = prompt("Novo título da tarefa:");
  const status = prompt("Novo status (0: Pendente, 1: Andamento, 2: Concluído):");

  if (!title || status === null) {
    alert("Todos os campos devem ser preenchidos!");
    return;
  }

  const updatedTask = { title, date, status: parseInt(status) };

  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTask),
  });

  loadTasks();
}

async function deleteTask(id) {
    id = id.toString() + '.0';
  if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadTasks();
  }
}

function getStatusLabel(status) {
  const statusLabels = {
    0: "Pendente",
    1: "Andamento",
    2: "Concluído",
  };
  return statusLabels[status];
}

loadTasks();