import { Swiper } from "swiper";
import { Autoplay, Navigation } from "swiper/modules";

Swiper.use([Autoplay, Navigation]);
new Swiper(".build__slider", {
  slidesPerView: "auto",
  spaceBetween: 5,
  centeredSlides: true,
  speed: 6000,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
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
    breakpoints: {
      320: {
        slidesPerView: "auto",
      },
      601: {
        slidesPerView: 3,
      },
      901: {
        slidesPerView: 4,
      },
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

window.addEventListener("DOMContentLoaded", () => {
  const resizableSwiper = (
    breakpoint,
    swiperClass,
    swiperSettings,
    callback
  ) => {
    let swiper;

    breakpoint = window.matchMedia(breakpoint);

    const enableSwiper = function (className, settings) {
      swiper = new Swiper(className, settings);

      if (callback) {
        callback(swiper);
      }
    };

    const checker = function () {
      if (breakpoint.matches) {
        return enableSwiper(swiperClass, swiperSettings);
      } else {
        if (swiper !== undefined) swiper.destroy(true, true);
        return;
      }
    };

    breakpoint.addEventListener("change", checker);
    checker();
  };

  const someFunc = (instance) => {
    if (instance) {
      instance.on("slideChange", function (e) {
        console.log("*** mySwiper.activeIndex", instance.activeIndex);
      });
    }
  };

  resizableSwiper("(max-width: 900px)", ".solution__slider", {
    spaceBetween: 10,
    slidesPerView: "auto",
  });
  resizableSwiper("(max-width: 600px)", ".optima__slider", {
    spaceBetween: 0,
    slidesPerView: "auto",
  });
  resizableSwiper("(max-width: 600px)", ".service__slider", {
    spaceBetween: 0,
    slidesPerView: "auto",
  });
});
