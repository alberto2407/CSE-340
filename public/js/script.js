document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".account-form");
  const password = document.getElementById("account_password");
  const confirmPassword = document.getElementById("account_confirmPassword");
  const noMatch = document.getElementById("noMatchPassword");
  const match = document.getElementById("matchPassword");
  const toggles = document.querySelectorAll(".toggle-password");

  toggles.forEach(toggle => {
    toggle.addEventListener("click", function () {
      const targetSelector = this.getAttribute("data-toggle");
      const input = document.querySelector(targetSelector);
      const isVisible = input.type === "text";
      input.type = isVisible ? "password" : "text";
      this.textContent = isVisible ? "👁️" : "🙈";
    });
  });

  if (form && password && confirmPassword && noMatch && match) {
    form.addEventListener("submit", function (event) {
      if (password.value !== confirmPassword.value) {
        event.preventDefault();
        noMatch.style.display = "block";
        match.style.display = "none";
      } else {
        noMatch.style.display = "none";
        match.style.display = "block";
      }
    });

    confirmPassword.addEventListener("input", function () {
      if (confirmPassword.value !== password.value) {
        noMatch.style.display = "block";
        match.style.display = "none";
      } else if (confirmPassword.value.length > 0) {
        noMatch.style.display = "none";
        match.style.display = "block";
      } else {
        noMatch.style.display = "none";
        match.style.display = "none";
      }
    });
  }

  // Hide flash messages after 5 seconds
  setTimeout(() => {
    const notices = document.querySelectorAll('.notice, .flash-message')
    notices.forEach(el => el.style.display = 'none')
  }, 5000)

});