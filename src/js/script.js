"use strict"
const inputFrom = document.querySelector("#date-from");
const inputTo = document.querySelector("#date-to");
const dataPickerContainer = document.querySelector(".find-room__datapicker_inline");
const dataPicker = new AirDatepicker('.find-room__datapicker_inline', {
  range: true,
  dynamicRange: true,
  inline: false,
  visible: false,
  minDate: new Date(),
  buttons: [{
    content: "очистить",
    tagName: "div",
    onClick: (dataPicker) => {
      dataPicker.clear();
      dataPickerContainer.style.display = "none";
    }
  },
  {
    content: "Применить",
    tagName: "div",
    onClick: (dataPicker) => {
      dataPickerContainer.style.display = "none";
    }
  }],
  //   dateFormat(date) {
  //     return date.toLocaleString('ru', {
  //         year: 'numeric',
  //         day: '2-digit',
  //         month: 'long'
  //     });
  // }
});


function toggleDatePicker (event) {
  console.log(event.target);
  if (dataPickerContainer && dataPicker) {
    if (event.target !== inputFrom && event.target !== inputTo) {
      dataPickerContainer.style.display = 'none';
      console.log("return")
      return
    }
    if (getComputedStyle(dataPickerContainer).display === 'none') {
      dataPickerContainer.style.display = 'inline-block'
      console.log('NONA?');
    } else if (getComputedStyle(dataPickerContainer).display === 'block') {
        dataPickerContainer.style.display = 'none'
      }
    }
  }

// inputFrom.addEventListener("click", toggleDatePicker);
// inputTo.addEventListener("click", toggleDatePicker);
document.addEventListener("click", toggleDatePicker)