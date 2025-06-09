// Функция для управления состоянием кнопки отправки формы
const initPrivacyPolicyHandlers = () => {
  // Находим все формы на странице
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    const submitButton = form.querySelector(".form__btn");
    const privacyCheckbox = form.querySelector(
      '.form__agree input[type="checkbox"]'
    );

    if (submitButton && privacyCheckbox) {
      // Устанавливаем начальное состояние кнопки
      submitButton.disabled = !privacyCheckbox.checked;

      // Добавляем обработчик изменения состояния чекбокса
      privacyCheckbox.addEventListener("change", () => {
        submitButton.disabled = !privacyCheckbox.checked;
      });
    }
  });
};

// Инициализируем обработчики при загрузке страницы
document.addEventListener("DOMContentLoaded", initPrivacyPolicyHandlers);

// Экспортируем функцию для возможного использования в других модулях
export { initPrivacyPolicyHandlers };
