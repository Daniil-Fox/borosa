import { Panzoom } from "@fancyapps/ui";
const containers = document.querySelectorAll(".f-panzoom");
const options = { minScale: 1, maxScale: 4, wheelAction: false };
containers.forEach((el) => {
  Panzoom(el, options).init();
});
