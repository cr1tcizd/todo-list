import React, { useContext, useEffect, useRef, useState } from 'react'
import cl from './Modal.module.css'
import Line from '../line/Line'
import { TodosContext } from '../../../context'
import Input from '../input/Input'

export default function Modal({ todo, modalActive, setModalActive}) {
  const rootClasses = [cl.modal]
  const {todos, setTodos} = useContext(TodosContext)
  const [notes, setNotes] = useState(todo.notes)
  const [letter, setLetter] = useState('')
  const [name, setName] = useState(todo.name)
  
  const noteInput = useRef('')
  const noteInputHeading = useRef('')
  
  todo.notes = notes;

  if (modalActive) {
    rootClasses.push(cl.active)
  }

  const handleClickOut = () => {
    setModalActive(false)
    
    setTodos(todos.map(t => {
      if (t.todoid === todo.todoid) {
        return {...t, name: name}
      }
      return t
    }))

    if (todo.notes.length === 0) {
      setTodos(todos.filter(t => t.notes.length !== 0))
    }
    setLetter('')
    localStorage.setItem('todos', JSON.stringify(todos))
    noteInput.current.style.height = '42px';
    noteInputHeading.current.style.height = '46px';
  }

  const noteFocus = (e) => {
    if (e.key === 'Enter') {
      noteInput.current.focus()
    }
  }

  const handleNoteSubmit = (e, letter) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (letter) {
        setNotes([...notes, {id: Date.now(), title: letter, completed: false}])
        setLetter('')
      }
      noteInput.current.style.height = '35px';
    }
  }

  return (
    <div className={rootClasses.join(' ')} onClick={() => handleClickOut()}>
      <div style={todo.background} className={cl.modal__content} onClick={(e) => e.stopPropagation()}>
        <div className={cl.modal__inputs}>
          <Input 
            type="text"
            ref={noteInputHeading} 
            // id='heading'/
            name='title'
            placeholder='Заголовок'
            value={name}
            onKeyDown={e => noteFocus(e)}
            onChange={e => setName(e.target.value)}
          />
          <Input 
            ref={noteInput}
            type="text" 
            name='name'
            // id='note'
            value={letter} 
            onKeyDown={e => handleNoteSubmit(e, letter)}
            onChange={e => setLetter(e.target.value)} 
            placeholder='Заметка...'
            style={{fontSize: '15px'}}
            // onFocus={() => setDisplay({display: 'flex'})}
          />
        </div>
       

        {notes.map(note => 
          <Line 
              key={note.id} 
              note={note}
              notes={todo.notes}
              setNotes={setNotes}
            >
            {note.title}
          </Line>
          
        )}
      </div>
    </div>
  )
}
