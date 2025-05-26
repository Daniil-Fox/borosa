export const initBaseModals = () => {
  // Находим все кнопки для открытия модальных окон
  const modalButtons = document.querySelectorAll(".modal-btn");

  if (!modalButtons.length) return;

  // Находим все модальные окна (исключая modal--case)
  const modals = document.querySelectorAll(".modal:not(.modal--case)");

  if (!modals.length) return;

  // Функция для открытия модального окна
  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);

    if (!modal || modal.classList.contains("modal--case")) return;

    // Закрываем все открытые модальные окна
    closeAllModals();

    // Открываем нужное модальное окно
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  // Функция для закрытия всех модальных окон
  const closeAllModals = () => {
    modals.forEach((modal) => {
      modal.classList.remove("active");
    });
    document.body.style.overflow = "";
  };

  // Добавляем обработчики для кнопок открытия
  modalButtons.forEach((button) => {
    const modalId = button.dataset.modal;
    if (!modalId) return;

    button.addEventListener("click", () => openModal(modalId));
  });

  // Добавляем обработчики для кнопок закрытия
  const closeButtons = document.querySelectorAll(".modal__close");
  closeButtons.forEach((button) => {
    button.addEventListener("click", closeAllModals);
  });

  // Закрытие по клику вне модального окна
  modals.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeAllModals();
      }
    });
  });

  // Закрытие по Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllModals();
    }
  });

  // Возвращаем методы для программного управления
  return {
    open: openModal,
    closeAll: closeAllModals,
  };
};
