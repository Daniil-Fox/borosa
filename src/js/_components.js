import "./components/faq.js";
import "./components/aos.js";
import "./components/before-after.js";
import { initBrowserScroll } from "./components/browser-scroll.js";

// Инициализация скролла браузера
document.addEventListener("DOMContentLoaded", () => {
  // Инициализируем скролл после загрузки DOM
  initBrowserScroll();
});

// Повторная инициализация после полной загрузки страницы
window.addEventListener("load", () => {
  // Повторная инициализация после загрузки всех ресурсов
  initBrowserScroll();
});
