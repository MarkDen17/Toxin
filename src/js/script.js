"use strict"

const burgerIcon = document.querySelector('.burger-icon');
const headerMenu = document.querySelector('.header__menu');
burgerIcon.addEventListener("click", function () {
  if (burgerIcon && burgerIcon.dataset.open) {
    if (burgerIcon.dataset.open === "false") {
      burgerIcon.dataset.open = "true";
      headerMenu.classList.toggle('_active')
      return
    };
    if (burgerIcon.dataset.open === "true") {
      burgerIcon.dataset.open = "false"
      headerMenu.classList.toggle('_active')
      return
    };
  }
})
