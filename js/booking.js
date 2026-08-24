/* ============================================================
   TravelX - booking.js
   Two-step booking form, dummy payment, and live summary card on
   booking.html. Waits for destinations.json to load before
   rendering the summary card, since price/name/image all come
   from the selected destination.
   ============================================================ */

/* Local page state (only needed on booking.html) */
let bookingTravelers = 2;
let bookingDestination = null;

function renderBookingSummary(destinationsList) {
  const d = destinationsList.find((x) => x.id === getSelectedPackageId(destinationsList)) || destinationsList[0];
  bookingDestination = d;
  const travelers = bookingTravelers;
  const total = d.price * travelers;

  document.getElementById("bookingTripImage").src = d.image;
  document.getElementById("bookingTripImage").alt = d.name;
  document.getElementById("bookingTripName").textContent = d.name;
  document.getElementById("bookingTripDuration").textContent = d.duration;
  document.getElementById("bookingPricePerPerson").textContent = "₹" + d.price.toLocaleString("en-IN");
  document.getElementById("bookingTravelersCount").textContent = "x " + travelers;
  document.getElementById("bookingTotal").textContent = "₹" + total.toLocaleString("en-IN");
}

function initBookingFlow(destinationsList) {
  const travelersInput = document.getElementById("bookTravelers");
  travelersInput.addEventListener("input", () => {
    bookingTravelers = Math.max(1, Number(travelersInput.value) || 1);
    renderBookingSummary(destinationsList);
  });

  document.getElementById("toStep2").addEventListener("click", () => {
    const name = document.getElementById("bookName").value.trim();
    const email = document.getElementById("bookEmail").value.trim();
    const date = document.getElementById("bookDate").value;
    if (!name || !email || !date) {
      alert("Please fill in your name, email, and travel date to continue.");
      return;
    }
    document.getElementById("bookingStep1").classList.remove("active");
    document.getElementById("bookingStep2").classList.add("active");
    document.getElementById("stepIndicator1").classList.remove("active");
    document.getElementById("stepIndicator2").classList.add("active");
  });

  document.getElementById("backToStep1").addEventListener("click", () => {
    document.getElementById("bookingStep2").classList.remove("active");
    document.getElementById("bookingStep1").classList.add("active");
    document.getElementById("stepIndicator2").classList.remove("active");
    document.getElementById("stepIndicator1").classList.add("active");
  });

  document.getElementById("bookingForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const card = document.getElementById("bookCard").value.trim();
    const expiry = document.getElementById("bookExpiry").value.trim();
    const cvv = document.getElementById("bookCvv").value.trim();
    if (!card || !expiry || !cvv) {
      alert("Please complete the demo payment fields.");
      return;
    }

    const payBtn = document.getElementById("payButton");
    payBtn.disabled = true;
    payBtn.textContent = "Processing...";

    /* Simulate a network request to POST /api/bookings */
    setTimeout(() => {
      const email = document.getElementById("bookEmail").value.trim();
      document.getElementById("bookingSuccessMsg").textContent =
        `Your trip is booked. A confirmation with your itinerary has been sent to ${email}.`;
      document.getElementById("bookingStep2").classList.remove("active");
      document.getElementById("bookingSuccess").classList.add("active");
      payBtn.disabled = false;
      payBtn.textContent = "Pay";
    }, 1200);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  getDestinations()
    .then((destinationsList) => {
      renderBookingSummary(destinationsList);
      initBookingFlow(destinationsList);
    })
    .catch(() => {
      showLoadError(document.querySelector(".booking-layout"));
    });
});
