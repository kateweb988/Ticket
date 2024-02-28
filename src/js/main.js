
window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(document.querySelectorAll('.tel'), function (input) {
    var keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___ ____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i)
      }
      var reg = matrix.substr(0, this.value.length).replace(/_+/g,
        function (a) {
          return "\\d{1," + a.length + "}"
        }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5) this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

  });

});

document.addEventListener("DOMContentLoaded", () => {
  var form = document.getElementById('form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var checkValid = validatInputs();
    if (checkValid) {
      // console.log('No Error');
      form.submit();
    } else {
      // console.log('Error');
    }
  });
  function validatInputs() {
    var inputs = form.querySelectorAll('.form-control');
    var valid = [];
    var radioCheck = false;
    var checkboxCheck = false;
    inputs.forEach(function (i, j) {
      if (i.getAttribute('type')) {
        var checkAttr = i.getAttribute('type');
      } else {
        var checkAttr = i.tagName;
      }

      switch (checkAttr) {
        case 'radio':
          // console.log(i.checked);
          if (!radioCheck) {
            if (!i.checked) {
              // i.parentNode.classList.add("error");
              radioCheck = false;
            } else {
              // i.parentNode.classList.remove("error");
              radioCheck = true;
            }
          }
          break;
        case 'checkbox':
          if (!checkboxCheck) {
            if (!i.checked) {
              // i.parentNode.classList.add("error");
              checkboxCheck = false;
            } else {
              // i.parentNode.classList.remove("error");
              checkboxCheck = true;
            }
          }

          break;
        case 'text':
          var _thisVal = i.value;
          if (i.getAttribute('data-name') == 'name') {
            if (!isNaN(i.value)) {
              _thisVal = '';
            }
          }
          if (_thisVal == '') {
            i.parentNode.classList.add("error");
            valid.push(i.getAttribute('name'));
          } else {
            i.parentNode.classList.remove("error");
          }
          break;
        case 'tel':
          if (i.value == '' || isNaN(i.value)) {
            i.parentNode.classList.add("error");
            valid.push(i.getAttribute('name'));
          } else {
            i.parentNode.classList.remove("error");
          }
          break;
        case 'email':
          var regEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
          if (i.value == '' || !regEmail.test(i.value)) {
            i.parentNode.classList.add("error");
            valid.push(i.getAttribute('name'));
          } else {
            i.parentNode.classList.remove("error");
          }
          break;
        case 'select':
          if (i[select.selectedIndex].value == '') {
            i.parentNode.classList.add("error");
            valid.push(i.getAttribute('name'));
          } else {
            i.parentNode.classList.remove("error");
          }
          break;
        default:
          if (i.value == '') {
            i.parentNode.classList.add("error");
            valid.push(i.getAttribute('name'));
          } else {
            i.parentNode.classList.remove("error");
          }
          break;
      }
    });
    if (!checkboxCheck) {
      // console.log(document.getElementsByClassName('checkbox')[0].classList);
      document.getElementsByClassName('checkbox')[0].classList.add("error");
      valid.push('checkbox');
    } else {
      document.getElementsByClassName('checkbox')[0].classList.remove("error");
    }
    if (!radioCheck) {
      // console.log(document.getElementsByClassName('radiocheck')[0].classList);
      document.getElementsByClassName('radiocheck')[0].classList.add("error");
      valid.push('radio');
    } else {
      document.getElementsByClassName('radiocheck')[0].classList.remove("error");
    }

    if (valid.length > 0) {
      // console.log(valid.length);
      return false;
    } else {
      return true;
    }

  }
});

document.addEventListener("DOMContentLoaded", function () {
  var lazyloadImages = document.querySelectorAll("img.lazy");
  var lazyloadThrottleTimeout;
  function lazyload() {
    if (lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout);
    }
    lazyloadThrottleTimeout = setTimeout(function () {
      var scrollTop = window.pageYOffset;
      lazyloadImages.forEach(function (img) {
        if (img.offsetTop < (window.innerHeight + scrollTop)) {
          img.src = img.dataset.src;
          img.classList.remove('lazy');
        }
      });
      if (lazyloadImages.length == 0) {
        document.removeEventListener("scroll", lazyload);
        window.removeEventListener("resize", lazyload);
        window.removeEventListener("orientationChange", lazyload);
      }
    }, 20);
  }
  document.addEventListener("scroll", lazyload);
  window.addEventListener("resize", lazyload);
  window.addEventListener("orientationChange", lazyload);
});

document.addEventListener("DOMContentLoaded", () => {
  let menuBtn = document.querySelector('.menu-btn');
  let menu = document.querySelector('.menu');
  menuBtn.addEventListener('click', function () {
    menuBtn.classList.toggle('active');
    menu.classList.toggle('active');
  });
});

