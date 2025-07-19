function showSection(id) {
  const sections = document.querySelectorAll(".section");
  sections.forEach(section => {
    section.style.display = section.id === id ? "block" : "none";
  });
}

function showWelcomeMessage() {
  const name = localStorage.getItem("travelAppUserName");
  if (name) {
    document.getElementById("nameInputContainer").style.display = "none";
    document.getElementById("welcomeMessage").style.display = "block";
    document.getElementById("userDisplayName").textContent = name;
  }
}

document.getElementById("nameForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("username").value;
  localStorage.setItem("travelAppUserName", name);
  showWelcomeMessage();
});

document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const flight = document.getElementById("flightInput").value;
  const hotel = document.getElementById("hotelInput").value;

  localStorage.setItem("flight", flight);
  localStorage.setItem("hotel", hotel);

  displayBooking();
  this.reset();
});

function displayBooking() {
  const flight = localStorage.getItem("flight") || "Not added";
  const hotel = localStorage.getItem("hotel") || "Not added";

  document.getElementById("bookingDisplay").innerHTML = `
    <p><strong>Flight:</strong> ${flight}</p>
    <p><strong>Hotel:</strong> ${hotel}</p>
  `;
}

document.getElementById("packingForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const item = document.getElementById("packingItem").value;
  const items = JSON.parse(localStorage.getItem("packingItems")) || [];
  items.push(item);
  localStorage.setItem("packingItems", JSON.stringify(items));
  document.getElementById("packingItem").value = "";
  displayPackingList(items);
});

function loadPackingList() {
  const items = JSON.parse(localStorage.getItem("packingItems")) || [];
  displayPackingList(items);
}

function displayPackingList(items) {
  const list = document.getElementById("packingList");
  list.innerHTML = "";

  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

window.onload = function () {
  displayBooking();
  showWelcomeMessage();
  loadPackingList();
};
