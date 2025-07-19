function showSection(sectionId) {
  const sections = document.querySelectorAll(".section");
  sections.forEach(section => section.classList.add("hidden"));

  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.remove("hidden");
  }
  // Save Booking Info to localStorage
document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const flight = document.getElementById("flightInput").value;
  const hotel = document.getElementById("hotelInput").value;

  localStorage.setItem("flight", flight);
  localStorage.setItem("hotel", hotel);

  displayBooking();
  this.reset();
});

// Display Booking Info if exists
function displayBooking() {
  const flight = localStorage.getItem("flight");
  const hotel = localStorage.getItem("hotel");

  if (flight || hotel) {
    document.getElementById("savedBooking").innerHTML = `
      <strong>Saved Booking:</strong><br />
      ✈️ Flight: ${flight || "N/A"}<br />
      🏨 Hotel: ${hotel || "N/A"}
    `;
  }
}

// Show saved booking when app loads
window.onload = function () {
  displayBooking();
};
// Save and show user name
function saveUserName() {
  const name = document.getElementById("userName").value.trim();
  if (name) {
    localStorage.setItem("username", name);
    showWelcomeMessage();
  }
}

function showWelcomeMessage() {
  const name = localStorage.getItem("username");
  if (name) {
    document.getElementById("userPrompt").style.display = "none";
    const welcome = document.getElementById("welcomeMessage");
    welcome.textContent = `Welcome, ${name}! Ready to plan your next journey? ✈️`;
    welcome.style.display = "block";
  }
}

// Show welcome if name already exists
window.onload = function () {
  displayBooking();
  showWelcomeMessage();
};
// Packing List Functions
const defaultItems = ["Passport", "Clothes", "Toothbrush", "Phone Charger", "Travel Documents"];

function loadPackingList() {
  const savedList = JSON.parse(localStorage.getItem("packingList")) || defaultItems.map(item => ({ name: item, checked: false }));
  displayPackingList(savedList);
}

function displayPackingList(items) {
  const list = document.getElementById("packingList");
  list.innerHTML = "";

  items.forEach((item, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.checked;
    checkbox.onchange = () => {
      items[index].checked = checkbox.checked;
      savePackingList(items);
    };

    const span = document.createElement("span");
    span.textContent = item.name;
    if (item.checked) {
      span.style.textDecoration = "line-through";
    }

    checkbox.onchange = () => {
      items[index].checked = checkbox.checked;
      savePackingList(items);
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    list.appendChild(li);
  });
}

function savePackingList(items) {
  localStorage.setItem("packingList", JSON.stringify(items));
  displayPackingList(items);
}

function addPackingItem() {
  const newItem = document.getElementById("newItem").value.trim();
  if (newItem) {
    const items = JSON.parse(localStorage.getItem("packingList")) || [];
    items.push({ name: newItem, checked: false });
    savePackingList(items);
    document.getElementById("newItem").value = "";
  }
}

// Call packing list when page loads
window.onload = function () {
  displayBooking();
  showWelcomeMessage();
  loadPackingList();
};

}
