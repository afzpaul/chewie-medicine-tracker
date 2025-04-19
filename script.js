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

      grouped[dateKey].push({ ...med, day: dateKey, index });
    }
  });

  Object.keys(grouped).sort().forEach(day => {
    const daySection = document.createElement("div");
    daySection.className = "log-entry";

    const title = document.createElement("h3");
    title.textContent = `Date: ${day}`;
    daySection.appendChild(title);

    const morningList = document.createElement("ul");
    const nightList = document.createElement("ul");

    grouped[day].forEach(med => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${med.name}</strong> (${med.dosage})<br>
        ${med.frequency}x/day - ${med.meal} meal (${med.timing})
        <button class="edit-btn" onclick="editMedicine(${med.index})">Edit</button>
      `;
      if (med.timing === "morning" || med.timing === "both") {
        morningList.appendChild(li.cloneNode(true));
      }
      if (med.timing === "night" || med.timing === "both") {
        nightList.appendChild(li);
      }
    });

    if (morningList.children.length > 0) {
      const morningLabel = document.createElement("strong");
      morningLabel.textContent = "Morning:";
      daySection.appendChild(morningLabel);
      daySection.appendChild(morningList);
    }

    if (nightList.children.length > 0) {
      const nightLabel = document.createElement("strong");
      nightLabel.textContent = "Night:";
      daySection.appendChild(nightLabel);
      daySection.appendChild(nightList);
    }

    logContainer.appendChild(daySection);
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
