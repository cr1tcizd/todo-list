const point = document.querySelectorAll('.point');
const todoElement = document.querySelector('.todo_point')
const todoName = document.querySelector('.todo_name')
const todoNameDefault = document.querySelector('.todo_name_default')
const todoPointDefault = document.querySelector('.todo_point_default')

// создание нового пункта списка
todoElement.addEventListener('keypress', function(event) {
    let target = event.target
    let text = target.textContent;
    
    if (event.key === 'Enter') {
      event.preventDefault();
      let div = document.createElement('div')
      div.classList.add('point')
      div.setAttribute('contenteditable',"true")
     
      div.addEventListener('keydown', function(event) {
        if (event.key === "Enter") {
          event.preventDefault();
          todoElement.focus()
        } else if (event.key === 'Backspace' && event.target.textContent === "") {
          event.target.remove();
        }
      })

      div.innerHTML = text;
      target.parentElement.appendChild(div)
      target.textContent = '';
    }
  })

// переключает фокус на imput
todoName.addEventListener('keydown', function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    todoElement.focus();
  }
})

// скрывает дефолтное название
todoName.addEventListener('keyup', e => {
  if (e.target.textContent !== "") {
    todoNameDefault.style.display = 'none';
  } else if (e.target.textContent === "") {
    todoNameDefault.style.display = '';
  }
})

todoName.addEventListener('keyup', e => {
  if (e.target.textContent !== "") {
    todoNameDefault.style.display = 'none';
  } else if (e.target.textContent === "") {
    todoNameDefault.style.display = '';
  }
})

todoElement.addEventListener('keyup', e => {
  console.log(e.target)
  if (e.target.textContent !== "") {
    todoPointDefault.style.display = 'none';
  } else if (e.target.textContent === "") {
    todoPointDefault.style.display = '';
  }
})