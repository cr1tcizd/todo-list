import React, { useEffect, useState } from 'react';
import cl from './Card.module.css'
import Line from '../line/Line';
import Modal from '../modal/Modal';
import CardHover from '../cardHover/CardHover';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const Card = ({todo, todos, setTodos, ...props}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: todo.todoid})
  let style = {}
  if (transform) {
    style = {
      transition,
      transform: CSS.Transform.toString({...transform, scaleX: 1, scaleY: 1}),
    };
  }
  const [modalActive, setModalActive] = useState(false)

  const openModal = () => {
    setModalActive(true)
  }

  const deleteCard = (todo) => {
    setTodos(todos.filter(t => t.todoid !== todo.todoid))
  }
  return (
    <div 
      ref={setNodeRef} 
      style={style}
      {...attributes} 
      className={cl.card__container}
    >
      <CardHover 
        {...listeners}
        onClick={() => {openModal()}}
        onClickDelete={() => deleteCard(todo)}
      />
      <div style={todo.background.background === '#252525' ? {background: `${todo.background.background}`} : {background: `${todo.background.background}`, border: `1px solid ${todo.background.background}`}} className={cl.card}>
        {todo.name && 
          <h3 className={cl.card__name}>
            {todo.name}
          </h3>
        }

        {todo.notes.map(note => 
          <Line contenteditable="false" key={note.id} note={note} tabIndex='-1'>
            {note.title}
          </Line>
        )}
      </div>
      <Modal
        key={todo.todoid}
        modalActive={modalActive}
        setModalActive={setModalActive}
        todo={todo}
      />
    </div>
    

  );
}

export default Card;
