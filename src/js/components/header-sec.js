const headerSec = document.querySelector(".header--sec");

if (headerSec) {
  const nav = headerSec.querySelector(".header__nav");

  if (nav) {
    const navLinks = nav.querySelectorAll(".menu-item-has-children");

    navLinks.forEach((link) => {
      const list = link.querySelector(".sub-menu");
      link.addEventListener("mouseenter", (e) => {
        e.preventDefault();
        list.classList.add("active");
        link.classList.add("active");
        list.style.maxHeight = list.scrollHeight + "px";
      });

      link.addEventListener("mouseleave", (e) => {
        e.preventDefault();
        list.classList.remove("active");
        link.classList.remove("active");
        list.style.maxHeight = "0";
      });
    });
  }
}
