const inputs = document.querySelectorAll('.date-mask');

const dateInputMask = function (element) {
  element.addEventListener('keypress', function (event) {
    if (event.keyCode < 47 || event.keyCode > 57) {
      event.preventDefault();
    }

    let length = element.value.length;

    // If we're at a particular place, let the user type the slash
    // i.e., 12/12/1212
    if (length !== 1 || length !== 3) {
      if (event.keyCode == 47) {
        event.preventDefault();
      }
    }

    // If they don't add the slash, do it for them...
    if (length === 2) {
      element.value += '/';
    }

    // If they don't add the slash, do it for them...
    if (length === 5) {
      element.value += '/';
    }

    if (length > 9) {
      event.preventDefault();
    }
  });
};

inputs.forEach(input => dateInputMask(input))