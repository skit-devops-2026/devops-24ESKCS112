/* ============================================================
   TravelX - login.js
   Login form validation + demo submit on login.html.
   Depends on common.js (must be loaded first for isValidEmail()).
   ============================================================ */

function initLoginForm() {
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    let valid = true;

    if (!isValidEmail(email)) {
      document.getElementById("loginEmailError").textContent = "Enter a valid email address";
      valid = false;
    } else {
      document.getElementById("loginEmailError").textContent = "";
    }
    if (password.length < 6) {
      document.getElementById("loginPasswordError").textContent = "Password must be at least 6 characters";
      valid = false;
    } else {
      document.getElementById("loginPasswordError").textContent = "";
    }
    if (!valid) return;

    const btn = document.getElementById("loginSubmit");
    btn.disabled = true;
    btn.textContent = "Logging in...";
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = "Log In";
      window.location.href = "dashboard.html";
    }, 1000);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initLoginForm();
});

