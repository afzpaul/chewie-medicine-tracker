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

  meds.push(med);
  localStorage.setItem("chewie_meds", JSON.stringify(meds));
  form.reset();
  renderLogs();
});

function renderLogs() {
  logContainer.innerHTML = "";

  const today = new Date().toISOString().split("T")[0];
  meds.forEach(med => {
    const start = new Date(med.startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + med.duration - 1);

    const logBox = document.createElement("div");
    logBox.className = "log-entry";
    logBox.innerHTML = `
      <strong>${med.name}</strong> (${med.dosage})<br>
      Taken ${med.frequency}x/day - ${med.timing}, ${med.meal} meal<br>
      Duration: ${med.duration} day(s)<br>
      ${med.startDate} to ${end.toISOString().split("T")[0]}
    `;
    logContainer.appendChild(logBox);
  });
}

renderLogs();
