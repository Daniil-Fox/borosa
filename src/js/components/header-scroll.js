let lastScroll = 0;
const defaultOffset = 200;
const header = document.querySelector(".header");
const siteContainer = document.querySelector(".site-container");

function handleScroll() {
  const currentScroll = window.pageYOffset;
  const isInitialPosition = currentScroll < defaultOffset;
  const isScrollingUp = currentScroll < lastScroll;

  // Если мы в начальной позиции
  if (isInitialPosition) {
    // Возвращаем изначальное состояние
    header.classList.remove("header--scrolled");
    header.classList.remove("header--hidden");
    header.classList.remove("header--dark");
    siteContainer.style.paddingTop = null;
    // Восстанавливаем изначальное position
    header.style.position = null;
  }
  // Если скроллим вверх и не в начальной позиции
  else if (isScrollingUp) {
    header.classList.remove("header--hidden");
    header.classList.add("header--scrolled");
    header.classList.contains("header--sec")
      ? (siteContainer.style.paddingTop = header.clientHeight + "px")
      : null;
    // Добавляем темный класс если его нет
    if (!header.classList.contains("header--dark")) {
      header.classList.add("header--dark");
    }
  }
  // Если скроллим вниз и не в начальной позиции
  else {
    header.classList.add("header--hidden");
  }

  lastScroll = currentScroll;
}

// Используем throttle для оптимизации производительности
let timeout;
window.addEventListener("scroll", () => {
  handleScroll();
});
