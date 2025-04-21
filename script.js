// script.js
let meds = JSON.parse(localStorage.getItem("chewie_meds") || "[]");

function switchScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (id === "home") renderLogs();
}

document.getElementById("medicine-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const entry = {
    name: document.getElementById("med-name").value,
    dosage: document.getElementById("med-dosage").value,
    date: document.getElementById("med-date").value,
    time: document.getElementById("med-time").value
  };
  meds.push(entry);
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
    card.innerHTML = `<strong>${med.name}</strong><br>${med.dosage}<br>${med.date} ${med.time}`;
    container.appendChild(card);
  });
}
