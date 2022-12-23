window.addEventListener("scroll", () => {
  const links = document.getElementsByTagName("a");
  for (let i = 0; i < links.length; i++) {
    if (window.location.href.includes("twitter.com"))
      if (links[i].href.includes("analytics")) {
        links[i].style.display = "none";
      }
  }
});
