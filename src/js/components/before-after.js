document.addEventListener("DOMContentLoaded", (e) => {
  const baSliders = document.querySelectorAll(".before-after");
  if (baSliders.length > 0) {
    const beforeAfterSlider = (slider, before, change, x) => {
      let shift = Math.max(0, Math.min(x, slider.offsetWidth));
      before.style.width = shift + "px";
      change.style.left = shift + "px";
    };

    const pauseEvent = (e) => {
      e.stopPropagation();
      e.preventDefault();
      return false;
    };
    baSliders.forEach((slider) => {
      const before = slider.querySelector(".before-after__before");
      const beforeImage = before.querySelector("img");
      const change = slider.querySelector(".before-after__change");
      const wrapper = slider.closest(".before-after-wrapper");

      let isActive = false;

      let imageWidth = slider.offsetWidth;
      beforeImage.style.width = imageWidth + "px";

      window.addEventListener("resize", (e) => {
        imageWidth = slider.offsetWidth;
        beforeImage.style.width = imageWidth + "px";
      });

      wrapper?.addEventListener("mousemove", (e) => {
        if (!isActive) return;
        let x = e.pageX;
        x -= slider.getBoundingClientRect().left;
        beforeAfterSlider(slider, before, change, x);
        pauseEvent();
      });

      slider.addEventListener("mousedown", (e) => {
        isActive = true;
      });
      document.body.addEventListener("mouseup", (e) => {
        isActive = false;
      });
      document.body.addEventListener("mouseleave", (e) => {
        isActive = false;
      });
    });
  }
});
