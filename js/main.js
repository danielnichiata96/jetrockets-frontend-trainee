// Progressive enhancement for the Create account form.
//
// This is a static demo with no backend, so submitting to POST /users would
// 404 on GitHub Pages. Instead we let the browser run its native validation
// (the inputs carry `required`/`minlength`) and, once the form is valid,
// intercept the submit to show a confirmation. A real Rails app would let this
// POST through to UsersController#create.

(() => {
  "use strict";

  const form = document.querySelector(".form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    // Stop the navigation to /users; the browser has already enforced the
    // field constraints by the time a submit event fires.
    event.preventDefault();

    let note = form.querySelector(".form__note");
    if (!note) {
      note = document.createElement("p");
      note.className = "form__note";
      note.setAttribute("role", "status");
      form.appendChild(note);
    }
    note.textContent =
      "Thanks! This is a static demo — no account was created.";
    form.reset();
  });
})();
