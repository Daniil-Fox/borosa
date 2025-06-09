export const initPortfolioMore = () => {
  const portfolioContainer = document.querySelector(".portfolio__container");
  const moreButton = document.querySelector(".portfolio__more");
  const hideButton = document.querySelector(".portfolio__hide");
  const portfolioSection = document.querySelector(".portfolio");
  const ITEMS_PER_STEP = 3;
  const INITIAL_ITEMS = 3;
  const MOBILE_BREAKPOINT = 900;

  if (!portfolioContainer || !moreButton || !hideButton || !portfolioSection)
    return;

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

      // Обновляем состояние кнопок
      if (visibleItems >= portfolioItems.length) {
        moreButton.classList.add("is-hidden");
        hideButton.classList.remove("is-hidden");
      } else if (visibleItems > INITIAL_ITEMS) {
        moreButton.classList.remove("is-hidden");
        hideButton.classList.remove("is-hidden");
      } else {
        moreButton.classList.remove("is-hidden");
        hideButton.classList.add("is-hidden");
      }
    } else {
      // На десктопе показываем все элементы
      portfolioItems.forEach((item) => {
        item.style.display = "";
      });
      // Скрываем обе кнопки на десктопе
      moreButton.classList.remove("is-hidden");
      hideButton.classList.add("is-hidden");
    }
  };

  // Функция для плавной прокрутки к нужной позиции
  const scrollToShowNextSection = () => {
    const nextSection = portfolioSection.nextElementSibling;
    if (!nextSection) return;

    const VISIBLE_PORTFOLIO_PART = 100; // Сколько пикселей оставить видимыми от текущей секции

    // Получаем размеры и позиции элементов
    const portfolioBottom =
      portfolioSection.getBoundingClientRect().bottom + window.scrollY;
    const viewportHeight = window.innerHeight;

    // Вычисляем позицию скролла так, чтобы от текущей секции было видно только 100px
    const scrollPosition =
      portfolioBottom - viewportHeight + VISIBLE_PORTFOLIO_PART;

    window.scrollTo({
      top: scrollPosition,
      behavior: "smooth",
    });
  };

  // Инициализация начального состояния
  updateItemsVisibility();

  // Обработчик клика по кнопке "Показать ещё"
  moreButton.addEventListener("click", () => {
    if (window.innerWidth <= MOBILE_BREAKPOINT) {
      // Добавляем следующую порцию элементов
      visibleItems = Math.min(
        visibleItems + ITEMS_PER_STEP,
        portfolioItems.length
      );
      updateItemsVisibility();
    }
  });

  // Обработчик клика по кнопке "Свернуть"
  hideButton.addEventListener("click", () => {
    if (window.innerWidth <= MOBILE_BREAKPOINT) {
      visibleItems = INITIAL_ITEMS;
      updateItemsVisibility();
      // Добавляем задержку перед скроллом, чтобы DOM успел обновиться
      setTimeout(() => {
        scrollToShowNextSection();
      }, 100);
    }
  });

  // Обработчик изменения размера окна
  window.addEventListener("resize", () => {
    updateItemsVisibility();
  });
};
