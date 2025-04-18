<<<<<<< HEAD
const form = document.getElementById("medicine-form");
const container = document.getElementById("weekly-logs");

let baseDate = null;
let weekGroups = {};
let data = JSON.parse(localStorage.getItem("chewie_logs")) || [];

if (data.length > 0) {
  baseDate = new Date(data[0].date);
  data.forEach(entry => renderEntry(entry));
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const entry = {
    date: document.getElementById("med-date").value,
    time: document.getElementById("med-time").value,
    name: document.getElementById("med-name").value,
    dose: document.getElementById("med-dose").value,
    notes: document.getElementById("med-notes").value
  };

  if (!baseDate) baseDate = new Date(entry.date);
  data.push(entry);
  localStorage.setItem("chewie_logs", JSON.stringify(data));

  renderEntry(entry);
  form.reset();
});

function renderEntry(entry) {
  const today = new Date();
  const entryDate = new Date(entry.date);
  const weekNum = getWeekNumber(baseDate, entryDate);
  const currentWeekNum = getWeekNumber(baseDate, today);

  if (weekNum < currentWeekNum) {
    insertIntoWeekGroup(weekNum, entryDate, entry);
  } else {
    insertAsDailyCard(entry);
  }
}

function insertAsDailyCard(entry) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("week-section");

  const ul = document.createElement("ul");
  ul.classList.add("log-list");

  const li = createListItem(entry);
  ul.appendChild(li);
  wrapper.appendChild(ul);
  container.appendChild(wrapper);
}

function insertIntoWeekGroup(weekNum, entryDate, entry) {
  const weekKey = `week${weekNum}`;

  if (!weekGroups[weekKey]) {
    const start = new Date(baseDate);
    start.setDate(start.getDate() + (weekNum - 1) * 7);

    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    const label = `Week ${weekNum} (${formatDate(start)} – ${formatDate(end)})`;

    const h3 = document.createElement("h3");
    h3.textContent = label;
    h3.classList.add("collapsible");
    h3.addEventListener("click", () => {
      h3.classList.toggle("closed");
    });

    const section = document.createElement("div");
    section.classList.add("week-section");

    const ul = document.createElement("ul");
    ul.classList.add("log-list");
    ul.id = weekKey;

    section.appendChild(h3);
    section.appendChild(ul);
    container.appendChild(section);

    weekGroups[weekKey] = ul;
  }

  const li = createListItem(entry);
  weekGroups[weekKey].appendChild(li);
}

function createListItem(entry) {
  const li = document.createElement("li");
  li.innerHTML = `
    <strong>${entry.name}</strong><br />
    📅 ${entry.date} 🕒 ${entry.time} <br />
    ${entry.dose ? `💊 ${entry.dose}<br />` : ''}
    📝 ${entry.notes || 'None'}
    <button class="delete-btn">Delete</button>
  `;
  li.querySelector(".delete-btn").addEventListener("click", () => {
    li.remove();
    data = data.filter(d => !(d.date === entry.date && d.time === entry.time && d.name === entry.name));
    localStorage.setItem("chewie_logs", JSON.stringify(data));
  });
  return li;
}

function getWeekNumber(base, current) {
  const msPerDay = 1000 * 60 * 60 * 24;
  const diff = Math.floor((current - base) / msPerDay);
  return Math.floor(diff / 7) + 1;
}

function formatDate(dateObj) {
  const options = { month: "long", day: "numeric" };
  return dateObj.toLocaleDateString("en-US", options);
}
=======
const form = document.getElementById("medicine-form");
const container = document.getElementById("weekly-logs");

let baseDate = null;
let weekGroups = {};
let data = JSON.parse(localStorage.getItem("chewie_logs")) || [];

if (data.length > 0) {
  baseDate = new Date(data[0].date);
  data.forEach(entry => renderEntry(entry));
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const entry = {
    date: document.getElementById("med-date").value,
    time: document.getElementById("med-time").value,
    name: document.getElementById("med-name").value,
    dose: document.getElementById("med-dose").value,
    notes: document.getElementById("med-notes").value
  };

  if (!baseDate) baseDate = new Date(entry.date);
  data.push(entry);
  localStorage.setItem("chewie_logs", JSON.stringify(data));

  renderEntry(entry);
  form.reset();
});

function renderEntry(entry) {
  const today = new Date();
  const entryDate = new Date(entry.date);
  const weekNum = getWeekNumber(baseDate, entryDate);
  const currentWeekNum = getWeekNumber(baseDate, today);

  if (weekNum < currentWeekNum) {
    insertIntoWeekGroup(weekNum, entryDate, entry);
  } else {
    insertAsDailyCard(entry);
  }
}

function insertAsDailyCard(entry) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("week-section");

  const ul = document.createElement("ul");
  ul.classList.add("log-list");

  const li = createListItem(entry);
  ul.appendChild(li);
  wrapper.appendChild(ul);
  container.appendChild(wrapper);
}

function insertIntoWeekGroup(weekNum, entryDate, entry) {
  const weekKey = `week${weekNum}`;

  if (!weekGroups[weekKey]) {
    const start = new Date(baseDate);
    start.setDate(start.getDate() + (weekNum - 1) * 7);

    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    const label = `Week ${weekNum} (${formatDate(start)} – ${formatDate(end)})`;

    const h3 = document.createElement("h3");
    h3.textContent = label;
    h3.classList.add("collapsible");
    h3.addEventListener("click", () => {
      h3.classList.toggle("closed");
    });

    const section = document.createElement("div");
    section.classList.add("week-section");

    const ul = document.createElement("ul");
    ul.classList.add("log-list");
    ul.id = weekKey;

    section.appendChild(h3);
    section.appendChild(ul);
    container.appendChild(section);

    weekGroups[weekKey] = ul;
  }

  const li = createListItem(entry);
  weekGroups[weekKey].appendChild(li);
}

function createListItem(entry) {
  const li = document.createElement("li");
  li.innerHTML = `
    <strong>${entry.name}</strong><br />
    📅 ${entry.date} 🕒 ${entry.time} <br />
    ${entry.dose ? `💊 ${entry.dose}<br />` : ''}
    📝 ${entry.notes || 'None'}
    <button class="delete-btn">Delete</button>
  `;
  li.querySelector(".delete-btn").addEventListener("click", () => {
    li.remove();
    data = data.filter(d => !(d.date === entry.date && d.time === entry.time && d.name === entry.name));
    localStorage.setItem("chewie_logs", JSON.stringify(data));
  });
  return li;
}

function getWeekNumber(base, current) {
  const msPerDay = 1000 * 60 * 60 * 24;
  const diff = Math.floor((current - base) / msPerDay);
  return Math.floor(diff / 7) + 1;
}

function formatDate(dateObj) {
  const options = { month: "long", day: "numeric" };
  return dateObj.toLocaleDateString("en-US", options);
}
>>>>>>> 29491ddaba619918281625bc9bc90bc7ba2cccae
