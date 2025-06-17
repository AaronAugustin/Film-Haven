document.addEventListener("DOMContentLoaded", function () {
  /**
   * @description This is the prototype button that redirects you to the prototype page.
   * @type {HTMLButtonElement}
   */
  const prototype_btn = document.getElementById("prototype-btn");

  if (prototype_btn) {
    prototype_btn.addEventListener("click", function () {
      console.log("Prototype button found") &&
        console.log("Redirecting to prototype page...");
      location.href = "/prototype";
    });
  } else {
    console.error("Prototype button not found") ||
      console.error("Cannot redirect to prototype page...");
  }

  /**
   * @description This is the prototype button that redirects you to the prototype page.
   * @type {HTMLButtonElement}
   */
  const return_btn = document.getElementById("return-btn");

  if (return_btn) {
    return_btn.addEventListener("click", function () {
      console.log("Return button found") &&
        console.log("Redirecting to home page...");
      location.href = "/";
    });
  } else {
    console.error("Return button not found") ||
      console.error("Cannot redirect to home page...");
  }
});
