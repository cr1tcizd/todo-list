import React from 'react'
import cl from './CardHover.module.css'
import Trash from '../../../assets/trash.svg?react'

export default function CardHover({onClick, onClickDelete, ...listeners}) {
  return (
    <div 
        className={cl.card_abs}
        onClick={onClick}
        {...listeners}
    >
      <Trash
        className={cl.card__trash__icon}   
        onClick={onClickDelete}
      />
    </div>
  )
}
