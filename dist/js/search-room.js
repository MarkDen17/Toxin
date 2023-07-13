"use strict"
if (document.getElementById('slider') && document.getElementById('slider-values')) {
  const slider = document.getElementById('slider');
  const slederValues = document.getElementById('slider-values')

  noUiSlider.create(slider, {
    start: [5000, 10000],
    connect: true,
    step: 100,
    range: {
      'min': 0,
      'max': 30000
    },
    format: {
      to: function (value) {
        return Math.round(value);
      },
      from: function (value) {
        return Number(value);
      }
    }
  });

  slider.noUiSlider.on('update', function (values, handle) {
    slederValues.innerHTML = `${values[0].toLocaleString('ru-RU')}&#8381; - ${values[1].toLocaleString('ru-RU')}&#8381;`
  });
}

if (document.querySelector(".room-filter__additional-facilities")) {
  const checkboxMenuButton = document.querySelector(".additional-facilities__title")
  checkboxMenuButton.addEventListener("click", function () {
    const container = document.querySelector(".room-filter__additional-facilities .container")
    if (checkboxMenuButton && checkboxMenuButton.dataset.open) {
      if (checkboxMenuButton.dataset.open === "false") {
        checkboxMenuButton.dataset.open = "true";
        container.classList.toggle('_active')
        return
      };
      if (checkboxMenuButton.dataset.open === "true") {
        checkboxMenuButton.dataset.open = "false"
        container.classList.toggle('_active')
        return
      };
    }
  })
}

const swiper = new Swiper('.swiper', {
  // Optional parameters
  // direction: 'vertical',
  loop: false,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// mobile filter
if (document.querySelector(".room-filter") && document.querySelector(".filter-button")) {
  const button = document.querySelector(".filter-button")
  const roomFilter = document.querySelector(".room-filter")
  const backdrop = document.querySelector(".search-room-main__backdrop")
  button.addEventListener("click", function () {
    roomFilter.classList.add("room-filter_open")
    backdrop.style.display = "block"
  })
}

if (document.querySelector(".close-button")) {
  const button = document.querySelector(".close-button")
  const roomFilter = document.querySelector(".room-filter")
  const backdrop = document.querySelector(".search-room-main__backdrop")
  button.addEventListener("click", function () {
    roomFilter.classList.remove("room-filter_open")
    backdrop.style.display = ""
  })
}

// Dropdown counter
const $counters = document.querySelectorAll('.item__quantity');
if (document.querySelector('.dropdown-menu')) {
  const $dropdowns = document.querySelectorAll('.dropdown-menu')
  $dropdowns.forEach(dropdown => {
    const $container = dropdown.parentElement;
    const $input = $container.querySelector('input');
    $input.addEventListener("click", function () {
      $container.classList.toggle("_active")
    })
    $input.addEventListener("keydown", function (event) {
      if (event.key === 'Enter')
        $container.classList.toggle("_active")
    })
    document.addEventListener("click", function (event) {
      if ($container.classList.contains("_active") && !event.target.closest(".guests") && !event.target.closest(".facilities")) {
        $container.classList.remove("_active")
      }
    })
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
//

const dataPickerContainer = document.querySelector(".find-room__datapicker_inline");
const input = document.querySelector('.dates-range__input')
const dataPicker = new AirDatepicker('.dates-range__input', {
  range: true,
  dynamicRange: true,
  inline: false,
  multipleDatesSeparator: " - ",
  visible: false,
  timepicker: false,
  minDate: new Date(),
  position: 'bottom center',
  dateFormat: 'dd MMM',
  buttons: [{
    content: "очистить",
    tagName: "div",
    onClick: (dataPicker) => {
      dataPicker.clear();
      dataPicker.hide();
    }
  },
  {
    content: "Применить",
    tagName: "div",
    onClick: (dataPicker) => {
      dataPicker.hide();
    }
  }]
});
