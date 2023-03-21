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

const enterButton = document.querySelector('.header__login-button');
enterButton.addEventListener("click", signUp);
function signUp(event) {
  event.preventDefault();
  const menu = document.querySelector('.header__login-menu');
  const userPanel = document.querySelector('.header__user-panel');
  menu.style.display = 'none';
  userPanel.style.display = 'flex';
}

const button = document.querySelector('.footer__input-arrow');
const form = document.querySelector('form');
button.addEventListener('click', function () {
  console.log('клиик на кнопку');
  form.submit();
})

form.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log('Форма отправлена');
})