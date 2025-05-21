export const initServiceCards = () => {
  const serviceItems = document.querySelectorAll(".service-item");

  if (!serviceItems.length) return;

  serviceItems.forEach((item) => {
    const moreButton = item.querySelector(".service-item__more");
    const body = item.querySelector(".service-item__body");

    if (!moreButton || !body) return;

    moreButton.addEventListener("click", () => {
      const isExpanded = item.classList.contains("is-open");

      if (isExpanded) {
        item.classList.remove("is-open");
        moreButton.textContent = "Подробнее";
      } else {
        item.classList.add("is-open");
        moreButton.textContent = "Свернуть";
      }
    });
  });

  // Функция для проверки ширины экрана и сброса состояния
  const checkWidth = () => {
    if (window.innerWidth > 600) {
      serviceItems.forEach((item) => {
        item.classList.remove("is-open");
        const moreButton = item.querySelector(".service-item__more");
        if (moreButton) {
          moreButton.style.display = "none";
          moreButton.textContent = "Подробнее";
        }
      });
    }
  };

  // Слушаем изменение размера окна
  window.addEventListener("resize", checkWidth);

  // Проверяем при инициализации
  checkWidth();
};
