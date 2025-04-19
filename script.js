let meds = JSON.parse(localStorage.getItem("chewie_meds")) || [];

function updateGreeting() {
  const hour = new Date().getHours();
  const greeting = document.getElementById("greeting");
  if (hour >= 5 && hour < 12) greeting.textContent = "Good Morning";
  else if (hour >= 12 && hour < 18) greeting.textContent = "Good Afternoon";
  else greeting.textContent = "Good Evening";
}
updateGreeting();

function switchTab(id) {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.remove("active");
    tab.classList.add("hidden");
  });
  const target = document.getElementById(id);
  target.classList.remove("hidden");
  target.classList.add("active");
  if (id === "tracker") renderLogs();
  if (id === "profile") updateProfile();
}

const form = document.getElementById("medicine-form");
const logContainer = document.getElementById("log-container");

form.addEventListener("submit", e => {
  e.preventDefault();
  const med = {
    name: document.getElementById("med-name").value,
    dosage: document.getElementById("med-dosage").value,
    frequency: document.getElementById("med-frequency").value,
    timing: document.getElementById("med-timing").value,
    meal: document.getElementById("meal-timing").value,
    duration: document.getElementById("med-duration").value,
    startDate: document.getElementById("med-start-date").value,
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
  form.reset();
  renderLogs();
});

function renderLogs() {
  logContainer.innerHTML = "";
  meds.forEach((med, index) => {
    const card = document.createElement("div");
    card.className = "log-card";
    card.innerHTML = `
      <h4>${med.name} ${med.finished ? '✅' : ''}</h4>
      ${med.dosage} • ${med.frequency}x/day • ${med.timing}, ${med.meal} meal<br>
      ${med.duration} days starting ${med.startDate}
      <div class="log-actions">
        <button onclick="editMed(${index})">✏️ Edit</button>
        <button onclick="deleteMed(${index})">🗑️ Delete</button>
        <button onclick="finishMed(${index})">✅ Finish</button>
      </div>
    `;
    logContainer.appendChild(card);
  });
}

function editMed(index) {
  const med = meds[index];
  document.getElementById("med-name").value = med.name;
  document.getElementById("med-dosage").value = med.dosage;
  document.getElementById("med-frequency").value = med.frequency;
  document.getElementById("med-timing").value = med.timing;
  document.getElementById("meal-timing").value = med.meal;
  document.getElementById("med-duration").value = med.duration;
  document.getElementById("med-start-date").value = med.startDate;
  document.getElementById("edit-index").value = index;
  switchTab("tracker");
}

function deleteMed(index) {
  if (confirm("Delete this medicine?")) {
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
