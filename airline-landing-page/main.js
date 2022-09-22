//initialize WOW JS
new WOW().init();

//initialize Swippers
var aboutSwiper = new Swiper(".aboutSwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  freeMode: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    // when window width is <= 599px
    599: {
      slidesPerView: 2,
      spaceBetweenSlides: 50
    },
  }	
});
var planeSwiper = new Swiper(".planeSwiper", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

//Get The Elements
const menu = document.querySelector(".menu");
const menuBtn = document.querySelector(".menu-btn");

//Toggle the navbar menu on click Open/Close 
menuBtn.addEventListener("click", () => {
  menu.classList.toggle('nav-toggle');
});

//Get the current year and add it into the HTML
document.querySelector(".year").innerHTML = new Date().getFullYear();