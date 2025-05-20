const tabs = document.querySelectorAll(".team__tab");

if (tabs.length > 0) {
  const tabsContent = document.querySelectorAll(".team__slider");

  tabs.forEach((el) => {
    el.addEventListener("click", (e) => {
      if (el.classList.contains("active")) return;
      tabs.forEach((t) => t.classList.remove("active"));
      tabsContent.forEach((t) => t.classList.remove("active"));

      const dataset = el.dataset.tab;
      el.classList.add("active");
      document
        .querySelector(`.team__slider[data-team-tab=${dataset}]`)
        .classList.add("active");
    });
  });
}
