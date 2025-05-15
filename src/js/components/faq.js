const faqItems = document.querySelectorAll(".faq-item");
if (faqItems.length > 0) {
  faqItems.forEach((item) => {
    const btn = item.querySelector(".faq-item__header");
    const content = item.querySelector(".faq-item__body");
    let isActive = false;
    btn.addEventListener("click", (e) => {
      isActive = item.classList.toggle("active");

      content.style.maxHeight = isActive ? content.scrollHeight + "px" : null;

      faqItems.forEach((el) => {
        if (el != item) {
          el.classList.remove("active");
          el.querySelector(".faq-item__body").style.maxHeight = null;
        }
      });
    });

    if (item.classList.contains("active")) {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}
