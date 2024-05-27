import React, { useContext, useEffect, useRef, useState } from 'react'
import cl from './Modal.module.css'
import Line from '../line/Line'
import { TodosContext } from '../../../context'
import Input from '../input/Input'
import Toolbar from '../../Toolbar/Toolbar'
import Button from '../button/Button'

export default function Modal({ todo, modalActive, setModalActive}) {
  const rootClasses = [cl.modal]
  const {todos, setTodos} = useContext(TodosContext)
  const [notes, setNotes] = useState(todo.notes)
  const [letter, setLetter] = useState('')
  const [name, setName] = useState(todo.name)
  const [background, setBackground] = useState(todo.background)
  
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
        return {...t, name: name, background: background}
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
      <div className={cl.modal__row} onClick={(e) => e.stopPropagation()}>
        <div style={background.background === '#252525' ? {background: `${background.background}`} : {background: `${background.background}`, border: `1px solid transparent`}} className={cl.modal__content}>
          <div className={cl.modal__inputs}>
            <Input 
              type="text"
              ref={noteInputHeading} 
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
              value={letter} 
              onKeyDown={e => handleNoteSubmit(e, letter)}
              onChange={e => setLetter(e.target.value)} 
              placeholder='Заметка...'
              style={{fontSize: '15px'}}
            />
          </div>
        

          {notes.map(note => 
            <Line 
                key={note.id} 
                note={note}
                notes={todo.notes}
                setNotes={setNotes}
                contenteditable={true}
              >
              {note.title}
            </Line>
            
          )}
        </div>
        <div className={cl.tool__container} style={background.background === '#252525' ? {borderLeft: '1px solid #757373', borderRight: "1px solid #757373", borderBottom: "1px solid #757373"} : {border: '1px solid transparent'}}>
          <Toolbar background={background} setBackground={setBackground} />
          <Button type='button' style={{marginLeft: 'auto'}} onClick={handleClickOut}>Закрыть</Button>
        </div>
      </div>
      
    </div>
  )
}
