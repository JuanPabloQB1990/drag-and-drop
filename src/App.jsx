import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useEffect } from "react";

const initialTodos = JSON.parse(localStorage.getItem("todos")) || [
  { id: 1, text: "aprender React.js" },
  { id: 2, text: "aprender Vite.js" },
  { id: 3, text: "aprender Svelte.js" },
];
function App() {
  const [todos, setTodos] = useState(initialTodos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleDragEnd = (result) => {
    if (result.destination === null) {
      return
    }

    const startIndex = result.source.index
    const endtIndex = result.destination.index

    const copyArray = [...todos]
    
    const [itemOrder] = copyArray.splice(startIndex, 1)
    copyArray.splice(endtIndex, 0, itemOrder)
    setTodos(copyArray)

  }
  

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h1>Drag and Drop</h1>
      <Droppable droppableId="todos">
        {(droppableProvider) => (
          <ul
            ref={droppableProvider.innerRef}
            {...droppableProvider.droppableProps}
          >
            {todos.map((todo, index) => (
              <Draggable key={todo.id} index={index} draggableId={`${todo.id}`}>
                {(draggableProvider) => (  
                  <li
                    ref={draggableProvider.innerRef}
                    {...draggableProvider.draggableProps}
                    {...draggableProvider.dragHandleProps}
                  >
                    {todo.text}
                  </li>
                )}
              </Draggable>
            ))}
            {droppableProvider.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
