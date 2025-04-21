let meds = JSON.parse(localStorage.getItem("chewie_meds") || "[]");

function switchScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (id === "home") renderLogs();
  if (id === "profile") updateProfile();
}

document.getElementById("medicine-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const med = {
    name: document.getElementById("med-name").value,
    dosage: document.getElementById("med-dosage").value,
    date: document.getElementById("med-date").value,
    time: document.getElementById("med-time").value,
    finished: false
  };

  const editIndex = document.getElementById("edit-index").value;
  if (editIndex !== "") {
    meds[editIndex] = med;
    document.getElementById("edit-index").value = "";
  } else {
    meds.push(med);
  }

  localStorage.setItem("chewie_meds", JSON.stringify(meds));
  this.reset();
  switchScreen("home");
});

function renderLogs() {
  const container = document.getElementById("log-container");
  container.innerHTML = "";
  meds.forEach((med, index) => {
    const card = document.createElement("div");
    card.className = "log-card";
    card.innerHTML = `
      <strong>${med.name}</strong> ${med.finished ? "✅" : ""}<br>
      ${med.dosage} – ${med.date} @ ${med.time}
      <div class="log-actions">
        <button onclick="editMed(${index})">✏️</button>
        <button onclick="deleteMed(${index})">🗑️</button>
        <button onclick="toggleFinish(${index})">${med.finished ? "↩️ Undo" : "✅ Done"}</button>
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
  switchScreen("track");
}

function deleteMed(index) {
  if (confirm("Are you sure you want to delete this?")) {
    meds.splice(index, 1);
    localStorage.setItem("chewie_meds", JSON.stringify(meds));
    renderLogs();
  }
}

function toggleFinish(index) {
  meds[index].finished = !meds[index].finished;
  localStorage.setItem("chewie_meds", JSON.stringify(meds));
  renderLogs();
}

function updateProfile() {
  document.getElementById("total-meds").textContent = meds.length;
  document.getElementById("finished-meds").textContent = meds.filter(m => m.finished).length;
}
