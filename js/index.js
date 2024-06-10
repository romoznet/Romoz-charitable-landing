$(document).ready(function () {
  // favicon based on color scheme
  function setFavicon() {
    const darkFavicon = $("#browser-dark-theme-favicon");
    const lightFavicon = $("#browser-light-theme-favicon");
    if (darkFavicon.length > 0 && lightFavicon.length > 0) {
      const isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (isDarkMode) {
        lightFavicon.removeAttr("href");
        // lightFavicon.attr("disabled", "disabled");
      } else {
        darkFavicon.removeAttr("href");
        // darkFavicon.attr("disabled", "disabled");
      }
    }
  }
  setFavicon();
  // listen for changes in the color scheme and update the favicon
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      setFavicon();
    });

  //spinner
  $(".preloader").delay(1000).fadeOut(300);
  //aos Delay
  if ($(window).width() > 768) {
    $("section").each(function () {
      const sectionDivs = $(this).find("[data-aos]");
      sectionDivs.each(function (index) {
        // Check if data-aos-delay is not already set
        if (!$(this).attr("data-aos-delay")) {
          $(this).attr("data-aos-delay", (index + 1) * 100);
        }
      });
    });
  }
  // aos
  AOS.init({
    offset: 20,
    delay: 50,
    duration: 750,
    once: true,
  });
  // lozad
  const observer = lozad(".lazy", {
    loaded: function (el) {
      el.parentNode.classList.add("loaded");
    },
  });
  observer?.observe();

  const $menuIconBox = $("header .container .menu-icon");
  const $menuIcon = $("header .container .menu-icon img");
  const $navMenu = $("header .container .nav-list");

  // Toggle nav menu
  $menuIconBox.on("click", function () {
    $navMenu.toggleClass("open");
    $menuIcon.attr(
      "src",
      $navMenu.hasClass("open")
        ? "assets/menu-open.png"
        : "assets/menu-close.png"
    );
  });

  // Main landing slider
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
});

// Toggle the sticky header postion
let header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (this.scrollY > 160) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});

// Toggle the active navabr link
const navLinks = document.querySelectorAll(`header .container .nav-list li`);

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((linkItem) => {
      linkItem.classList.remove("active");
    });
    link.classList.add("active");
  });
});

window.addEventListener("load", () => {
  const hash = window.location.hash.split("#")[1];
  if (hash) {
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.children[0].href.split("#")[1] === hash)
        link.classList.add("active");
    });
  }
});

// animate the count of the achievments
window.addEventListener("load", function () {
  const counters = document.querySelectorAll(".item-quntity");
  const speed = 200; // Adjust speed as necessary

  function animateCount(counter) {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;

      // Lower increment to make animation smoother
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

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          animateCount(counter);
          observer.unobserve(counter);
        }
      });
    },
    {
      threshold: 0.5, // Trigger animation when section is 50% in view
    }
  );

  counters.forEach((counter) => {
    console.log(+counter.innerHTML);
    const targetValue = counter.innerText;
    counter.setAttribute("data-target", targetValue);
    counter.innerText = "0";
    observer.observe(counter);
  });
});
