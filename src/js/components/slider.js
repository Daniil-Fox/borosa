import { Swiper } from "swiper";
import {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
  Thumbs,
} from "swiper/modules";

Swiper.use([Autoplay, Navigation, Thumbs, EffectFade, Pagination]);
new Swiper(".build__slider", {
  slidesPerView: "auto",
  spaceBetween: 5,
  centeredSlides: true,
  speed: 600,

  loop: true,
  navigation: {
    prevEl: ".build-prev",
    nextEl: ".build-next",
  },
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
    loop: true,
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
  centeredSlides: true,
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

  const portfolioSliders = document.querySelectorAll(".portfolio-item__mob");
  portfolioSliders.forEach((el) => {
    const prevEl = el.querySelector(".portfolio-prev");
    const nextEl = el.querySelector(".portfolio-next");
    resizableSwiper("(max-width: 600px)", el, {
      spaceBetween: 10,
      slidesPerView: 1,
      loop: true,
      navigation: {
        prevEl,
        nextEl,
      },
    });
  });
});

const vericalSliderContainer = document.querySelectorAll(".vertical-wrapper");

if (vericalSliderContainer.length > 0) {
  vericalSliderContainer.forEach((el) => {
    let thumbsS = null;
    const mainSlider = el.querySelector(".vertical-slider-main");
    const thumbsSlider = el.querySelector(".vertical-slider-thumbs");

    const nextBtn = el.querySelector(".vertical-slider-next");
    if (thumbsSlider) {
      thumbsS = new Swiper(thumbsSlider, {
        slidesPerView: 3,
        direction: "vertical",
        spaceBetween: 20,
        loop: true,
        navigation: {
          nextEl: nextBtn ?? null,
        },
      });
    }
    const generalSlider = new Swiper(mainSlider, {
      slidesPerView: 1,
      spaceBetween: 20,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      thumbs: {
        swiper: thumbsS,
      },
    });
  });
}

const listalkaWrapper = document.querySelectorAll(".listalka__wrapper");
if (listalkaWrapper.length > 0) {
  listalkaWrapper.forEach((wrap) => {
    const slider = wrap.querySelector(".listalka__slider");
    const btnPrev = wrap.querySelector(".listalka__arr--prev");
    const btnNext = wrap.querySelector(".listalka__arr--next");
    const pagination = wrap.querySelector(".listalka__pagination") ?? null;

    const sliderrr = new Swiper(slider, {
      slidesPerView: 1,
      spaceBetween: 20,

      navigation: {
        prevEl: btnPrev,
        nextEl: btnNext,
      },

      on: {
        slideChange: (swiper) => updateCustomPagination(swiper),
        afterInit: (swiper) => updateCustomPagination(swiper),
      },
    });

    function updateCustomPagination(swiper) {
      const slidesCount = slider.querySelectorAll(".swiper-slide").length;
      const percent = 100 / slidesCount;
      pagination.style.setProperty("--pagination-len", percent + "%");
      pagination.style.setProperty(
        "--pagination-offset",
        percent * swiper.realIndex + "%"
      );
    }
  });
}
