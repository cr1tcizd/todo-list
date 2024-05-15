import { useEffect, useState } from "react"
import Cards from "../Cards/Cards"
import NewTask from "../NewTask/NewTask"
import { TodosContext } from "../../context"

function App() {
  
  let saveTodos = []
  localStorage.getItem('todos') === null 
  ? saveTodos = localStorage.setItem('todos', JSON.stringify([]))
  : saveTodos = JSON.parse(localStorage.getItem('todos'))
  
  const [todos, setTodos] = useState(saveTodos)

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const handleChange = (notes) => {
    setTodos(notes)
  }
  
  return (
    <>
      <TodosContext.Provider value={{
        todos,
        setTodos
      }}>
        <NewTask onChange={handleChange} currentTodos={todos} />
        <Cards />
      </TodosContext.Provider>
    </>
  )
}

export default App
