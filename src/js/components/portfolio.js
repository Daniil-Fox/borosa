export const initPortfolioMore = () => {
  const portfolioContainer = document.querySelector(".portfolio__container");
  const moreButton = document.querySelector(".portfolio__more");

  if (!portfolioContainer || !moreButton) return;

  moreButton.addEventListener("click", () => {
    const isExpanded = portfolioContainer.classList.contains("show-all");

    if (isExpanded) {
      portfolioContainer.classList.remove("show-all");
      moreButton.textContent = "Показать ещё";
      moreButton.classList.remove("portfolio__more--hide");
    } else {
      portfolioContainer.classList.add("show-all");
      moreButton.textContent = "Свернуть";
      moreButton.classList.add("portfolio__more--hide");
    }
  });
};
