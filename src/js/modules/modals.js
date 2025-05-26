export const initModals = () => {
  // Получаем все кейсы
  const cases = document.querySelectorAll(".optima__item");
  const modals = document.querySelectorAll(".modal--case");
  const closeButtons = document.querySelectorAll(".modal__close");
  const nextButtons = document.querySelectorAll(".modal__next");

  // Функция для открытия модального окна
  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  };

  // Функция для закрытия всех модальных окон
  const closeAllModals = () => {
    modals.forEach((modal) => {
      modal.classList.remove("active");
    });
    document.body.style.overflow = "";
  };

  // Добавляем обработчики для кейсов
  cases.forEach((item) => {
    item.addEventListener("click", () => {
      const modalId = item.dataset.modalTarget;
      openModal(modalId);
    });
  });

  // Добавляем обработчики для кнопок закрытия
  closeButtons.forEach((button) => {
    button.addEventListener("click", closeAllModals);
  });

  // Добавляем обработчики для кнопок "Следующий кейс"
  nextButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextModalId = button.dataset.next;
      closeAllModals();
      openModal(nextModalId);
    });
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
};
