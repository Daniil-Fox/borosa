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
