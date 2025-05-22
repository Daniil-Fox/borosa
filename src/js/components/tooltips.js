export const initTooltips = () => {
  const tooltipTriggers = document.querySelectorAll(".methods__text span");
  const tooltips = document.querySelectorAll(".methods__tooltip");

  console.log("Найдено триггеров:", tooltipTriggers.length);
  console.log("Найдено тултипов:", tooltips.length);

  // Закрываем все тултипы
  const closeAllTooltips = () => {
    tooltips.forEach((tooltip) => {
      tooltip.style.opacity = "0";
      tooltip.style.visibility = "hidden";
      tooltip.style.transform = "translateY(-10px)";
    });
  };

  // Обработчик для каждого триггера
  tooltipTriggers.forEach((trigger, index) => {
    // При наведении на иконку
    trigger.addEventListener("mouseenter", () => {
      closeAllTooltips();
      const tooltip = trigger
        .closest(".methods__content")
        .querySelector(".methods__tooltip");
      console.log("Наведение на триггер:", index, "Найден тултип:", !!tooltip);

      if (tooltip) {
        tooltip.style.opacity = "1";
        tooltip.style.visibility = "visible";
        tooltip.style.transform = "translateX(50%) translateY(0);";

        // Проверяем, не выходит ли тултип за пределы экрана
        const tooltipRect = tooltip.getBoundingClientRect();
        const offset = 20;

        // Проверяем выход за правый край
        if (tooltipRect.right > window.innerWidth - offset) {
          const overflow = tooltipRect.right - (window.innerWidth - offset);
          tooltip.style.transform = `translateX(-${overflow}px)`;
        }

        // Проверяем выход за верхний край
        if (tooltipRect.top < offset) {
          // Если тултип выходит за верхний край экрана, показываем его снизу
          tooltip.style.bottom = "auto";
          tooltip.style.top = "calc(100% + 10px)";
          tooltip.style.transform = "translateX(50%) translateY(0);";
          tooltip.querySelector("::before").style.bottom = "auto";
          tooltip.querySelector("::before").style.top = "-8px";
        }
      }
    });

    // При уходе курсора
    trigger.addEventListener("mouseleave", (e) => {
      const tooltip = trigger
        .closest(".methods__content")
        .querySelector(".methods__tooltip");
      if (tooltip) {
        const relatedTarget = e.relatedTarget;
        if (!tooltip.contains(relatedTarget)) {
          closeAllTooltips();
        }
      }
    });
  });

  // Закрываем тултип при уходе с него
  tooltips.forEach((tooltip) => {
    tooltip.addEventListener("mouseleave", () => {
      closeAllTooltips();
    });
  });

  // Закрываем все тултипы при скролле
  document.addEventListener("scroll", () => {
    closeAllTooltips();
  });

  // Закрываем все тултипы при клике вне
  document.addEventListener("click", (e) => {
    const target = e.target;
    if (
      !target.closest(".methods__text span") &&
      !target.closest(".methods__tooltip")
    ) {
      closeAllTooltips();
    }
  });
};
