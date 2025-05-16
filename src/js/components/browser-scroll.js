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
    ".browser-content__wrapper"
  );
  if (!itemsContainer) {
    console.log("Элемент .browser-content__wrapper не найден");
    return;
  }

  // Получаем настройки из атрибутов или используем значения по умолчанию
  const scrollDuration =
    parseInt(browserContentContainer.dataset.scrollDuration) || 8000;
  const pauseDuration =
    parseInt(browserContentContainer.dataset.pauseDuration) || 3000;

  // Флаг паузы анимации
  let isPaused = false;
  // Флаг активности анимации
  let isAnimating = false;
  // Идентификатор таймера
  let animationTimer = null;
  // Текущая позиция трансформации
  let currentTransform = 0;
  // Направление анимации (true - вниз, false - вверх)
  let isMovingDown = true;
  // Максимальное значение трансформации (вычисляется динамически)
  let maxTransform = 0;

  // Подготавливаем контейнер для анимации
  const prepareContainer = () => {
    // Устанавливаем стили для контейнера
    browserContent.style.overflow = "hidden";
    itemsContainer.style.transition = "none";
    itemsContainer.style.willChange = "transform";

    // Сбрасываем начальную позицию
    itemsContainer.style.transform = "translateY(0)";

    // Добавляем класс для стилизации
    browserContentContainer.classList.add("transform-scroll");
  };

  // Вычисляем максимальное значение для трансформации
  const calculateMaxTransform = () => {
    const containerHeight = browserContent.clientHeight;
    const contentHeight =
      itemsContainer.scrollHeight || itemsContainer.clientHeight;

    // Если контент меньше контейнера, используем фиксированное значение
    if (contentHeight <= containerHeight) {
      return 300; // Минимальное значение для анимации
    }

    return contentHeight - containerHeight;
  };

  // Функция для обновления текущей трансформации без анимации
  const updateTransformWithoutAnimation = (value) => {
    itemsContainer.style.transition = "none";
    itemsContainer.style.transform = `translateY(-${value}px)`;
    currentTransform = value;

    // Форсируем перерисовку
    void itemsContainer.offsetHeight;
  };

  // Функция для обновления текущей трансформации с анимацией
  const updateTransformWithAnimation = (value, duration) => {
    itemsContainer.style.transition = `transform ${duration}ms ease-in-out`;
    itemsContainer.style.transform = `translateY(-${value}px)`;
    currentTransform = value;
  };

  // Функция для анимации с использованием transform
  const startTransformAnimation = (fromCurrentPosition = false) => {
    if (isPaused || document.hidden) {
      animationTimer = setTimeout(
        () => startTransformAnimation(fromCurrentPosition),
        1000
      );
      return;
    }

    // Обновляем максимальное значение трансформации
    maxTransform = calculateMaxTransform();
    console.log("Максимальное значение трансформации:", maxTransform);

    // Устанавливаем флаг активной анимации
    isAnimating = true;

    // Добавляем класс, указывающий на активную анимацию
    browserContentContainer.classList.add("is-scrolling");

    // Если не продолжаем с текущей позиции, начинаем сначала
    if (!fromCurrentPosition) {
      updateTransformWithoutAnimation(0);
      isMovingDown = true;
    } else {
      console.log("Продолжаем анимацию с текущей позиции:", currentTransform);
    }

    // Определяем, сколько осталось до конца в текущем направлении
    const remainingDistance = isMovingDown
      ? maxTransform - currentTransform
      : currentTransform;

    // Вычисляем пропорциональную длительность анимации
    const proportionalDuration = isMovingDown
      ? Math.max(1000, scrollDuration * (remainingDistance / maxTransform))
      : Math.max(
          500,
          (scrollDuration / 2) * (remainingDistance / maxTransform)
        );

    console.log(
      `Направление: ${
        isMovingDown ? "вниз" : "вверх"
      }, оставшееся расстояние: ${remainingDistance}, длительность: ${proportionalDuration}ms`
    );

    // Небольшая задержка перед началом анимации для применения стилей
    setTimeout(() => {
      // Плавное движение в текущем направлении
      if (isMovingDown) {
        // Движение вниз
        updateTransformWithAnimation(maxTransform, proportionalDuration);
        console.log("Начало/продолжение анимации вниз");

        // После завершения анимации вниз
        animationTimer = setTimeout(() => {
          console.log("Анимация вниз завершена, пауза");

          // Меняем направление
          isMovingDown = false;

          // Пауза перед возвратом наверх
          animationTimer = setTimeout(() => {
            if (isPaused) {
              animationTimer = setTimeout(
                () => startTransformAnimation(true),
                1000
              );
              return;
            }

            // Плавное движение обратно вверх
            console.log("Начало анимации вверх");
            updateTransformWithAnimation(0, scrollDuration / 2);

            // После завершения анимации вверх
            animationTimer = setTimeout(() => {
              console.log("Анимация вверх завершена, пауза перед новым циклом");
              isAnimating = false;

              // Меняем направление для следующего цикла
              isMovingDown = true;

              // Пауза перед следующим циклом
              animationTimer = setTimeout(() => {
                if (!isPaused) {
                  startTransformAnimation(false); // Начинаем новый цикл сначала
                }
              }, pauseDuration);
            }, scrollDuration / 2 + 100); // Добавляем небольшой запас времени
          }, pauseDuration);
        }, proportionalDuration + 100); // Добавляем небольшой запас времени
      } else {
        // Движение вверх
        updateTransformWithAnimation(0, proportionalDuration);
        console.log("Начало/продолжение анимации вверх");

        // После завершения анимации вверх
        animationTimer = setTimeout(() => {
          console.log("Анимация вверх завершена, пауза перед новым циклом");
          isAnimating = false;

          // Меняем направление для следующего цикла
          isMovingDown = true;

          // Пауза перед следующим циклом
          animationTimer = setTimeout(() => {
            if (!isPaused) {
              startTransformAnimation(false); // Начинаем новый цикл сначала
            }
          }, pauseDuration);
        }, proportionalDuration + 100); // Добавляем небольшой запас времени
      }
    }, 50);
  };

  // Функция для обработки события transitionend
  const handleTransitionEnd = (e) => {
    if (e.target !== itemsContainer || e.propertyName !== "transform") return;

    console.log("Transition завершен:", e.propertyName);

    // Если это завершение анимации вниз
    if (currentTransform >= maxTransform * 0.95) {
      console.log("Завершена анимация вниз через event");
      isMovingDown = false;
    }
    // Если это завершение анимации вверх
    else if (currentTransform <= maxTransform * 0.05) {
      console.log("Завершена анимация вверх через event");
      isMovingDown = true;
    }
  };

  // Добавляем обработчик события завершения анимации
  itemsContainer.addEventListener("transitionend", handleTransitionEnd);

  // Инициализация анимации
  const init = () => {
    console.log("Инициализация transform-анимации");

    // Подготавливаем контейнер
    prepareContainer();

    // Обновляем максимальное значение трансформации
    maxTransform = calculateMaxTransform();

    // Запускаем анимацию с небольшой задержкой
    setTimeout(() => {
      startTransformAnimation(false);
    }, 500);

    // Дополнительные попытки запуска анимации
    setTimeout(() => {
      if (!isAnimating && !isPaused) {
        console.log("Повторная попытка запуска анимации");
        startTransformAnimation(false);
      }
    }, 2000);
  };

  // Запускаем инициализацию
  init();

  // Обработчики событий для паузы/возобновления анимации

  // При изменении видимости страницы
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && !isAnimating && !isPaused) {
      console.log("Страница стала видимой - перезапуск анимации");
      startTransformAnimation(false); // Всегда начинаем сначала
    }
  });

  // При изменении размера окна
  window.addEventListener("resize", () => {
    if (animationTimer) {
      clearTimeout(animationTimer);
    }

    console.log("Изменение размера окна - перезапуск анимации");

    // Обновляем максимальное значение трансформации
    maxTransform = calculateMaxTransform();

    // Если текущая позиция превышает новый максимум, корректируем её
    if (currentTransform > maxTransform) {
      updateTransformWithoutAnimation(maxTransform);
    }

    // Перезапускаем с небольшой задержкой
    setTimeout(() => {
      startTransformAnimation(false); // Всегда начинаем сначала
    }, 200);
  });

  // Пауза при наведении мыши
  browserContent.addEventListener("mouseenter", () => {
    isPaused = true;
    browserContentContainer.classList.add("user-interaction");
    console.log("Пауза анимации - наведение курсора (mouseenter)");
  });

  // Возобновление при уходе мыши
  browserContent.addEventListener("mouseleave", () => {
    isPaused = false;
    browserContentContainer.classList.remove("user-interaction");
    console.log("Возобновление анимации - уход курсора (mouseleave)");

    // Если анимация не активна, запускаем ее снова с текущей позиции
    if (!isAnimating) {
      animationTimer = setTimeout(() => {
        startTransformAnimation(true); // Продолжаем с текущей позиции
      }, 1000);
    }
  });
};
