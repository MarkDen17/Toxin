"use strict"
const dataPickerContainer = document.querySelector(".find-room__datapicker_inline");
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
const counters = document.querySelectorAll('.item__quantity');

if (dataPickerContainer && dataPicker) {
  const inputFrom = document.querySelector("#date-from");
  const inputTo = document.querySelector("#date-to");
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

if (document.querySelector('#guests-count') && document.querySelector('.dropdown-menu')) {
  const container = document.querySelector('.guests');
  const input = document.querySelector('#guests-count');
  const applyButton = document.querySelector('.button-apply');
  input.addEventListener("click", function () {
    container.classList.toggle("_active")
  })
  input.addEventListener("keydown", function (event) {
    if (event.key === 'Enter')
      container.classList.toggle("_active")
  })
  applyButton.addEventListener("click", function () {
    container.classList.remove("_active")
  })
}

if (counters) {
  counters.forEach(counter => counter.addEventListener("click", function (event) {

    let value = parseInt(event.currentTarget.querySelector(".item__count").value);
    if (event.target.value === "plus") {
      value >= 99 ? value = 99 : value++;
      if (value > 0) {
        event.currentTarget.querySelector("[value = minus]").removeAttribute("disabled")
      }
    } else if (event.target.value === "minus") {
      value--;
      if (value <= 0) event.target.setAttribute("disabled", "")
    }
    event.currentTarget.querySelector(".item__count").value = value;
  })
  )
}

