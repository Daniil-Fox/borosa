export const initPortfolioMore = () => {
  const portfolioContainer = document.querySelector(".portfolio__container");
  const moreButton = document.querySelector(".portfolio__more");
  const ITEMS_PER_STEP = 3;
  const INITIAL_ITEMS = 3;
  const MOBILE_BREAKPOINT = 900;

  if (!portfolioContainer || !moreButton) return;

  const portfolioItems =
    portfolioContainer.querySelectorAll(".portfolio__item");
  let visibleItems = INITIAL_ITEMS;

  // Функция для обновления видимости элементов
  const updateItemsVisibility = () => {
    // Проверяем ширину экрана
    if (window.innerWidth <= MOBILE_BREAKPOINT) {
      portfolioItems.forEach((item, index) => {
        if (index < visibleItems) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });

      // Обновляем текст кнопки
      if (visibleItems >= portfolioItems.length) {
        moreButton.textContent = "Свернуть";
      } else {
        moreButton.textContent = "Показать ещё";
      }
    } else {
      // На десктопе показываем все элементы
      portfolioItems.forEach((item) => {
        item.style.display = "";
      });
    }
  };

  // Инициализация начального состояния
  updateItemsVisibility();

  // Обработчик клика по кнопке
  moreButton.addEventListener("click", () => {
    if (window.innerWidth <= MOBILE_BREAKPOINT) {
      if (visibleItems >= portfolioItems.length) {
        // Если все элементы видимы - сворачиваем до начального количества
        visibleItems = INITIAL_ITEMS;
      } else {
        // Добавляем следующую порцию элементов
        visibleItems = Math.min(
          visibleItems + ITEMS_PER_STEP,
          portfolioItems.length
        );
      }
      updateItemsVisibility();
    }
  });

  // Обработчик изменения размера окна
  window.addEventListener("resize", () => {
    updateItemsVisibility();
  });
};
