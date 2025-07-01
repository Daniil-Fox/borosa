export const initBrowserScroll = () => {
  // Находим элемент с атрибутом data-auto-scroll="true"
  const browserContentContainer = document.querySelector(
    '.browser-content[data-auto-scroll="true"]'
  );
  if (!browserContentContainer) {
    console.log(
      'Контейнер .browser-content[data-auto-scroll="true"] не найден'
    );
    return;
  }

  const browserContent = browserContentContainer.querySelector(
    ".browser-content__body"
  );
  if (!browserContent) {
    console.log("Элемент .browser-content__body не найден");
    return;
  }

  // Получаем контейнер с элементами, который будем анимировать
  const itemsContainer = browserContent.querySelector(
    ".browser-content__items"
  );
  if (!itemsContainer) {
    console.log("Элемент .browser-content__items не найден");
    return;
  }

  // Получаем настройки из атрибутов или используем значения по умолчанию
  const scrollDuration =
    parseInt(browserContentContainer.dataset.scrollDuration) || 20000;

  // Идентификатор таймера
  let animationTimer = null;
  // Текущая позиция трансформации
  let currentTransform = 0;

  // Подготавливаем контейнер для анимации
  const prepareContainer = () => {
    // Клонируем содержимое для бесконечной прокрутки
    const items = itemsContainer.querySelectorAll(".browser-content__item");
    const clonedItems = Array.from(items).map((item) => item.cloneNode(true));
    clonedItems.forEach((item) => itemsContainer.appendChild(item));

    // Устанавливаем стили для контейнера
    browserContent.style.overflow = "hidden";
    itemsContainer.style.willChange = "transform";

    // Сбрасываем начальную позицию
    itemsContainer.style.transform = "translateY(0)";

    // Добавляем класс для стилизации
    browserContentContainer.classList.add("transform-scroll");
  };

  // Функция для обновления текущей трансформации без анимации
  const updateTransformWithoutAnimation = (value) => {
    itemsContainer.style.transition = "none";
    itemsContainer.style.transform = `translateY(-${value}px)`;
    currentTransform = value;
    void itemsContainer.offsetHeight;
  };

  // Функция для обновления текущей трансформации с анимацией
  const updateTransformWithAnimation = (value, duration) => {
    itemsContainer.style.transition = `transform ${duration}ms linear`;
    itemsContainer.style.transform = `translateY(-${value}px)`;
    currentTransform = value;
  };

  // Функция для бесконечной анимации скролла
  const startInfiniteScroll = () => {
    clearTimeout(animationTimer);
    browserContentContainer.classList.add("is-scrolling");
    const itemsHeight = itemsContainer.scrollHeight / 2;
    updateTransformWithoutAnimation(0);
    requestAnimationFrame(() => {
      updateTransformWithAnimation(itemsHeight, scrollDuration);
      animationTimer = setTimeout(() => {
        updateTransformWithoutAnimation(0);
        startInfiniteScroll(); // всегда запускаем следующий цикл
      }, scrollDuration);
    });
  };

  // Функция для обработки события transitionend
  const handleTransitionEnd = (e) => {
    if (e.target !== itemsContainer || e.propertyName !== "transform") return;
    console.log("Transition завершен:", e.propertyName);
  };

  // Добавляем обработчик события завершения анимации
  itemsContainer.addEventListener("transitionend", handleTransitionEnd);

  // Инициализация анимации
  const init = () => {
    console.log("Инициализация бесконечной анимации скролла");
    prepareContainer();
    // Запускаем анимацию с небольшой задержкой
    setTimeout(() => {
      startInfiniteScroll();
    }, 500);
  };

  // Запускаем инициализацию
  init();

  // При изменении размера окна
  window.addEventListener("resize", () => {
    if (animationTimer) {
      clearTimeout(animationTimer);
    }
    console.log("Изменение размера окна - перезапуск анимации");
    setTimeout(() => {
      startInfiniteScroll();
    }, 200);
  });
};
