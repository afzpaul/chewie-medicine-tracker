const form = document.getElementById("medicine-form");
const logContainer = document.getElementById("log-container");
const formSection = document.getElementById("form-section");

let meds = JSON.parse(localStorage.getItem("chewie_meds")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const med = {
    name: document.getElementById("med-name").value,
    dosage: document.getElementById("med-dosage").value,
    frequency: document.getElementById("med-frequency").value,
    timing: document.getElementById("med-timing").value,
    meal: document.getElementById("meal-timing").value,
    duration: document.getElementById("med-duration").value,
    startDate: document.getElementById("med-start-date").value,
    added: new Date().toISOString()
  };

  meds.push(med);
  localStorage.setItem("chewie_meds", JSON.stringify(meds));
  form.reset();
  renderLogs();
  formSection.classList.add("hidden");
});

function renderLogs() {
  logContainer.innerHTML = "";
  const grouped = {};

  meds.forEach((med) => {
    const start = new Date(med.startDate);
    for (let i = 0; i < med.duration; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      const key = date.toISOString().split("T")[0];
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(med);
    }
  });

  Object.keys(grouped).sort().forEach((date) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<h3>${date}</h3>`;

    grouped[date].forEach((med) => {
      const item = document.createElement("p");
      item.innerHTML = `<strong>${med.name}</strong> - ${med.dosage} - ${med.frequency}x/day - ${med.timing}, ${med.meal} meal`;
      card.appendChild(item);
    });

    logContainer.appendChild(card);
  });
}

function openForm() {
  formSection.classList.remove("hidden");
}

function switchTab(tab) {
  if (tab === "home") {
    document.querySelector("#form-section").classList.add("hidden");
    document.querySelector("#main-content").scrollTop = 0;
    document.querySelector(".bottom-nav .nav-btn:nth-child(1)").classList.add("active");
    document.querySelector(".bottom-nav .nav-btn:nth-child(2)").classList.remove("active");
  } else {
    renderLogs();
    document.querySelector(".bottom-nav .nav-btn:nth-child(2)").classList.add("active");
    document.querySelector(".bottom-nav .nav-btn:nth-child(1)").classList.remove("active");
  }
}
