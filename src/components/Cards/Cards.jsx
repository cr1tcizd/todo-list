import { useContext, useEffect, useState } from "react";
import Card from "../UI/Card/Card";
import cl from "./Cards.module.css"
import { TodosContext } from "../../context";


const Cards = () => {
  const {todos, setTodos} = useContext(TodosContext)
  
  return (
    <div className={cl.cards}>
        {todos.map(todo => 
          <Card 
            key={todo.todoid}
            todo={todo}
            todos={todos}
            setTodos={setTodos}
          >
          </Card>)}
      
    </div>
  );
}

export default Cards;
