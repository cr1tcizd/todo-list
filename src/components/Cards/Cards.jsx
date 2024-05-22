import { act, useContext, useEffect, useMemo, useState } from "react";
import Card from "../UI/Card/Card";
import cl from "./Cards.module.css"
import { TodosContext } from "../../context";
import { DndContext, KeyboardSensor, MouseSensor, TouchSensor, closestCenter, closestCorners, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, rectSortingStrategy, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Modal from "../UI/modal/Modal";

const Cards = () => {
  const {todos, setTodos} = useContext(TodosContext)
  const [todo, setTodo] = useState([])
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      }
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 6,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const getTodoPos = id => todos.findIndex(todo => todo.todoid === id)

  const handleDragEnd = event => {
    console.log(event)
    const {active, over} = event
    if(active.id === over.id) return;
    setTodos(todos => {
      const originalPos = getTodoPos(active.id)
      const newPos = getTodoPos(over.id)
      console.log(todos)
      return arrayMove(todos, originalPos, newPos)
    })
  }

  return (
    <div className={cl.cards}>
      <div className="container">
        <div className={cl.cards__row}>
          <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
            <SortableContext items={todos.map((t) => t.todoid)} strategy={rectSortingStrategy}>
              {todos.map(todo => 
                <Card
                  key={todo.todoid}
                  todo={todo}
                  todos={todos}
                  setTodos={setTodos}
                >
                </Card>
              )}
            </SortableContext>
          </DndContext>
          
        </div>
        
      </div>
    </div>
  );
}

export default Cards;
