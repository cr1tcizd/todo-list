import { useContext, useEffect, useRef, useState } from 'react';
import cl from './Line.module.css'

const Line = ({ note, setNotes, notes, contenteditable}) => {
  const lineText = useRef(note);
  const [currentContentEditTable, setCurrentContentEditTable] = useState(true)
  const deleteLine = () => {
    setNotes(notes.filter(n => n.id !== note.id))
  }

  const handleChange = () => {
    setNotes(notes.map(n => {
      if (n.id === note.id)  {
        return {...n, completed: !note.completed}
      }
      return n
    }))
  }

  return (
    <div id={note.id} className={cl.line}>
      <div className={cl.checkbox}>
        <input className={cl.checkpoint} type="checkbox" name="checkbox" checked={status} onChange={() => handleChange()} />
        <span className={note.completed ? cl.checked : cl.unchecked} onClick={() => handleChange()}></span>
      </div>
      <div 
        onInput={e => {
          note.title = e.currentTarget.textContent
        }}
        onKeyDown={e => {if (e.key === 'Enter') lineText.current.blur()}  }
        ref={lineText}
        contentEditable={contenteditable} 
        suppressContentEditableWarning={true}
        className={note.completed ? `${cl.line__text}  ${cl.line__text_completed}` : cl.line__text}
      >
        {note.title}
      </div>
      <button type='button' className={cl.line__delete} onClick={() => deleteLine()}>&#215;</button>
    </div>
  );
}

export default Line;
