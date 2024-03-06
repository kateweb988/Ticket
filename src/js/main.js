window.addEventListener("DOMContentLoaded", function () {
  var form = document.querySelector('.formWithValidation')
  var validateBtn = form.querySelector('.validateBtn')
  var from = form.querySelector('.from')
  var password = form.querySelector('.password')
  var passwordConfirmation = form.querySelector('.passwordConfirmation')
  var where = form.querySelector('.where')
  var message = form.querySelector('.message')
  var fields = form.querySelectorAll('.field')

  var generateError = function (text) {
    var error = document.createElement('div')
    error.className = 'error'
    error.style.color = 'red'
    error.innerHTML = text
    return error
  }

  var removeValidation = function () {
    var errors = form.querySelectorAll('.error')

    for (var i = 0; i < errors.length; i++) {
      errors[i].remove()
    }
  }

  var checkFieldsPresence = function () {
    for (var i = 0; i < fields.length; i++) {
      if (!fields[i].value) {
        console.log('field is blank', fields[i])
        var error = generateError('Это обязательное поле')
        form[i].parentElement.insertBefore(error, fields[i])
      }
    }
  }

  var checkPasswordMatch = function () {
    if (password.value !== passwordConfirmation.value) {
      console.log('not equals')
      var error = generateError('Password doesnt match')
      password.parentElement.insertBefore(error, password)
    }
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault()

    removeValidation()

    checkFieldsPresence()

    checkPasswordMatch()
  })
})
window.addEventListener("DOMContentLoaded", function () {
  var form = document.querySelector('.formWithValidation2')
  var validateBtn = form.querySelector('.validateBtn2')
  var from = form.querySelector('.from')
  var password = form.querySelector('.password')
  var passwordConfirmation = form.querySelector('.passwordConfirmation')
  var where = form.querySelector('.where')
  var message = form.querySelector('.message')
  var fields = form.querySelectorAll('.field')

  var generateError = function (text) {
    var error = document.createElement('div')
    error.className = 'error'
    error.style.color = 'red'
    error.innerHTML = text
    return error
  }

  var removeValidation = function () {
    var errors = form.querySelectorAll('.error')

    for (var i = 0; i < errors.length; i++) {
      errors[i].remove()
    }
  }

  var checkFieldsPresence = function () {
    for (var i = 0; i < fields.length; i++) {
      if (!fields[i].value) {
        console.log('field is blank', fields[i])
        var error = generateError('Это обязательное поле')
        form[i].parentElement.insertBefore(error, fields[i])
      }
    }
  }

  var checkPasswordMatch = function () {
    if (password.value !== passwordConfirmation.value) {
      console.log('not equals')
      var error = generateError('Password doesnt match')
      password.parentElement.insertBefore(error, password)
    }
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault()

    removeValidation()

    checkFieldsPresence()

    checkPasswordMatch()
  })
})
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
  let randomArr = [
    { id: 1, title: "Все площадки" },
    { id: 2, title: "Урбан" },
    { id: 3, title: "VK Gipsy" },
    { id: 4, title: "Мумий Тролль Music Bar" },
    { id: 5, title: "Крокус Сити Холл" },
    { id: 6, title: "Зарядье" },
    { id: 7, title: "VK Stadium (ex. Adrenaline Stadium)" },
    { id: 8, title: "1930 Moscow" },
    { id: 9, title: "Aglomerat" },
    { id: 10, title: "16 Тонн" },
    { id: 11, title: "MTC Live Холл" },
    { id: 12, title: "Mongo DB" },
    { id: 13, title: "firebase" },
    { id: 14, title: "Materialize" },
    { id: 15, title: "flexbox" }
  ]

  function multiSelect(object) {

    const config = {
      elementId: object.id,
      data: (typeof object.data === "object") ? object.data : [],
      isFlexible: (typeof object.isFlexible === "boolean") ? object.isFlexible : false,
      isSearchable: (typeof object.isSearchable === "boolean") ? object.isSearchable : false,
      isHighlighted: (typeof object.isHighlighted === "boolean") ? object.isHighlighted : false,
      multiSelect: (typeof object.multiSelect === "boolean") ? object.multiSelect : true
    }

    // pick root element
    const root = document.getElementById(config.elementId)

    // create main elements
    let container = document.createElement("div")
    let searchField = document.createElement("input")
    let selectList = document.createElement("ul")
    let selectedItems = document.createElement("ul")
    let caret = document.createElement("div")

    // define global vars for arrow navigation event
    let liSelected
    let index = -1

    // create empty array for selected elements
    let arrOfItems = []

    // add classes for created elements
    container.className = "sel-container"
    searchField.className = "sel-btn-select"
    selectList.className = "sel-select-list"
    selectedItems.className = "sel-item-collection"
    caret.className = "sel-caret-down"

    if (!config.isFlexible) {
      selectedItems.classList.add("sel-item-collection-flexible")
    }

    // define search field attributes
    searchField.type = "text"
    searchField.placeholder = "Не выбрано"

    if (config.multiSelect) {

      // create select list
      if (config.data.length !== 0 && typeof config.data == "object") {
        for (let i = 0; i < config.data.length; i++) {
          // create select list elements
          let li = document.createElement("li")
          let checkBox = document.createElement("input")
          let listText = document.createElement("span")

          // add attributes to select list elements 
          checkBox.type = "checkbox"
          checkBox.id = config.data[i].id
          li.className = "sel-select-item"
          listText.className = "sel-list-item-text"
          checkBox.className = "sel-item-checkbox"
          listText.textContent = config.data[i].title

          // append checkbox inside list item
          li.append(checkBox)
          li.append(listText)
          // append list item inside parent ul
          selectList.append(li)

          // add click event to each list item
          li.addEventListener("click", (e) => {
            if (e.target !== e.currentTarget) return;
            listText.innerHTML = config.data[i].title
            if (!e.target.firstElementChild.checked) {
              e.target.classList.add("sel-bluish")
              searchField.classList.add("sel-small-search")
              searchField.placeholder = ""

              let name = document.createElement("span")
              let deleteBtn = document.createElement("span")
              deleteBtn.textContent = "×"
              deleteBtn.className = "sel-btn-delete"
              name.className = "sel-btn-text"
              name.id = e.target.textContent
              name.textContent = e.target.textContent
              checkBox.checked = true
              searchField.value = ""
              searchField.setAttribute("data-items", arrOfItems[-1])

              selectedItems.classList.add("sel-extra-padding")

              name.append(deleteBtn)
              selectedItems.prepend(name)
              arrOfItems.push(e.target.textContent)



              for (let i = 0; i < selectList.children.length; i++) {
                selectList.children[i].style.display = "block"
                searchItems[i].classList.remove("sel-selected")
                index = -1;
              }

              // console.log(selectList.children.length)

              deleteBtn.addEventListener("click", (e) => {
                e.stopPropagation()
                for (let i = 0; i < selectList.children.length; i++) {
                  if (e.target.parentElement.childNodes[0].textContent === selectList.children[i].textContent) {
                    selectList.children[i].classList.remove("sel-bluish")
                  }
                }
                for (let i = 0; i < selectedItems.children.length; i++) {
                  if (arrOfItems[i] === e.target.parentElement.childNodes[0].textContent) {
                    arrOfItems.splice(i, 1)
                  }
                }
                console.log(selectedItems.children.length)
                if (selectedItems.children.length === 2) {
                  selectedItems.classList.remove("sel-extra-padding")
                  searchField.classList.remove("sel-small-search")
                  searchField.style.display = "block"
                  searchField.placeholder = "Select item"
                  searchField.value = ""
                }
                e.target.parentElement.remove()
                checkBox.checked = false
              })
            } else {
              e.target.classList.remove("sel-bluish")
              checkBox.checked = false
              for (let i = 0; i < selectedItems.children.length; i++) {
                if (selectedItems.children[i].id === e.target.textContent) {
                  selectedItems.children[i].remove()
                }

                if (arrOfItems[i] === e.target.textContent) {
                  arrOfItems.splice(i, 1)
                }
              }

              for (let i = 0; i < selectList.children.length; i++) {
                searchItems[i].classList.remove("sel-selected")
                index = -1;
              }

              if (selectedItems.children.length === 1) {
                selectedItems.classList.remove("sel-extra-padding")
                searchField.classList.remove("sel-small-search")
                searchField.style.display = "block"
                searchField.placeholder = "Select item"
                searchField.textContent = "Select"
                searchField.value = ""
              }
            }
            console.log(arrOfItems)

          })
        }
      }

      let searchItems = selectList.querySelectorAll(".sel-select-item")

      searchField.addEventListener("keyup", () => {
        let expr = searchField.value.toLowerCase()
        for (let i = 0; i < searchItems.length; i++) {
          if (searchItems[i].textContent.toLowerCase().indexOf(expr) !== -1) {
            searchItems[i].style.display = "block"
            if (config.isHighlighted) {
              let pieceOfString = searchItems[i].textContent.replace(expr, "<span style='background-color: #f5edc1'>" + expr + "</span>")
              searchItems[i].children[1].innerHTML = pieceOfString
            }
          } else {
            searchItems[i].style.display = "none"
          }
        }
      })

      // append elements to their parents
      container.append(selectedItems)
      selectedItems.append(searchField)
      container.append(selectList)
      root.append(container)

      searchField.addEventListener("click", (e) => {
        if (!e.target.parentElement.nextElementSibling.classList.contains("sel-show")) {
          e.target.parentElement.nextElementSibling.classList.add("sel-show")
        }
      })

      selectedItems.addEventListener("click", (e) => {
        if (e.target !== e.currentTarget) return;
        if (!e.target.nextElementSibling.classList.contains("sel-show")) {
          e.target.nextElementSibling.classList.add("sel-show")
        }
        searchField.focus()
      })

      document.addEventListener("click", (e) => {
        if (!e.target.classList.contains("sel-btn-select") && !e.target.classList.contains("sel-select-item") && !e.target.classList.contains("sel-item-collection") && !e.target.classList.contains("sel-btn-delete") && !e.target.classList.contains("sel-btn-text")) {
          let lists = document.querySelectorAll(".sel-select-list")
          for (let i = 0; i < lists.length; i++) {
            lists[i].classList.remove("sel-show")
          }
          searchField.value = ""
          for (let i = 0; i < searchItems.length; i++) {
            searchItems[i].style.display = "block"
            searchItems[i].classList.remove("sel-selected")
            index = -1;
          }
        }
      })

      document.addEventListener("keydown", function (e) {
        let len = selectList.getElementsByTagName('li').length - 1
        if (e.which === 40) {
          index++
          console.log(index)
          //down 
          if (liSelected) {
            removeClass(liSelected, "sel-selected")
            next = selectList.getElementsByTagName("li")[index]
            if (typeof next !== undefined && index <= len) {
              liSelected = next
            } else {
              index = 0
              liSelected = selectList.getElementsByTagName("li")[0]
            }
            addClass(liSelected, "sel-selected")
          } else {
            index = 0
            liSelected = selectList.getElementsByTagName("li")[0]
            addClass(liSelected, "sel-selected")
          }
        } else if (e.which === 38) {
          //up
          if (liSelected) {
            removeClass(liSelected, "sel-selected")
            index--
            console.log(index)
            next = selectList.getElementsByTagName("li")[index]
            if (typeof next !== undefined && index >= 0) {
              liSelected = next
            } else {
              index = len
              liSelected = selectList.getElementsByTagName("li")[len]
            }
            addClass(liSelected, "sel-selected")
          } else {
            index = 0
            liSelected = selectList.getElementsByTagName("li")[len]
            addClass(liSelected, "sel-selected")
          }
        }
      }, false)

      function removeClass(el, className) {
        if (el.classList) {
          el.classList.remove(className)
        } else {
          el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
        }
      }

      function addClass(el, className) {
        if (el.classList) {
          el.classList.add(className)
        } else {
          el.className += " " + className
        }
      }
    } else {
      let innerSearch = document.createElement("input")
      searchField.style.cursor = "default"
      searchField.setAttribute("readonly", "true")

      innerSearch.setAttribute("type", "text")
      innerSearch.setAttribute("autocomplete", "off")
      innerSearch.setAttribute("placeholder", "Поиск... ")
      innerSearch.setAttribute("class", "sel-inner-search")

      for (let i = 0; i < config.data.length; i++) {
        let li = document.createElement("li")
        li.className = "sel-select-item"
        li.setAttribute("title", config.data[i].title)
        li.textContent = config.data[i].title

        li.addEventListener("click", (e) => {
          searchField.value = e.target.textContent
          searchField.name = e.target.textContent
          innerSearch.value = ""
          e.target.innerHTML = config.data[i].title
          selectList.classList.remove("sel-show")
          caret.classList.remove("sel-caret-up")

          for (let i = 0; i < selectList.children.length; i++) {
            selectList.children[i].style.display = "block"
          }
        })

        selectList.append(li)

      }

      searchField.addEventListener("click", (e) => {
        if (!e.target.parentElement.nextElementSibling.classList.contains("sel-show")) {
          e.target.parentElement.nextElementSibling.classList.add("sel-show")
          caret.classList.add("sel-caret-up")
          innerSearch.focus()
        } else {
          e.target.parentElement.nextElementSibling.classList.remove("sel-show")
          caret.classList.remove("sel-caret-up")
          caret.classList.add("sel-caret-down")
        }
      })

      document.addEventListener("click", (e) => {
        let lists = document.querySelectorAll(".sel-select-list")

        if (e.target.classList.contains("sel-inner-search")) {
          e.target.parentElement.classList.add("sel-show")
        }

        if (!e.target.classList.contains("sel-inner-search") && !e.target.classList.contains("sel-btn-select")) {

          caret.classList.remove("sel-caret-up")
          caret.classList.add("sel-caret-down")


          for (let i = 0; i < selectList.children.length; i++) {
            selectList.children[i].style.display = "block"
            // searchItems[i].classList.remove("sel-selected")
            // index = -1;
          }

          for (let i = 0; i < config.data.length; i++) {
            selectList.children[i + 1].innerHTML = config.data[i].title
          }

          // searchField.value = ""
          innerSearch.value = ""
          // for(let i = 0; i < searchItems.length; i++) {
          //     searchItems[i].style.display = "block"
          //     searchItems[i].classList.remove("sel-selected")
          //     index = -1;
          // }
        }
      })

      innerSearch.addEventListener("keyup", (e) => {
        let expr = innerSearch.value.toLowerCase()
        for (let i = 1; i < selectList.children.length; i++) {
          if (selectList.children[i].textContent.toLowerCase().indexOf(expr) !== -1) {
            selectList.children[i].style.display = "block"
            let pieceOfString = selectList.children[i].textContent.replace(expr, "<span style='background-color: #f5edc1'>" + expr + "</span>")
            selectList.children[i].innerHTML = pieceOfString
          } else {
            selectList.children[i].style.display = "none"
          }
        }
      })

      selectedItems.append(caret)
      selectList.prepend(innerSearch)
      selectedItems.append(searchField)
      container.append(selectedItems)
      container.append(selectList)
      root.append(container)
    }
  }


  // function FlexibleSelectBox () {
  //     if(!el.checked) {
  //         selectedItems.classList.add("sel-item-collection-flexible")
  //     } else {
  //         selectedItems.classList.remove("sel-item-collection-flexible")
  //     }
  // }

  multiSelect({
    id: "some2",
    data: randomArr,
    isFlexible: true,
    isSearchable: true,
    isHighlighted: true,
    multiSelect: false
  })

});
document.addEventListener("DOMContentLoaded", () => {
  let randomArr = [
    { id: 1, title: "Все жанры" },
    { id: 2, title: "#Поп" },
    { id: 3, title: "#Рок" },
    { id: 4, title: "#Классическая музыка" },
    { id: 5, title: "#Реп" }
  ]

  function multiSelect(object) {

    const config = {
      elementId: object.id,
      data: (typeof object.data === "object") ? object.data : [],
      isFlexible: (typeof object.isFlexible === "boolean") ? object.isFlexible : false,
      isSearchable: (typeof object.isSearchable === "boolean") ? object.isSearchable : false,
      isHighlighted: (typeof object.isHighlighted === "boolean") ? object.isHighlighted : false,
      multiSelect: (typeof object.multiSelect === "boolean") ? object.multiSelect : true
    }

    // pick root element
    const root = document.getElementById(config.elementId)

    // create main elements
    let container = document.createElement("div")
    let searchField = document.createElement("input")
    let selectList = document.createElement("ul")
    let selectedItems = document.createElement("ul")
    let caret = document.createElement("div")

    // define global vars for arrow navigation event
    let liSelected
    let index = -1

    // create empty array for selected elements
    let arrOfItems = []

    // add classes for created elements
    container.className = "sel-container"
    searchField.className = "sel-btn-select"
    selectList.className = "sel-select-list"
    selectedItems.className = "sel-item-collection"
    caret.className = "sel-caret-down"

    if (!config.isFlexible) {
      selectedItems.classList.add("sel-item-collection-flexible")
    }

    // define search field attributes
    searchField.type = "text"
    searchField.placeholder = "Не выбрано"

    if (config.multiSelect) {

      // create select list
      if (config.data.length !== 0 && typeof config.data == "object") {
        for (let i = 0; i < config.data.length; i++) {
          // create select list elements
          let li = document.createElement("li")
          let checkBox = document.createElement("input")
          let listText = document.createElement("span")

          // add attributes to select list elements 
          checkBox.type = "checkbox"
          checkBox.id = config.data[i].id
          li.className = "sel-select-item"
          listText.className = "sel-list-item-text"
          checkBox.className = "sel-item-checkbox"
          listText.textContent = config.data[i].title

          // append checkbox inside list item
          li.append(checkBox)
          li.append(listText)
          // append list item inside parent ul
          selectList.append(li)

          // add click event to each list item
          li.addEventListener("click", (e) => {
            if (e.target !== e.currentTarget) return;
            listText.innerHTML = config.data[i].title
            if (!e.target.firstElementChild.checked) {
              e.target.classList.add("sel-bluish")
              searchField.classList.add("sel-small-search")
              searchField.placeholder = ""

              let name = document.createElement("span")
              let deleteBtn = document.createElement("span")
              deleteBtn.textContent = "×"
              deleteBtn.className = "sel-btn-delete"
              name.className = "sel-btn-text"
              name.id = e.target.textContent
              name.textContent = e.target.textContent
              checkBox.checked = true
              searchField.value = ""
              searchField.setAttribute("data-items", arrOfItems[-1])

              selectedItems.classList.add("sel-extra-padding")

              name.append(deleteBtn)
              selectedItems.prepend(name)
              arrOfItems.push(e.target.textContent)



              for (let i = 0; i < selectList.children.length; i++) {
                selectList.children[i].style.display = "block"
                searchItems[i].classList.remove("sel-selected")
                index = -1;
              }

              // console.log(selectList.children.length)

              deleteBtn.addEventListener("click", (e) => {
                e.stopPropagation()
                for (let i = 0; i < selectList.children.length; i++) {
                  if (e.target.parentElement.childNodes[0].textContent === selectList.children[i].textContent) {
                    selectList.children[i].classList.remove("sel-bluish")
                  }
                }
                for (let i = 0; i < selectedItems.children.length; i++) {
                  if (arrOfItems[i] === e.target.parentElement.childNodes[0].textContent) {
                    arrOfItems.splice(i, 1)
                  }
                }
                console.log(selectedItems.children.length)
                if (selectedItems.children.length === 2) {
                  selectedItems.classList.remove("sel-extra-padding")
                  searchField.classList.remove("sel-small-search")
                  searchField.style.display = "block"
                  searchField.placeholder = "Select item"
                  searchField.value = ""
                }
                e.target.parentElement.remove()
                checkBox.checked = false
              })
            } else {
              e.target.classList.remove("sel-bluish")
              checkBox.checked = false
              for (let i = 0; i < selectedItems.children.length; i++) {
                if (selectedItems.children[i].id === e.target.textContent) {
                  selectedItems.children[i].remove()
                }

                if (arrOfItems[i] === e.target.textContent) {
                  arrOfItems.splice(i, 1)
                }
              }

              for (let i = 0; i < selectList.children.length; i++) {
                searchItems[i].classList.remove("sel-selected")
                index = -1;
              }

              if (selectedItems.children.length === 1) {
                selectedItems.classList.remove("sel-extra-padding")
                searchField.classList.remove("sel-small-search")
                searchField.style.display = "block"
                searchField.placeholder = "Select item"
                searchField.textContent = "Select"
                searchField.value = ""
              }
            }
            console.log(arrOfItems)

          })
        }
      }

      let searchItems = selectList.querySelectorAll(".sel-select-item")

      searchField.addEventListener("keyup", () => {
        let expr = searchField.value.toLowerCase()
        for (let i = 0; i < searchItems.length; i++) {
          if (searchItems[i].textContent.toLowerCase().indexOf(expr) !== -1) {
            searchItems[i].style.display = "block"
            if (config.isHighlighted) {
              let pieceOfString = searchItems[i].textContent.replace(expr, "<span style='background-color: #f5edc1'>" + expr + "</span>")
              searchItems[i].children[1].innerHTML = pieceOfString
            }
          } else {
            searchItems[i].style.display = "none"
          }
        }
      })

      // append elements to their parents
      container.append(selectedItems)
      selectedItems.append(searchField)
      container.append(selectList)
      root.append(container)

      searchField.addEventListener("click", (e) => {
        if (!e.target.parentElement.nextElementSibling.classList.contains("sel-show")) {
          e.target.parentElement.nextElementSibling.classList.add("sel-show")
        }
      })

      selectedItems.addEventListener("click", (e) => {
        if (e.target !== e.currentTarget) return;
        if (!e.target.nextElementSibling.classList.contains("sel-show")) {
          e.target.nextElementSibling.classList.add("sel-show")
        }
        searchField.focus()
      })

      document.addEventListener("click", (e) => {
        if (!e.target.classList.contains("sel-btn-select") && !e.target.classList.contains("sel-select-item") && !e.target.classList.contains("sel-item-collection") && !e.target.classList.contains("sel-btn-delete") && !e.target.classList.contains("sel-btn-text")) {
          let lists = document.querySelectorAll(".sel-select-list")
          for (let i = 0; i < lists.length; i++) {
            lists[i].classList.remove("sel-show")
          }
          searchField.value = ""
          for (let i = 0; i < searchItems.length; i++) {
            searchItems[i].style.display = "block"
            searchItems[i].classList.remove("sel-selected")
            index = -1;
          }
        }
      })

      document.addEventListener("keydown", function (e) {
        let len = selectList.getElementsByTagName('li').length - 1
        if (e.which === 40) {
          index++
          console.log(index)
          //down 
          if (liSelected) {
            removeClass(liSelected, "sel-selected")
            next = selectList.getElementsByTagName("li")[index]
            if (typeof next !== undefined && index <= len) {
              liSelected = next
            } else {
              index = 0
              liSelected = selectList.getElementsByTagName("li")[0]
            }
            addClass(liSelected, "sel-selected")
          } else {
            index = 0
            liSelected = selectList.getElementsByTagName("li")[0]
            addClass(liSelected, "sel-selected")
          }
        } else if (e.which === 38) {
          //up
          if (liSelected) {
            removeClass(liSelected, "sel-selected")
            index--
            console.log(index)
            next = selectList.getElementsByTagName("li")[index]
            if (typeof next !== undefined && index >= 0) {
              liSelected = next
            } else {
              index = len
              liSelected = selectList.getElementsByTagName("li")[len]
            }
            addClass(liSelected, "sel-selected")
          } else {
            index = 0
            liSelected = selectList.getElementsByTagName("li")[len]
            addClass(liSelected, "sel-selected")
          }
        }
      }, false)

      function removeClass(el, className) {
        if (el.classList) {
          el.classList.remove(className)
        } else {
          el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
        }
      }

      function addClass(el, className) {
        if (el.classList) {
          el.classList.add(className)
        } else {
          el.className += " " + className
        }
      }
    } else {
      let innerSearch = document.createElement("input")
      searchField.style.cursor = "default"
      searchField.setAttribute("readonly", "true")

      innerSearch.setAttribute("type", "text")
      innerSearch.setAttribute("autocomplete", "off")
      innerSearch.setAttribute("placeholder", "Поиск...")
      innerSearch.setAttribute("class", "sel-inner-search")

      for (let i = 0; i < config.data.length; i++) {
        let li = document.createElement("li")
        li.className = "sel-select-item"
        li.setAttribute("title", config.data[i].title)
        li.textContent = config.data[i].title

        li.addEventListener("click", (e) => {
          searchField.value = e.target.textContent
          searchField.name = e.target.textContent
          innerSearch.value = ""
          e.target.innerHTML = config.data[i].title
          selectList.classList.remove("sel-show")
          caret.classList.remove("sel-caret-up")

          for (let i = 0; i < selectList.children.length; i++) {
            selectList.children[i].style.display = "block"
          }
        })

        selectList.append(li)

      }

      searchField.addEventListener("click", (e) => {
        if (!e.target.parentElement.nextElementSibling.classList.contains("sel-show")) {
          e.target.parentElement.nextElementSibling.classList.add("sel-show")
          caret.classList.add("sel-caret-up")
          innerSearch.focus()
        } else {
          e.target.parentElement.nextElementSibling.classList.remove("sel-show")
          caret.classList.remove("sel-caret-up")
          caret.classList.add("sel-caret-down")
        }
      })

      document.addEventListener("click", (e) => {
        let lists = document.querySelectorAll(".sel-select-list")

        if (e.target.classList.contains("sel-inner-search")) {
          e.target.parentElement.classList.add("sel-show")
        }

        if (!e.target.classList.contains("sel-inner-search") && !e.target.classList.contains("sel-btn-select")) {

          caret.classList.remove("sel-caret-up")
          caret.classList.add("sel-caret-down")


          for (let i = 0; i < selectList.children.length; i++) {
            selectList.children[i].style.display = "block"
            // searchItems[i].classList.remove("sel-selected")
            // index = -1;
          }

          for (let i = 0; i < config.data.length; i++) {
            selectList.children[i + 1].innerHTML = config.data[i].title
          }

          // searchField.value = ""
          innerSearch.value = ""
          // for(let i = 0; i < searchItems.length; i++) {
          //     searchItems[i].style.display = "block"
          //     searchItems[i].classList.remove("sel-selected")
          //     index = -1;
          // }
        }
      })

      innerSearch.addEventListener("keyup", (e) => {
        let expr = innerSearch.value.toLowerCase()
        for (let i = 1; i < selectList.children.length; i++) {
          if (selectList.children[i].textContent.toLowerCase().indexOf(expr) !== -1) {
            selectList.children[i].style.display = "block"
            let pieceOfString = selectList.children[i].textContent.replace(expr, "<span style='background-color: #f5edc1'>" + expr + "</span>")
            selectList.children[i].innerHTML = pieceOfString
          } else {
            selectList.children[i].style.display = "none"
          }
        }
      })

      selectedItems.append(caret)
      selectList.prepend(innerSearch)
      selectedItems.append(searchField)
      container.append(selectedItems)
      container.append(selectList)
      root.append(container)
    }
  }


  // function FlexibleSelectBox () {
  //     if(!el.checked) {
  //         selectedItems.classList.add("sel-item-collection-flexible")
  //     } else {
  //         selectedItems.classList.remove("sel-item-collection-flexible")
  //     }
  // }
  multiSelect({
    id: "some3",
    data: randomArr,
    isFlexible: true,
    isSearchable: true,
    isHighlighted: true,
    multiSelect: false
  })
});
document.addEventListener("DOMContentLoaded", () => {
  const loadMore = document.getElementById('loadmore');
  const hid = [...document.querySelectorAll('.poster__item.hidden')];

  hid.splice(0, 9).forEach(
    elem => elem.classList.remove('hidden')
  );

  loadmore.addEventListener('click', function (e) {
    e.preventDefault();

    hid.splice(0, 3).forEach(
      elem => elem.classList.remove('hidden')
    )

    if (hid.length == 0) {
      loadMore.classList.add('hidden');
    }
  });
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
document.addEventListener('DOMContentLoaded', function () {
  const cardsLink = document.querySelectorAll(".item__area span");

  cardsLink.forEach(cLink => {
    cLink.addEventListener("click", function () {
      this.parentElement.parentElement.querySelector('.item__area p').classList.toggle("show");
    });

  });
});
document.addEventListener('DOMContentLoaded', function () {
  const cardsLink2 = document.querySelectorAll(".item__area span");
  cardsLink2.forEach(cLink => {
    cLink.addEventListener("click", function () {
      this.parentElement.parentElement.querySelector('.item__area span').classList.toggle("show");
    });

  });
});
document.addEventListener('DOMContentLoaded', function () {
  const swiper1 = new Swiper('.swiper1', {
    slidesPerView: "auto",
    spaceBetween: 4,
    slidesPerGroup: 2,
    navigation: {
      prevEl: '.swiper-button-prev1',
      nextEl: '.swiper-button-next1',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 6,
        slidesPerGroup: 1,
        slidesPerView: 'auto'
      },
      576: {
        spaceBetween: 8,
        slidesPerGroup: 1,
        slidesPerView: 'auto'
      },
      767: {
        spaceBetween: 8,
        slidesPerGroup: 1,
        slidesPerView: 'auto'
      },
      992: {
        spaceBetween: 4,
        slidesPerGroup: 1,
        slidesPerView: "auto"
      },
      1200: {
        spaceBetween: 4,
        slidesPerGroup: 2,
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  //popup1
  let popupBg = document.querySelector('.popup__bg');
  let popup = document.querySelector('.popup');
  let openPopupButtons = document.querySelectorAll('.a6, .popup7 .popup__acc a');
  let closePopupButton = document.querySelector('.close-popup');

  openPopupButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      popupBg.classList.add('active');
      popup.classList.add('active');
    })
  });

  closePopupButton.addEventListener('click', () => {
    popupBg.classList.remove('active');
    popup.classList.remove('active');
  });

  document.addEventListener('click', (e) => {
    if (e.target === popupBg) {
      popupBg.classList.remove('active');
      popup.classList.remove('active');
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      //ваша функция закрытия окна
      popupBg.classList.remove('active');
      popup.classList.remove('active');
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  //popup2
  let popupBg2 = document.querySelector('.popup__bg2');
  let popup2 = document.querySelector('.popup2');
  let openPopupButtons2 = document.querySelectorAll('.a1');
  let closePopupButton2 = document.querySelector('.close-popup2');

  openPopupButtons2.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      popupBg2.classList.add('active');
      popup2.classList.add('active');
    })
  });

  closePopupButton2.addEventListener('click', () => {
    popupBg2.classList.remove('active');
    popup2.classList.remove('active');
  });

  document.addEventListener('click', (e) => {
    if (e.target === popupBg2) {
      popupBg2.classList.remove('active');
      popup2.classList.remove('active');
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      //ваша функция закрытия окна
      popupBg2.classList.remove('active');
      popup2.classList.remove('active');
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  //popup3
  let popupBg3 = document.querySelector('.popup__bg3');
  let popup3 = document.querySelector('.popup3');
  let openPopupButtons3 = document.querySelectorAll('.a2');
  let closePopupButton3 = document.querySelector('.close-popup3');

  openPopupButtons3.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      popupBg3.classList.add('active');
      popup3.classList.add('active');
    })
  });

  closePopupButton3.addEventListener('click', () => {
    popupBg3.classList.remove('active');
    popup3.classList.remove('active');
  });

  document.addEventListener('click', (e) => {
    if (e.target === popupBg3) {
      popupBg3.classList.remove('active');
      popup3.classList.remove('active');
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      //ваша функция закрытия окна
      popupBg3.classList.remove('active');
      popup3.classList.remove('active');
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  //popup4
  let popupBg4 = document.querySelector('.popup__bg4');
  let popup4 = document.querySelector('.popup4');
  let openPopupButtons4 = document.querySelectorAll('.a3');
  let closePopupButton4 = document.querySelector('.close-popup4');

  openPopupButtons4.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      popupBg4.classList.add('active');
      popup4.classList.add('active');
    })
  });

  closePopupButton4.addEventListener('click', () => {
    popupBg4.classList.remove('active');
    popup4.classList.remove('active');
  });

  document.addEventListener('click', (e) => {
    if (e.target === popupBg4) {
      popupBg4.classList.remove('active');
      popup4.classList.remove('active');
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      //ваша функция закрытия окна
      popupBg4.classList.remove('active');
      popup4.classList.remove('active');
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  //popup5
  let popupBg5 = document.querySelector('.popup__bg5');
  let popup5 = document.querySelector('.popup5');
  let openPopupButtons5 = document.querySelectorAll('.a4');
  let closePopupButton5 = document.querySelector('.close-popup5');

  openPopupButtons5.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      popupBg5.classList.add('active');
      popup5.classList.add('active');
    })
  });

  closePopupButton5.addEventListener('click', () => {
    popupBg5.classList.remove('active');
    popup5.classList.remove('active');
  });

  document.addEventListener('click', (e) => {
    if (e.target === popupBg5) {
      popupBg5.classList.remove('active');
      popup5.classList.remove('active');
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      //ваша функция закрытия окна
      popupBg5.classList.remove('active');
      popup5.classList.remove('active');
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  //popup6
  let popupBg6 = document.querySelector('.popup__bg6');
  let popup6 = document.querySelector('.popup6');
  let openPopupButtons6 = document.querySelectorAll('.nav__local, .a5');
  let closePopupButton6 = document.querySelector('.close-popup6');

  openPopupButtons6.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      popupBg6.classList.add('active');
      popup6.classList.add('active');
    })
  });

  closePopupButton6.addEventListener('click', () => {
    popupBg6.classList.remove('active');
    popup6.classList.remove('active');
  });

  document.addEventListener('click', (e) => {
    if (e.target === popupBg6) {
      popupBg6.classList.remove('active');
      popup6.classList.remove('active');
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      //ваша функция закрытия окна
      popupBg6.classList.remove('active');
      popup6.classList.remove('active');
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  //popup7
  let popupBg7 = document.querySelector('.popup__bg7');
  let popup7 = document.querySelector('.popup7');
  let openPopupButtons7 = document.querySelectorAll('.a7, .popup .popup__acc a, .nav__enter_reg');
  let closePopupButton7 = document.querySelector('.close-popup7');

  openPopupButtons7.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      popupBg7.classList.add('active');
      popup7.classList.add('active');
    })
  });

  closePopupButton7.addEventListener('click', () => {
    popupBg7.classList.remove('active');
    popup7.classList.remove('active');
  });

  document.addEventListener('click', (e) => {
    if (e.target === popupBg7) {
      popupBg7.classList.remove('active');
      popup7.classList.remove('active');
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      //ваша функция закрытия окна
      popupBg7.classList.remove('active');
      popup7.classList.remove('active');
    }
  });
});
document.querySelector('.popup7 .popup__acc a').addEventListener('click', function () {
  document.getElementById('popup7').classList.toggle("active");
})
document.querySelector('.popup .popup__acc a').addEventListener('click', function () {
  document.getElementById('popup').classList.toggle("active");
})
document.addEventListener("DOMContentLoaded", () => {
  var input = document.querySelectorAll('.sel-btn-select'),
    buffer = [];
  for (var i = 0; input.length > i; i++) {
    console.log(input[i].value);
    buffer[i] = document.createElement('div');
    buffer[i].className = "buffer";
    //вставляем скрытый div.buffer
    input[i].parentNode.insertBefore(buffer[i], input[i].nextSibling);

    input[i].oninput = function () {
      this.nextElementSibling.innerHTML = this.value;
      this.style.width = this.nextElementSibling.clientWidth + 'px';
    };
  }

})
