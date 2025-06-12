document.addEventListener("DOMContentLoaded", function () {
  /**
   * @description self explantory... this is the main logo for the website...
   * @type {HTMLImageElement}
   */
  const logo = document.querySelector(".logo");

  logo.addEventListener("click", function () {
    location.reload();
  });
});
