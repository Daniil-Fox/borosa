import "./components/faq.js";
import "./components/aos.js";
import "./components/before-after.js";
import "./components/slider.js";
import "./components/tabs.js";
import "./components/header-scroll.js";
import { initBrowserScroll } from "./components/browser-scroll.js";

document.addEventListener("DOMContentLoaded", () => {
  initBrowserScroll();
});

window.addEventListener("load", () => {
  initBrowserScroll();
});
