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

}
