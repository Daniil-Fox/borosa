export const initServiceCards = () => {
  const serviceItems = document.querySelectorAll(".service-item");
  let wasUserInteraction = false; // Флаг для отслеживания пользовательского взаимодействия

  if (!serviceItems.length) return;

  serviceItems.forEach((item, index) => {
    const moreButton = item.querySelector(".service-item__more");
    const body = item.querySelector(".service-item__body");

    if (!moreButton || !body) return;

    moreButton.addEventListener("click", () => {
      wasUserInteraction = true; // Устанавливаем флаг при клике
      const isExpanded = item.classList.contains("is-open");

      if (isExpanded) {
        item.classList.remove("is-open");
        moreButton.textContent = "Подробнее";
      } else {
        // Сворачиваем все остальные блоки
        serviceItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.classList.contains("is-open")) {
            otherItem.classList.remove("is-open");
            const otherButton = otherItem.querySelector(".service-item__more");
            if (otherButton) {
              otherButton.textContent = "Подробнее";
            }
          }
        });

        item.classList.add("is-open");
        moreButton.textContent = "Свернуть";
      }
    });

    // Автоматически раскрываем второй блок на мобильных устройствах только при первой загрузке
    if (index === 1 && window.innerWidth <= 600 && !wasUserInteraction) {
      item.classList.add("is-open");
      if (moreButton) {
        moreButton.textContent = "Свернуть";
      }
    }
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
      wasUserInteraction = false; // Сбрасываем флаг при переходе на десктоп
    } else {
      // Показываем кнопки на мобильной версии
      serviceItems.forEach((item) => {
        const moreButton = item.querySelector(".service-item__more");
        if (moreButton) {
          moreButton.style.display = "";
        }
      });

      // При переходе на мобильную версию раскрываем второй блок ТОЛЬКО если не было взаимодействия
      if (!wasUserInteraction) {
        const secondItem = serviceItems[1];
        if (secondItem) {
          secondItem.classList.add("is-open");
          const moreButton = secondItem.querySelector(".service-item__more");
          if (moreButton) {
            moreButton.textContent = "Свернуть";
          }
        }
      }
    }
  };

  // Слушаем изменение размера окна
  window.addEventListener("resize", checkWidth);

  // Проверяем при инициализации
  checkWidth();
};
