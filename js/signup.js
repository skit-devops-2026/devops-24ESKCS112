/* ============================================================
   TravelX - signup.js
   Signup form validation, show/hide password, terms checkbox
   check, and demo submit on signup.html. Depends on common.js
   for isValidEmail() and initPasswordToggle().
   ============================================================ */

function initSignupForm() {
  document.getElementById("signupForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirm = document.getElementById("signupConfirm").value;
    const termsAccepted = document.getElementById("signupTerms").checked;
    let valid = true;

    document.getElementById("signupNameError").textContent = "";
    document.getElementById("signupEmailError").textContent = "";
    document.getElementById("signupPasswordError").textContent = "";
    document.getElementById("signupConfirmError").textContent = "";
    document.getElementById("signupTermsError").textContent = "";

    if (name.length < 2) { document.getElementById("signupNameError").textContent = "Enter your full name"; valid = false; }
    if (!isValidEmail(email)) { document.getElementById("signupEmailError").textContent = "Enter a valid email address"; valid = false; }
    if (password.length < 6) { document.getElementById("signupPasswordError").textContent = "Password must be at least 6 characters"; valid = false; }
    if (confirm !== password) { document.getElementById("signupConfirmError").textContent = "Passwords do not match"; valid = false; }
    if (!termsAccepted) { document.getElementById("signupTermsError").textContent = "Please accept the Terms and Conditions"; valid = false; }
    if (!valid) return;

    const btn = document.getElementById("signupSubmit");
    btn.disabled = true;
    btn.textContent = "Creating account...";
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = "Create Account";
      window.location.href = "dashboard.html";
    }, 1000);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initSignupForm();
  initPasswordToggle(document.getElementById("signupPasswordToggle"), document.getElementById("signupPassword"));
  initPasswordToggle(document.getElementById("signupConfirmToggle"), document.getElementById("signupConfirm"));
});
