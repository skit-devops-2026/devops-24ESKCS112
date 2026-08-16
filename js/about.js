/* ============================================================
   TravelX - about.js
   Renders the team grid on about.html.
   Depends on common.js (must be loaded first for shared data,
   render helpers, and localStorage-based selected-package state).
   ============================================================ */

/* ---------- 11. About page team render ---------- */

function renderAbout() {
  document.getElementById("teamGrid").innerHTML = team.map(teamCard).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderAbout();
});

