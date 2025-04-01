const API_URL = "http://127.0.0.1:3000/tasks";

function formatarData(timestamp) {
  const date = new Date(timestamp); 
  const day = String(date.getDate()).padStart(2, '0'); 
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = date.getFullYear(); 
  return `${day}/${month}/${year}`; 
}


async function carregarTarefas() {
  const response = await fetch(API_URL);
  const tasks = await response.json();
  console.log(tasks)
  const tableBody = document.getElementById("task-table-body");
  tableBody.innerHTML = "";

  
  tasks.forEach(task => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${statusTarefa(task.status)}</td>
      <td>${(task.desc)}</td>
      <td>${task.title}</td>
      <td>${Number(task.date) ? formatarData(task.date) : task.date}</td>
      <td>
        <button class="btn btn-edit" onclick="editarTarefa(${task.id})">Editar</button>
        <button class="btn btn-delete" onclick="apagarTarefa(${task.id})">Excluir</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

async function adicionarTarefa() {
  const nome = document.getElementById("task-title").value;
  const status = document.getElementById("task-status").value;
  const desc = document.getElementById("task-description").value;

  date = new Date().getTime();
  date = formatarData(date);

  if (!nome) {
    alert("Preencha todos os campos!");
    return;
  }

  const newTask = { title: nome, desc, date, status: parseInt(status), id: Date.now() };

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTask),
  });

  document.getElementById("task-title").value = "";
  document.getElementById("task-date").value = "";
  document.getElementById("task-status").value = "0";

  carregarTarefas();
}

async function editarTarefa(id) {
  const title = prompt("Novo título da tarefa:");
  const desc = prompt("Nova descrição da tarefa:");
  const status = prompt("Novo status (0: Pendente, 1: Andamento, 2: Concluído):");

  if (!title || !desc || status === null) {
    alert("Todos os campos devem ser preenchidos!");
    return;
  }
  
  id = id.toString() + '.0';

  const updatedTask = { title, desc, status: parseInt(status) };

  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTask),
  });


  carregarTarefas();
}

async function apagarTarefa(id) {
    id = id.toString() + '.0';
  if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    carregarTarefas();
  }
}

function statusTarefa(status) {
  const statusLabels = {
    0: "Pendente",
    1: "Andamento",
    2: "Concluído",
  };
  return statusLabels[status];
}

carregarTarefas();