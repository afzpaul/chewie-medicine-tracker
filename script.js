let meds = JSON.parse(localStorage.getItem("chewie_meds")) || [];

function switchScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (id === "tracker") renderLogs();
  if (id === "profile") updateProfile();
}

const form = document.getElementById("medicine-form");
form.addEventListener("submit", e => {
  e.preventDefault();
  const newMed = {
    name: document.getElementById("med-name").value,
    dosage: document.getElementById("med-dosage").value,
    date: document.getElementById("med-date").value,
    time: document.getElementById("med-time").value,
    finished: false
  };

  const editIndex = document.getElementById("edit-index").value;
  if (editIndex !== "") {
    meds[editIndex] = newMed;
    document.getElementById("edit-index").value = "";
  } else {
    meds.push(newMed);
  }

  localStorage.setItem("chewie_meds", JSON.stringify(meds));
  form.reset();
  renderLogs();
});

function renderLogs() {
  const container = document.getElementById("log-container");
  container.innerHTML = "";
  meds.forEach((med, index) => {
    const card = document.createElement("div");
    card.className = "log-card";
    card.innerHTML = `
      <h4>${med.name} ${med.finished ? '✅' : ''}</h4>
      <div>${med.dosage}</div>
      <div>${med.date} @ ${med.time}</div>
      <div class="log-actions">
        <button onclick="editMed(${index})">✏️</button>
        <button onclick="deleteMed(${index})">🗑️</button>
        <button onclick="finishMed(${index})">✅</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function editMed(index) {
  const m = meds[index];
  document.getElementById("med-name").value = m.name;
  document.getElementById("med-dosage").value = m.dosage;
  document.getElementById("med-date").value = m.date;
  document.getElementById("med-time").value = m.time;
  document.getElementById("edit-index").value = index;
  switchScreen("tracker");
}

function deleteMed(index) {
  if (confirm("Remove this entry?")) {
    meds.splice(index, 1);
    localStorage.setItem("chewie_meds", JSON.stringify(meds));
    renderLogs();
  }
}

function finishMed(index) {
  meds[index].finished = true;
  localStorage.setItem("chewie_meds", JSON.stringify(meds));
  renderLogs();
}

function updateProfile() {
  document.getElementById("total-meds").textContent = meds.length;
  document.getElementById("finished-meds").textContent = meds.filter(m => m.finished).length;
}
