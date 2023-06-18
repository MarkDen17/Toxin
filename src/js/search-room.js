
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

if (document.querySelector(".room-filter__facilities")) {
  const dropdownMenu = document.querySelector(".facilities__label");
  dropdownMenu.addEventListener("click", function () {
    document.querySelector(".room-filter__facilities").classList.toggle("_active")
  })
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