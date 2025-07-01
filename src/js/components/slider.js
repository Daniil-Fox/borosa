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
  speed: 500,
  navigation: {
    prevEl: ".princeps__btn--prev",
    nextEl: ".princeps__btn--next",
  },
});

new Swiper(".cases__slider", {
  slidesPerView: "auto",
  spaceBetween: 20,
  speed: 500,
});

const articleOtherSliders = document.querySelectorAll(".article-other__slider");

articleOtherSliders.forEach((slider) => {
  new Swiper(slider, {
    slidesPerView: "auto",
    spaceBetween: 20,
    speed: 500,
  });
});

const galInfo = document.querySelectorAll(".gal-info");

if (galInfo.length > 0) {
  galInfo.forEach((gal) => {
    const thumbs = gal.querySelector(".gal-info__thumbs");
    const mainSlider = gal.querySelector(".gal-info__slider");
    const prevBtn = gal.querySelector(".gal-info__arr--prev");
    const nextBtn = gal.querySelector(".gal-info__arr--next");

    const galInfoThumbs = new Swiper(thumbs, {
      slidesPerView: "auto",
      spaceBetween: 12,
      speed: 500,
    });

    const galInfoSlider = new Swiper(mainSlider, {
      slidesPerView: 1,
      spaceBetween: 30,
      speed: 500,
      thumbs: {
        swiper: galInfoThumbs,
      },
      navigation: {
        prevEl: prevBtn,
        nextEl: nextBtn,
      },
    });

    galInfoSlider.on("slideChange", function () {
      if (window.innerWidth <= 1024) {
        const activeIndex = galInfoSlider.realIndex;
        galInfoThumbs.slideTo(activeIndex);
      }
    });
  });
}

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
    const len = thumbsSlider.querySelectorAll(".swiper-slide").length - 1;
    const nextBtn = el.querySelector(".vertical-slider-next");
    const prevBtn = el.querySelector(".vertical-slider-prev");
    if (thumbsSlider) {
      thumbsS = new Swiper(thumbsSlider, {
        slidesPerView: 3,
        direction: "vertical",
        spaceBetween: 20,
        speed: 500,
        on: {
          slideChange: () => {
            if (generalSlider.activeIndex == len) {
              nextBtn.classList.add("hide");
            } else {
              nextBtn.classList.remove("hide");
            }

            if (generalSlider.activeIndex == 0) {
              prevBtn.classList.add("hide");
            } else {
              prevBtn.classList.remove("hide");
            }
          },
        },
      });
    }
    const generalSlider = new Swiper(mainSlider, {
      slidesPerView: 1,
      spaceBetween: 20,
      speed: 500,
      thumbs: {
        swiper: thumbsS,
      },

      on: {
        afterInit: () => {
          prevBtn?.classList.add("hide");
        },
        slideChange: () => {
          if (generalSlider.activeIndex == len) {
            nextBtn.classList.add("hide");
          } else {
            nextBtn.classList.remove("hide");
          }

          if (generalSlider.activeIndex == 0) {
            prevBtn?.classList.add("hide");
          } else {
            prevBtn?.classList.remove("hide");
          }
        },
      },
    });

    nextBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      thumbsS.slideNext();
      generalSlider.slideNext();
      if (generalSlider.activeIndex == len) {
        nextBtn.classList.add("hide");
      } else {
        nextBtn.classList.remove("hide");
      }
    });

    prevBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      thumbsS.slidePrev();
      generalSlider.slidePrev();
      if (generalSlider.activeIndex == 0) {
        prevBtn.classList.add("hide");
      } else {
        prevBtn.classList.remove("hide");
      }
    });
  });
}

const listalkaWrapper = document.querySelectorAll(".listalka__wrapper");
if (listalkaWrapper.length > 0) {
  listalkaWrapper.forEach((wrap) => {
    const slider = wrap.querySelector(".listalka__slider");
    const btnPrev = wrap.querySelector(".listalka__arr--prev");
    const btnNext = wrap.querySelector(".listalka__arr--next");
    const pagination = wrap.querySelector(".listalka-pag") ?? null;

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
      pagination?.style.setProperty("--pagination-len", percent + "%");
      pagination?.style.setProperty(
        "--pagination-offset",
        percent * swiper.realIndex + "%"
      );
    }
  });
}

const descriptSlider = document.querySelectorAll(".descript__slider");
if (descriptSlider.length > 0) {
  descriptSlider.forEach((wrap) => {
    const slider = wrap;
    const btnPrev = wrap.querySelector(".descript__arr--prev");
    const btnNext = wrap.querySelector(".descript__arr--next");
    const pagination = wrap.querySelector(".descript-pag") ?? null;

    const sliderrr = new Swiper(slider, {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      navigation: {
        prevEl: btnPrev ?? null,
        nextEl: btnNext ?? null,
      },

      on: {
        slideChange: (swiper) => updateCustomPagination(swiper),
        afterInit: (swiper) => updateCustomPagination(swiper),
      },
    });

    function updateCustomPagination(swiper) {
      const slidesCount = slider.querySelectorAll(".swiper-slide").length;
      const percent = 100 / slidesCount;
      pagination?.style.setProperty("--pagination-len", percent + "%");
      pagination?.style.setProperty(
        "--pagination-offset",
        percent * swiper.realIndex + "%"
      );
    }
  });
}

const othersSlider = document.querySelectorAll(".others__wrapper");
if (othersSlider.length > 0) {
  othersSlider.forEach((wrap) => {
    const slider = wrap.querySelector(".others__slider");
    const btnPrev = wrap.querySelector(".others__arr--prev");
    const btnNext = wrap.querySelector(".others__arr--next");
    const pagination = wrap.querySelector(".others-pag") ?? null;

    const sliderrr = new Swiper(slider, {
      slidesPerView: 4,
      spaceBetween: 20,
      loop: true,
      navigation: {
        prevEl: btnPrev,
        nextEl: btnNext,
      },

      on: {
        slideChange: (swiper) => updateCustomPagination(swiper),
        afterInit: (swiper) => updateCustomPagination(swiper),
      },

      breakpoints: {
        320: {
          slidesPerView: "auto",
          spaceBetween: 10,
        },
        577: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
    });

    function updateCustomPagination(swiper) {
      const slidesCount = slider.querySelectorAll(".swiper-slide").length;
      const percent = 100 / slidesCount;
      pagination?.style.setProperty("--pagination-len", percent + "%");
      pagination?.style.setProperty(
        "--pagination-offset",
        percent * swiper.realIndex + "%"
      );
    }
  });
}

const shareCont = document.querySelectorAll(".share__wrapper");
if (shareCont.length > 0) {
  shareCont.forEach((cont) => {
    const pagination = cont.querySelector(".share-pag") ?? null;
    const btnPrev = cont.querySelector(".share__arr--prev");
    const btnNext = cont.querySelector(".share__arr--next");
    const slider = cont.querySelector(".share__slider");

    new Swiper(slider, {
      slidesPerView: 4,
      spaceBetween: 20,
      speed: 500,
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
      pagination?.style.setProperty("--pagination-len", percent + "%");
      pagination?.style.setProperty(
        "--pagination-offset",
        percent * swiper.realIndex + "%"
      );
    }
  });
}
