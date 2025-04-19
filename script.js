const form = document.getElementById("medicine-form");
const logContainer = document.getElementById("log-container");

let meds = JSON.parse(localStorage.getItem("chewie_meds")) || [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const med = {
    name: document.getElementById("med-name").value,
    dosage: document.getElementById("med-dosage").value,
    frequency: parseInt(document.getElementById("med-frequency").value),
    timing: document.getElementById("med-timing").value,
    meal: document.getElementById("meal-timing").value,
    duration: parseInt(document.getElementById("med-duration").value),
    startDate: document.getElementById("med-start-date").value,
    added: new Date().toISOString()
  };

  const editIndex = document.getElementById("edit-index").value;
  if (editIndex !== "") {
    meds[parseInt(editIndex)] = med;
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
  const grouped = {};

  meds.forEach((med, index) => {
    const start = new Date(med.startDate);
    for (let d = 0; d < med.duration; d++) {
      const date = new Date(start);
      date.setDate(start.getDate() + d);
      const dateKey = date.toISOString().split("T")[0];

      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push({ ...med, index });
    }
  });

  Object.keys(grouped).sort().forEach(day => {
    const card = document.createElement("div");
    card.className = "daily-card";

    const dateLabel = document.createElement("h3");
    dateLabel.textContent = day;
    card.appendChild(dateLabel);

    grouped[day].forEach(med => {
      const block = document.createElement("div");
      block.className = "med-block";
      block.innerHTML = `
        <strong>${med.name}</strong><br>
        ${med.dosage} — ${med.frequency}x/day<br>
        ${med.timing}, ${med.meal} meal
        <br><button class="edit-btn" onclick="editMedicine(${med.index})">Edit</button>
      `;
      card.appendChild(block);
    });

    logContainer.appendChild(card);
  });
}

function editMedicine(index) {
  const med = meds[index];
  document.getElementById("edit-index").value = index;
  document.getElementById("med-name").value = med.name;
  document.getElementById("med-dosage").value = med.dosage;
  document.getElementById("med-frequency").value = med.frequency;
  document.getElementById("med-timing").value = med.timing;
  document.getElementById("meal-timing").value = med.meal;
  document.getElementById("med-duration").value = med.duration;
  document.getElementById("med-start-date").value = med.startDate;
}

renderLogs();
