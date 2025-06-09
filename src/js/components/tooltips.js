import { createPopper } from "@popperjs/core";

export const initTooltips = () => {
  // Ищем все триггеры тултипов на странице
  const tooltipTriggers = document.querySelectorAll(
    ".methods__wrpaper > span:first-child"
  );
  const tooltips = document.querySelectorAll(".methods__tooltip");

  console.log("Найдено триггеров:", tooltipTriggers.length);
  console.log("Найдено тултипов:", tooltips.length);

  // Массив для хранения экземпляров Popper
  const popperInstances = [];

  // Закрываем все тултипы
  const closeAllTooltips = () => {
    tooltips.forEach((tooltip) => {
      tooltip.style.opacity = "0";
      tooltip.style.visibility = "hidden";
    });
  };

  // Обработчик для каждого триггера
  tooltipTriggers.forEach((trigger, index) => {
    const tooltip = trigger
      .closest(".methods__wrpaper")
      .querySelector(".methods__tooltip");

    if (tooltip) {
      // Создаем экземпляр Popper для каждого тултипа
      const popperInstance = createPopper(trigger, tooltip, {
        placement: "top",
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 10],
            },
          },
          {
            name: "preventOverflow",
            options: {
              boundary: window,
              padding: 20,
            },
          },
          {
            name: "flip",
            options: {
              fallbackPlacements: ["bottom"],
            },
          },
          {
            name: "arrow",
            options: {
              element: tooltip.querySelector("::before"),
              padding: 5,
            },
          },
        ],
      });

      popperInstances.push(popperInstance);

      // При наведении на иконку
      trigger.addEventListener("mouseenter", () => {
        closeAllTooltips();
        console.log(
          "Наведение на триггер:",
          index,
          "Найден тултип:",
          !!tooltip
        );

        tooltip.style.opacity = "1";
        tooltip.style.visibility = "visible";

        // Обновляем позицию тултипа
        popperInstance.update();
      });

      // При уходе курсора
      trigger.addEventListener("mouseleave", (e) => {
        const relatedTarget = e.relatedTarget;
        if (!relatedTarget || !tooltip.contains(relatedTarget)) {
          closeAllTooltips();
        }
      });

      // Закрываем тултип при уходе с него
      tooltip.addEventListener("mouseleave", () => {
        closeAllTooltips();
      });
    }
  });

  // Закрываем все тултипы при скролле
  document.addEventListener("scroll", () => {
    closeAllTooltips();
  });

  // Закрываем все тултипы при клике вне
  document.addEventListener("click", (e) => {
    const target = e.target;
    if (
      !target.closest(".methods__wrpaper > span:first-child") &&
      !target.closest(".methods__tooltip")
    ) {
      closeAllTooltips();
    }
  });

  // Обновляем позиции тултипов при ресайзе окна
  window.addEventListener("resize", () => {
    popperInstances.forEach((instance) => instance.update());
  });
};
