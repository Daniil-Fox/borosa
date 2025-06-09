import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

export const initPortfolioModals = () => {
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  const modals = document.querySelectorAll(".proj-modal");
  const closeButtons = document.querySelectorAll(".proj-modal__close");

  // Функция для открытия модального окна
  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";

      // Инициализируем слайдер при открытии модального окна
      const slider = modal.querySelector(".proj-modal__slider");
      if (slider) {
        new Swiper(slider, {
          modules: [Navigation, Pagination],
          slidesPerView: 1,
          spaceBetween: 0,
          loop: true,
          navigation: {
            nextEl: modal.querySelector(".proj-modal__next"),
            prevEl: modal.querySelector(".proj-modal__prev"),
          },
        });
      }
    }
  };

  // Функция для закрытия всех модальных окон
  const closeAllModals = () => {
    modals.forEach((modal) => {
      modal.classList.remove("active");
    });
    document.body.style.overflow = "";
  };

  if (window.innerWidth > 600) {
    // Добавляем обработчики для кнопок открытия
    portfolioItems.forEach((button) => {
      button.addEventListener("click", () => {
        const modalId = button.dataset.modalTarget;
        openModal(modalId);
      });
    });
  }

  // Добавляем обработчики для кнопок закрытия
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
};
