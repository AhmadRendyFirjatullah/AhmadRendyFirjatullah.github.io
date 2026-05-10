/**
 * ==============================================================
 * MODERN PORTFOLIO DETAIL JS
 * File: maindetail.js
 * ==============================================================
 */

(function () {
  "use strict";

  /* ==========================================================
     HELPER
  ========================================================== */
  const select = (el) => document.querySelector(el);
  const selectAll = (el) => document.querySelectorAll(el);

  /* ==========================================================
     HEADER TOGGLE
  ========================================================== */
  const headerToggleBtn = select(".header-toggle");

  function headerToggle() {
    const header = select("#header");

    if (header) {
      header.classList.toggle("header-show");
    }

    if (headerToggleBtn) {
      headerToggleBtn.classList.toggle("bi-list");
      headerToggleBtn.classList.toggle("bi-x");
    }
  }

  if (headerToggleBtn) {
    headerToggleBtn.addEventListener("click", headerToggle);
  }

  /* ==========================================================
     MOBILE NAV CLOSE
  ========================================================== */
  selectAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (select(".header-show")) {
        headerToggle();
      }
    });
  });

  /* ==========================================================
     DROPDOWN TOGGLE
  ========================================================== */
  selectAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();

      this.parentNode.classList.toggle("active");

      if (this.parentNode.nextElementSibling) {
        this.parentNode.nextElementSibling.classList.toggle(
          "dropdown-active"
        );
      }

      e.stopImmediatePropagation();
    });
  });

  /* ==========================================================
     PRELOADER
  ========================================================== */
  window.addEventListener("load", () => {
    const preloader = select("#preloader");

    if (!preloader) return;

    let percent = 0;

    const progressBar = select(".progress-bar");
    const percentText = select("#loading-percent");

    const interval = setInterval(() => {
      percent += 2;

      if (progressBar) {
        progressBar.style.width = percent + "%";
      }

      if (percentText) {
        percentText.innerText = percent + "%";
      }

      if (percent >= 100) {
        clearInterval(interval);

        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";

        setTimeout(() => {
          preloader.remove();
        }, 700);
      }
    }, 20);
  });

  /* ==========================================================
     SCROLL TOP BUTTON
  ========================================================== */
  const scrollTop = select(".scroll-top");

  function toggleScrollTop() {
    if (!scrollTop) return;

    if (window.scrollY > 300) {
      scrollTop.classList.add("active");
    } else {
      scrollTop.classList.remove("active");
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener("click", (e) => {
      e.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    window.addEventListener("load", toggleScrollTop);
    document.addEventListener("scroll", toggleScrollTop);
  }

  /* ==========================================================
     AOS ANIMATION
  ========================================================== */
  function aosInit() {
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 900,
        easing: "ease-in-out",
        once: true,
        mirror: false,
      });
    }
  }

  window.addEventListener("load", aosInit);

  /* ==========================================================
     GLIGHTBOX
  ========================================================== */
  if (typeof GLightbox !== "undefined") {
    GLightbox({
      selector: ".glightbox",
    });
  }

  /* ==========================================================
     SWIPER
  ========================================================== */
  function initSwiper() {
    if (typeof Swiper === "undefined") return;

    selectAll(".init-swiper").forEach((swiperElement) => {
      const configEl = swiperElement.querySelector(".swiper-config");

      if (!configEl) return;

      let config = {};

      try {
        config = JSON.parse(configEl.innerHTML.trim());
      } catch (e) {
        console.error("Swiper config error:", e);
        return;
      }

      new Swiper(swiperElement, {
        ...config,

        grabCursor: true,

        effect: "slide",

        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
        },

        speed: 900,

        keyboard: {
          enabled: true,
        },

        breakpoints: {
          0: {
            slidesPerView: 1,
          },

          768: {
            slidesPerView: 1,
          },
        },
      });
    });
  }

  window.addEventListener("load", initSwiper);

  /* ==========================================================
     PARALLAX EFFECT
  ========================================================== */
  const slider = select(".portfolio-details-slider");

  if (slider) {
    slider.addEventListener("mousemove", (e) => {
      const rect = slider.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const moveX = (x - rect.width / 2) / 30;
      const moveY = (y - rect.height / 2) / 30;

      slider.style.transform =
        `perspective(1000px) rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
    });

    slider.addEventListener("mouseleave", () => {
      slider.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    });
  }

  /* ==========================================================
     IMAGE HOVER EFFECT
  ========================================================== */
  selectAll(".swiper-slide img").forEach((img) => {
    img.addEventListener("mouseenter", () => {
      img.style.transform = "scale(1.04)";
    });

    img.addEventListener("mouseleave", () => {
      img.style.transform = "scale(1)";
    });
  });

})();