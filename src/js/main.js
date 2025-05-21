import "./_components.js";
import { burger } from "./functions/burger.js";
const solItems = document.querySelectorAll(".solution__item");

if (solItems.length > 0) {
  if (solItems.length % 3 == 1) {
    solItems[solItems.length - 1].classList.add("solution__item--mt");
  }
}
