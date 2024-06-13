$(document).ready(() => {
  // Set favicon based on color scheme
  function setFavicon() {
    const darkFavicon = $("#browser-dark-theme-favicon");
    const lightFavicon = $("#browser-light-theme-favicon");
    const isDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (darkFavicon.length > 0 && lightFavicon.length > 0) {
      if (isDarkMode) {
        lightFavicon.removeAttr("href");
      } else {
        darkFavicon.removeAttr("href");
      }
    }
  }

  setFavicon();

  // Listen for changes in the color scheme and update the favicon
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", setFavicon);

  // Spinner
  $(".preloader").delay(1000).fadeOut(300);

  // AOS Delay
  if ($(window).width() > 768) {
    $("section").each(function () {
      const sectionDivs = $(this).find("[data-aos]");
      sectionDivs.each(function (index) {
        if (!$(this).attr("data-aos-delay")) {
          $(this).attr("data-aos-delay", (index + 1) * 100);
        }
      });
    });
  }

  // AOS Initialization
  AOS.init({
    offset: 20,
    delay: 50,
    duration: 750,
    once: true,
  });

  // Lozad
  const observer = lozad(".lazy", {
    loaded: (el) => {
      el.parentNode.classList.add("loaded");
    },
  });
  observer?.observe();

  // Toggle nav menu
  const $menuIconBox = $("header .container .menu-icon");
  const $menuIcon = $("header .container .menu-icon img");
  const $navMenu = $("header .container .nav-list");

  $menuIconBox.on("click", () => {
    $navMenu.toggleClass("open");
    $menuIcon.attr(
      "src",
      $navMenu.hasClass("open")
        ? "assets/menu-open.png"
        : "assets/menu-close.png"
    );
  });

  // Main Slider
  const mainSlider = new Swiper(".mainSlider", {
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: true,
    speed: 500,
    effect: "fade",
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".mainSliderPagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".mainSliderNext",
      prevEl: ".mainSliderPrev",
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
  });

  // Toggle active navbar link
  const navLinks = document.querySelectorAll(`header .container .nav-list li`);

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((linkItem) => {
        linkItem.classList.remove("active");
      });
      link.classList.add("active");
    });
  });

  // Scroll to section on page load
  window.addEventListener("load", () => {
    const hash = window.location.hash.substring(1);
    const section = document.getElementById(hash);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.children[0].href.split("#")[1] === hash)
          link.classList.add("active");
      });
    }
  });

  // Function to toggle active class on nav links
  const sections = document.querySelectorAll("section");
  function toggleActiveNavLinks() {
    let scrollPosition =
      document.documentElement.scrollTop || document.body.scrollTop;

    sections.forEach((section) => {
      if (
        scrollPosition >= section.offsetTop - 100 &&
        scrollPosition < section.offsetTop + section.offsetHeight - 100
      ) {
        const id = section.getAttribute("id");
        document
          .querySelectorAll("header .container .nav-list li")
          .forEach((navLink) => {
            navLink.classList.remove("active");
            if (navLink.children[0].getAttribute("href").slice(1) === id) {
              navLink.classList.add("active");
            }
          });
      }
    });
  }
  window.addEventListener("scroll", toggleActiveNavLinks);

  // Initial call to set initial active link
  toggleActiveNavLinks();

  // Animate the count of the achievements
  const counters = document.querySelectorAll(".item-quntity");
  const speed = 200; // Adjust speed as necessary

  function animateCount(counter) {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  }

  const achievmentsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          animateCount(counter);
          achievmentsObserver.unobserve(counter);
        }
      });
    },
    {
      threshold: 0.5, // Trigger animation when section is 50% in view
    }
  );

  counters.forEach((counter) => {
    const targetValue = counter.innerText;
    counter.setAttribute("data-target", targetValue);
    counter.innerText = "0";
    achievmentsObserver.observe(counter);
  });

  // Partners Slider
  var partnersSwiper = new Swiper(".partnersSwiper", {
    slidesPerView: 2,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 50,
      },
    },
  });
});
