import { useEffect, useRef, useState} from 'react';
import cl from './NewTask.module.css'
import Line from '../UI/line/Line';
import Input from '../UI/input/Input';
import Button from '../UI/button/Button';

const NewTask = ({ onChange, currentTodos }) => {
  const [letter, setLetter] = useState('');
  const [name, setName] = useState('');

  const [notes, setNotes] = useState([]);
  const [todos, setTodos] = useState([]);

  const [display, setDisplay] = useState({display: 'none'})

  const noteInput = useRef('')
  const noteInputHeading = useRef('')
  // {id: Date.now(), title: 'delactus aut autem', completed: true}
 

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

  const noteFocus = (e) => {
    if (e.key === 'Enter') {
      noteInput.current.focus()
    }
  }
      
  const addTodo = (notes) => {
    if (notes.length !== 0) {
      setTodos([...todos, {todoid: Date.now(), name: name, notes: notes}])
      onChange([...todos, {todoid: Date.now(), name: name, notes: notes}])
      setNotes([])
    }
    setDisplay({display: 'none'})
    setLetter('')
    setName('')
    noteInput.current.style.height = '35px';
    noteInputHeading.current.style.height = '35px';

  }
        
  useEffect(() => {
    setTodos(currentTodos)
  }, [currentTodos])

  return (
    <div className={cl.modal}>
      <div className={cl.modal__row}>
        <Input
          ref={noteInputHeading} 
          type="text"
          id='heading'
          placeholder='Заголовок'
          value={name}
          onKeyDown={e => noteFocus(e)}
          onChange={e => setName(e.target.value)}
          style={display} 
        />
        <Input
          ref={noteInput} 
          type="text" 
          id='note'
          value={letter} 
          onKeyDown={(e) => handleNoteSubmit(e, letter)} 
          onChange={e => setLetter(e.target.value)} 
          placeholder='Заметка...'
          onFocus={() => setDisplay({display: 'flex'})}
          style={{fontSize: "18px", fontWeight: '700', letterSpacing: '0.2px'}}
        />

        {notes.map(note => 
          <Line
            key={note.id}
            note={note}
            notes={notes}
            setNotes={setNotes}
          >
          </Line>
        )}
        <div style={display} className={cl.bottom__container}>
          <div className='toolbar'>
          </div>
          <Button type='button' style={{marginLeft: 'auto'}} onClick={() => addTodo(notes)}>Закрыть</Button>
        </div>
      </div>
    </div>
  );
}

export default NewTask;
