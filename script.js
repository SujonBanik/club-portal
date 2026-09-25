/* ============================================
   HAMBURGER MENU (works on both pages)
   ============================================ */
var hamburgerBtn = document.getElementById("hamburgerBtn");
var navLinks = document.getElementById("navLinks");

if (hamburgerBtn) {
  hamburgerBtn.addEventListener("click", function () {
    navLinks.classList.toggle("show");   // adds/removes "show" class from CSS
  });
}

/* ============================================
   FORM VALIDATION (only runs on register.html,
   because myForm only exists on that page)
   ============================================ */
var form = document.getElementById("myForm");

if (form) {
  var result = document.getElementById("result");

  // clears every error message (called at the start of each submit)
  function clearErrors() {
    var ids = ["name", "email", "phone", "password", "confirm", "dob", "club", "gender", "reason", "terms"];
    for (var i = 0; i < ids.length; i++) {
      document.getElementById(ids[i] + "Error").textContent = "";
    }
  }

  // shows an error message under one field
  // field = the field's id (e.g. "name"), message = text to show
  function setError(field, message) {
    document.getElementById(field + "Error").textContent = message;
  }

  // this code runs when the Submit button is clicked
  form.addEventListener("submit", function (e) {
    e.preventDefault();   // stop the page from reloading
    clearErrors();        // remove old error messages
    var ok = true;         // assume everything is fine, set to false if any check fails

    // read all the values typed by the user
    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var phone = document.getElementById("phone").value.trim();
    var password = document.getElementById("password").value;
    var confirm = document.getElementById("confirm").value;
    var dob = document.getElementById("dob").value;
    var club = document.getElementById("club").value;
    var reason = document.getElementById("reason").value.trim();
    var terms = document.getElementById("terms").checked;
    var gender = document.querySelector('input[name="gender"]:checked');

    // 1. REQUIRED FIELD CHECKS (must not be empty)
    if (name == "") { setError("name", "Name is required"); ok = false; }
    if (email == "") { setError("email", "Email is required"); ok = false; }
    if (phone == "") { setError("phone", "Phone is required"); ok = false; }
    if (password == "") { setError("password", "Password is required"); ok = false; }
    if (confirm == "") { setError("confirm", "Please confirm password"); ok = false; }
    if (dob == "") { setError("dob", "Date of birth is required"); ok = false; }
    if (club == "") { setError("club", "Please select a club"); ok = false; }
    if (gender == null) { setError("gender", "Please select gender"); ok = false; }
    if (reason == "") { setError("reason", "This field is required"); ok = false; }
    if (terms == false) { setError("terms", "You must agree to continue"); ok = false; }

    // 2. EMAIL FORMAT CHECK (must contain @ and .)
    if (email != "" && (!email.includes("@") || !email.includes("."))) {
      setError("email", "Enter a valid email (example: name@gmail.com)");
      ok = false;
    }

    // 3. PHONE PATTERN CHECK (11 digits, must start with 01, only numbers)
    if (phone != "" && (phone.length != 11 || !phone.startsWith("01") || isNaN(phone))) {
      setError("phone", "Phone must be 11 digits and start with 01");
      ok = false;
    }

    // 4. PASSWORD LENGTH RULE (at least 8 characters)
    if (password != "" && password.length < 8) {
      setError("password", "Password must be at least 8 characters");
      ok = false;
    }

    // 5. CROSS-FIELD RULE (confirm password must match password)
    if (confirm != "" && confirm != password) {
      setError("confirm", "Passwords do not match");
      ok = false;
    }

    // if everything passed, show the entered data as a summary
    if (ok == true) {
      result.innerHTML =
        "<h5>Registration Successful!</h5>" +
        "Name: " + name + "<br>" +
        "Email: " + email + "<br>" +
        "Phone: " + phone + "<br>" +
        "Date of Birth: " + dob + "<br>" +
        "Club: " + club + "<br>" +
        "Gender: " + gender.value + "<br>" +
        "Reason: " + reason;
      result.classList.remove("hidden");   // "hidden" is our own CSS class, remove it to show
    } else {
      result.classList.add("hidden");      // keep result hidden if there are errors
    }
  });

  // this code runs when the Reset button is clicked
  form.addEventListener("reset", function () {
    clearErrors();
    result.classList.add("hidden");
  });
}
