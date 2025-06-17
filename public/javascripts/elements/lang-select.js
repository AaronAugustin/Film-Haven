window.movieId = "<%= movieId %>";

function changeLanguage(lang) {
  const movieId = window.movieId;
  const currentPath = window.location.pathname;

  if (lang === "es")
    window.location.href = `/region/${lang}/pelicula/${movieId}`;
  else return; // returns default language (english)

  window.location.href = `/region/${lang}${currentPath}`;
}

document.addEventListener("DOMContentLoaded", function () {
  const saved_language = localStorage.getItem("selectedLanguage");

  if (saved_language) {
    const curPath = window.location.pathname;
    if (!curPath.includes(`/region/${saved_language}`))
      window.location.href = `/region/${saved_language}${curPath}`;
  }
});
