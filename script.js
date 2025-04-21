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
    frequency: document.getElementById("med-frequency").value,
    meal: document.getElementById("meal-timing").value,
    intakeTime: document.getElementById("intake-time").value,
    duration: document.getElementById("med-duration").value,
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

  const grouped = {};
  meds.forEach((med, index) => {
    if (!grouped[med.date]) grouped[med.date] = { morning: [], night: [] };
    if (med.intakeTime === "morning") grouped[med.date].morning.push({ ...med, index });
    else if (med.intakeTime === "night") grouped[med.date].night.push({ ...med, index });
    else {
      grouped[med.date].morning.push({ ...med, index });
      grouped[med.date].night.push({ ...med, index });
    }
  });

  Object.keys(grouped).sort().reverse().forEach(date => {
    const section = document.createElement("div");
    section.className = "log-card";
    section.innerHTML = `<h4>${date}</h4>`;

    ["morning", "night"].forEach(period => {
      if (grouped[date][period].length > 0) {
        section.innerHTML += `<strong>${period.toUpperCase()}</strong><br>`;
        grouped[date][period].forEach(med => {
          section.innerHTML += `
            ✅ ${med.time} – ${med.name} – ${med.dosage} – ${med.frequency}x/day – ${med.meal} meal (${med.duration}d)<br>
            <div class="log-actions">
              <button onclick="editMed(${med.index})">✏️</button>
              <button onclick="deleteMed(${med.index})">🗑️</button>
              <button onclick="toggleFinish(${med.index})">${med.finished ? "↩️ Undo" : "✅ Done"}</button>
            </div>
            <br>
          `;
        });
      }
    });

    container.appendChild(section);
  });
}

function editMed(index) {
  const m = meds[index];
  document.getElementById("med-name").value = m.name;
  document.getElementById("med-dosage").value = m.dosage;
  document.getElementById("med-frequency").value = m.frequency;
  document.getElementById("meal-timing").value = m.meal;
  document.getElementById("intake-time").value = m.intakeTime;
  document.getElementById("med-duration").value = m.duration;
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
