import { Swiper } from "swiper";
import { Autoplay, Navigation } from "swiper/modules";

Swiper.use([Autoplay, Navigation]);
new Swiper(".build__slider", {
  slidesPerView: "auto",
  spaceBetween: 5,
  centeredSlides: true,
  speed: 500,

  loop: true,
});

new Swiper(".princeps__slider", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  speed: 500,
  navigation: {
    prevEl: ".princeps__btn--prev",
    nextEl: ".princeps__btn--next",
  },
});

const teamSliders = document.querySelectorAll(".team__slider");

teamSliders.forEach((slider) => {
  const sliderPrev = slider.querySelector(".team-prev");
  const sliderNext = slider.querySelector(".team-next");
  new Swiper(slider, {
    slidesPerView: 4,
    spaceBetween: 20,
    navigation: {
      prevEl: sliderPrev,
      nextEl: sliderNext,
    },
  });
});

new Swiper(".find__slider", {
  slidesPerView: "auto",
  spaceBetween: 10,
  speed: 2000,
  loop: true,

  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
});
