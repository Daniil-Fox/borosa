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
  const prevBtn = slider.querySelector(".article-other__btn--prev");
  const nextBtn = slider.querySelector(".article-other__btn--next");
  new Swiper(slider, {
    slidesPerView: "auto",
    spaceBetween: 20,
    speed: 500,
    navigation: {
      prevEl: prevBtn,
      nextEl: nextBtn,
    },
  });
});

const projectsSliders = document.querySelectorAll(".projects__slider");

projectsSliders.forEach((slider) => {
  const prevBtn = slider.querySelector(".projects__btn--prev");
  const nextBtn = slider.querySelector(".projects__btn--next");
  const slides = slider.querySelectorAll(".swiper-slide");
  // Находим слайд с кнопкой
  const moreSlide = slider
    .querySelector(".swiper-slide .pr-item__more")
    ?.closest(".swiper-slide");
  let visibleSlides = 6;

  // Скрываем все слайды, кроме первых 6 и слайда с кнопкой "Показать еще"
  slides.forEach((slide, idx) => {
    if (idx < visibleSlides || slide === moreSlide) {
      slide.style.display = "";
    } else {
      slide.style.display = "none";
    }
  });

  let swiper = new Swiper(slider, {
    slidesPerView: "auto",
    spaceBetween: 20,
    speed: 500,
    navigation: {
      prevEl: prevBtn,
      nextEl: nextBtn,
    },
  });

  // Обработчик кнопки "Показать еще"
  if (moreSlide) {
    const moreBtn = moreSlide.querySelector(".pr-item__more");
    moreBtn?.addEventListener("click", () => {
      visibleSlides += 6;
      slides.forEach((slide, idx) => {
        // Открываем очередные 6 слайдов, но последний слайд с кнопкой оставляем видимым до конца
        if (idx < visibleSlides || slide === moreSlide) {
          slide.style.display = "";
        }
      });
      swiper.update();

      // Если все слайды показаны (кроме слайда с кнопкой), скрываем слайд с кнопкой
      if (visibleSlides >= slides.length - 1) {
        moreSlide.style.display = "none";
        swiper.update();
      }
    });

    // Если слайдов <= 6 + 1 (слайд с кнопкой), сразу скрываем слайд с кнопкой
    if (slides.length <= visibleSlides + 1) {
      moreSlide.style.display = "none";
    }
  }
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

const teamSliders = document.querySelectorAll(
  ".team__slider:not(.team__slider--wide)"
);
const teamSlidersWide = document.querySelectorAll(".team__slider--wide");

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

teamSlidersWide.forEach((slider) => {
  new Swiper(slider, {
    slidesPerView: "auto",
    spaceBetween: 20,
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

const vericalSliderContainer = document.querySelectorAll(".text-vertical");

if (vericalSliderContainer.length > 0) {
  vericalSliderContainer.forEach((el) => {
    let thumbsS = null;
    const mainSlider = el.querySelector(".vertical-slider-main");
    const thumbsSlider = el.querySelector(".vertical-slider-thumbs");
    const len = thumbsSlider.querySelectorAll(".swiper-slide").length - 1;
    const nextBtn = el.querySelector(".vertical-slider-next");
    const prevBtn = el.querySelector(".vertical-slider-prev");

    const contentable = el.querySelector(".text-vertical__contentable");
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
    const contentSlider = new Swiper(contentable, {
      slidesPerView: 1,
      spaceBetween: 20,
      speed: 500,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      on: {
        slideChange: () => {
          thumbsS?.slideTo(contentSlider.activeIndex);
          generalSlider?.slideTo(contentSlider.activeIndex);
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
          contentSlider?.slideTo(generalSlider.activeIndex);
          thumbsS?.slideTo(generalSlider.activeIndex);
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
        slideChange: (swiper) =>
          updateCustomPagination(swiper, slider, pagination),
        afterInit: (swiper) =>
          updateCustomPagination(swiper, slider, pagination),
      },
    });
  });
}

const descriptSlider = document.querySelectorAll(".descript__wrap");
if (descriptSlider.length > 0) {
  descriptSlider.forEach((wrap) => {
    const slider = wrap.querySelector(".descript__slider");
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
        slideChange: (swiper) =>
          updateCustomPagination(swiper, slider, pagination),
        afterInit: (swiper) =>
          updateCustomPagination(swiper, slider, pagination),
      },
    });
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
      // loop: true,
      navigation: {
        prevEl: btnPrev,
        nextEl: btnNext,
      },

      on: {
        slideChange: (swiper) =>
          updateCustomPagination(swiper, slider, pagination),
        afterInit: (swiper) =>
          updateCustomPagination(swiper, slider, pagination),
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
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        601: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        901: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
      on: {
        slideChange: (swiper) =>
          updateCustomPagination(swiper, slider, pagination),
        afterInit: (swiper) =>
          updateCustomPagination(swiper, slider, pagination),
      },
    });
  });
}

// --- Общая функция для обновления кастомной пагинации ---
function updateCustomPagination(swiper, slider, pagination) {
  // Получаем реальное количество слайдов (без клонов)

  let slidesCount;
  if (swiper.params.loop && swiper.originalSlides) {
    slidesCount = swiper.originalSlides.length;
  } else {
    slidesCount = swiper.slides.length;
  }

  let slidesPerView = swiper.params.slidesPerView;
  if (slidesPerView === "auto") {
    // Для auto можно попробовать взять swiper.params.breakpoints или swiper.slidesPerViewDynamic(),
    // но для универсальности оставим 1 (или доработать под твой кейс)
    slidesPerView = 1;
  }
  slidesPerView = Number(slidesPerView) || 1;

  if (slidesCount <= slidesPerView) {
    pagination?.style.setProperty("--pagination-len", "100%");
    pagination?.style.setProperty("--pagination-offset", "0%");
    return;
  }

  const len = (slidesPerView / slidesCount) * 100;
  const maxIndex = slidesCount - slidesPerView;
  let offset = 0;

  if (swiper.params.loop) {
    // Если активный слайд — клон первого (в начале)
    if (swiper.activeIndex < (swiper.loopedSlides || slidesPerView)) {
      offset = 0;
    }
    // Если активный слайд — клон последнего (в конце)
    else if (
      swiper.activeIndex >=
      slidesCount + (swiper.loopedSlides || slidesPerView)
    ) {
      offset = 100 - len;
    } else {
      const currentIndex = Math.min(swiper.realIndex, maxIndex);
      offset = maxIndex > 0 ? (currentIndex / maxIndex) * (100 - len) : 0;
    }
  } else {
    if (maxIndex === 0) {
      offset = 0;
    } else if (maxIndex === 1) {
      offset = swiper.realIndex === 0 ? 0 : 100 - len;
    } else {
      const currentIndex = Math.min(swiper.realIndex, maxIndex);
      offset = (currentIndex / maxIndex) * (100 - len);
    }
  }

  pagination?.style.setProperty("--pagination-len", len + "%");
  pagination?.style.setProperty("--pagination-offset", offset + "%");
}
