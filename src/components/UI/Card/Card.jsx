import React, { useEffect, useState } from 'react';
import cl from './Card.module.css'
import Line from '../line/Line';
import Modal from '../modal/Modal';
import CardHover from '../cardHover/CardHover';


const Card = ({todo, todos, setTodos}) => {
  const [modalActive, setModalActive] = useState(false)

  const openModal = () => {
    setModalActive(true)
  }

  const deleteCard = (todo) => {
    setTodos(todos.filter(t => t.todoid !== todo.todoid))
  }

  return (
    <div className={cl.card__container}>
      <CardHover 
        onClick={() => {openModal()}}
        onClickDelete={() => deleteCard(todo)}
      />

      <div style={todo.background} className={cl.card}>
        {todo.name && 
          <h3 className={cl.card__name}>
            {todo.name}
          </h3>
        }

        {todo.notes.map(note => 
          <Line key={note.id} note={note} >
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
