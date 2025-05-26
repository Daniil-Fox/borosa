import "./_components.js";
import { burger } from "./functions/burger.js";
import { initPortfolioMore } from "./components/portfolio.js";
import { initServiceCards } from "./components/service.js";
import { initModals } from "./modules/modals.js";
import { initTooltips } from "./components/tooltips.js";
import { initPortfolioModals } from "./modules/portfolio-modals.js";
import { initBaseModals } from "./modules/base-modals.js";

const solItems = document.querySelectorAll(".solution__item");

if (solItems.length > 0) {
  if (solItems.length % 3 == 1) {
    solItems[solItems.length - 1].classList.add("solution__item--mt");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initPortfolioMore();
  initServiceCards();
  initModals();
  initTooltips();
  initPortfolioModals();
  initBaseModals();
});
