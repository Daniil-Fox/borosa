import { validateForms } from "./../functions/validate-forms.js";
const checks = [
  {
    selector: ".checkbox-group",
    errorMessage: "Выберите чекбоксы",
  },
];
const rules1 = [
  {
    ruleSelector: ".input-tel",
    tel: true,
    telError: "Введите корректный телефон",
    rules: [
      {
        rule: "required",
        value: true,
        errorMessage: "Заполните телефон",
      },
    ],
  },
];
const rules2 = [
  {
    ruleSelector: ".input-tel",
    tel: true,
    telError: "Введите корректный телефон",
    rules: [
      {
        rule: "required",
        value: true,
        errorMessage: "Заполните телефон",
      },
    ],
  },
  {
    ruleSelector: ".input-name",
    rules: [
      {
        rule: "required",
        value: true,
        errorMessage: "Заполните имя",
      },
      {
        rule: "minLength",
        value: 2,
        errorMessage: "Имя должно быть не менее 2 символов",
      },
    ],
  },
];
const rules3 = [
  {
    ruleSelector: ".input-tel",
    tel: true,
    telError: "Введите корректный телефон",
    rules: [
      {
        rule: "required",
        value: true,
        errorMessage: "Заполните телефон",
      },
    ],
  },
  {
    ruleSelector: ".input-name",
    rules: [
      {
        rule: "required",
        value: true,
        errorMessage: "Заполните имя",
      },
      {
        rule: "minLength",
        value: 2,
        errorMessage: "Имя должно быть не менее 2 символов",
      },
    ],
  },
];

const afterForm = () => {
  location.href = thankyouURL ? thankyouURL : "";
};

if (document.querySelector(".cta__form")) {
  validateForms(".cta__form", rules1, checks, afterForm);
}
if (document.querySelector("#modal-cta")) {
  validateForms(
    "#modal-cta form",
    rules2,
    [
      {
        selector: ".form__agree",
        errorMessage: "Выберите чекбоксы",
      },
    ],
    afterForm
  );
}
if (document.querySelector("#modal-cons")) {
  validateForms(
    "#modal-cons form",
    rules3,
    [
      {
        selector: ".form__agree",
        errorMessage: "Выберите чекбоксы",
      },
    ],
    afterForm
  );
}
