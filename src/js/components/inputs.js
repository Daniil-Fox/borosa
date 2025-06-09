const inputs = document.querySelectorAll(".form__input");

if (inputs.length > 0) {
  function toggleFilledClass(input) {
    const parent = input.parentElement; // Контейнер для input
    if (input.value.trim() !== "") {
      parent.classList.add("form__field--filled");
    } else {
      parent.classList.remove("form__field--filled");
    }
  }

  inputs.forEach((input) => {
    input.addEventListener("input", () => toggleFilledClass(input));
    input.addEventListener("blur", () => toggleFilledClass(input));
  });
}
