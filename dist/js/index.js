"use strict"
const dataPickerContainer = document.querySelector(".find-room__datapicker_inline");
const inputFrom = document.querySelector("#date-from");
const inputTo = document.querySelector("#date-to");
const dataPicker = new AirDatepicker('.find-room__datapicker_inline', {
  range: true,
  dynamicRange: true,
  inline: false,
  visible: false,
  timepicker: false,
  minDate: new Date(),
  onSelect({ date }) {
    if (date[0]) inputFrom.value = date[0].toLocaleString('ru').slice(0, 10);
    if (date[1]) inputTo.value = date[1].toLocaleString('ru').slice(0, 10);
  },
  buttons: [{
    content: "очистить",
    tagName: "div",
    onClick: (dataPicker) => {
      dataPicker.clear();
      inputFrom.value = "";
      inputTo.value = ""
      dataPickerContainer.style.display = "none";
    }
  },
  {
    content: "Применить",
    tagName: "div",
    onClick: (dataPicker) => {
      dataPickerContainer.style.display = "none";
    }
  }]
});

if (dataPickerContainer && dataPicker) {

  function toggleDatePicker(event) {
    const inputs = document.querySelectorAll('.dates__input');
    if ([...inputs].includes(event.target)) {
      if (getComputedStyle(dataPickerContainer).display === 'none') {
        dataPickerContainer.style.display = 'block'
        return
      } else if (getComputedStyle(dataPickerContainer).display === 'block') {
        dataPickerContainer.style.display = 'none'
        return
      }
    }
    if (getComputedStyle(dataPickerContainer).display === 'block' && !event.target.closest(".air-datepicker")) {
      dataPickerContainer.style.display = 'none'
    }
  }
  document.addEventListener("click", toggleDatePicker)
}


// Dropdown counter
const $counters = document.querySelectorAll('.item__quantity');
if (document.querySelector('.dropdown-menu')) {
  const $container = document.querySelector('.dropdown-menu').parentElement;
  const $input = $container.querySelector('input');
  const $applyButton = $container.querySelector('.apply-button');
  $input.addEventListener("click", function () {
    $container.classList.toggle("_active")
  })
  $input.addEventListener("keydown", function (event) {
    if (event.key === 'Enter')
      $container.classList.toggle("_active")
  })
  document.addEventListener("click", function (event) {
    if ($container.classList.contains("_active") && event.target === $applyButton || !event.target.closest(".guests")) {
      $container.classList.remove("_active")
    }
  })


}

if ($counters) {
  $counters.forEach(counter => counter.addEventListener("click", dropDownHandler)
  )
}

function dropDownHandler(event) {
  const $container = this.closest('.dropdown-menu').parentElement;
  const $input = $container.querySelector('input');
  const $itemCount = this.querySelector(".item__count");
  let itemCountValue = parseInt($itemCount.value);

  if (event.target.value === "plus") {
    itemCountValue >= 99 ? itemCountValue = 99 : itemCountValue++;
    if (this.querySelector("[value = minus]").hasAttribute("disabled")) {
      this.querySelector("[value = minus]").removeAttribute("disabled");
    }
  } else if (event.target.value === "minus") {
    itemCountValue--;
    if (itemCountValue === 0) {
      event.target.setAttribute("disabled", "");
    }
  }
  $itemCount.value = itemCountValue;
  const countsValueArray = [...$container.querySelectorAll('.item__count')].map(item => Number(item.value));
  let countsValueSum = countsValueArray.reduce((sum, item) => sum + item, 0);
  if ($input.matches("#guests-count")) {
    switch (countsValueSum) {
      case 0:
        $input.value = `Сколько гостей`;
        $container.querySelector('.clear-button').classList.add("hidden-button");
        break;
      case 1:
        $input.value = `${countsValueSum} гость`;
        $container.querySelector('.clear-button').classList.remove("hidden-button");
        break;
      case 2:
      case 3:
      case 4:
        $input.value = `${countsValueSum} гостя`
        break;
      default:
        $input.value = `${countsValueSum} гостей`
    }
    switch (countsValueArray[2]) {
      case 0:
        $input.value += ``;
        break;
      case 1:
        $input.value += ` ${countsValueArray[2]} младенец`;
        break;
      case 2:
      case 3:
      case 4:
        $input.value += ` ${countsValueArray[2]} младенца`;
        break;
      default:
        $input.value += ` ${countsValueArray[2]} младенцев`
    }
  } else if ($input.matches("#facilities-count")) {
    switch (countsValueArray[0]) {
      case 0:
        $input.value = ``
        break;
      case 1:
        $input.value = `${countsValueArray[0]} спальня `
        break;
      case 2:
      case 3:
      case 4:
        $input.value = `${countsValueArray[0]} спальни `
        break;
      default:
        $input.value = `${countsValueArray[0]} спален `
    }
    switch (countsValueArray[1]) {
      case 0:
        $input.value += ``
        break;
      case 1:
        $input.value += `${countsValueArray[1]} кровать `
        break;
      case 2:
      case 3:
      case 4:
        $input.value += `${countsValueArray[1]} кровати `
        break;
      default:
        $input.value += `${countsValueArray[1]} кроватей `
    }
    switch (countsValueArray[2]) {
      case 0:
        $input.value += ` `
        break;
      case 1:
        $input.value += `${countsValueArray[2]} ванная`
        break;
      case 2:
      case 3:
      case 4:
        $input.value += `${countsValueArray[2]} ванны`
        break;
      default:
        $input.value += `${countsValueArray[2]} ванн`
    }
  }
}
// Clear button
document.querySelector('.clear-button').addEventListener('click', function () {
  $counters.forEach(element => element.querySelector('input').value = 0);
  document.querySelector('#guests-count').value = '';
  this.classList.add("hidden-button");
})
////////////////////
