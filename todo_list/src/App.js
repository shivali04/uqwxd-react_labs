import React from "react";
import "./App.css";
const App = () => {
  //eslint-disable-next-line
  const [todos, setTodos] = React.useState([]); // eslint-disable-next-line
  const [todo, setTodo] = React.useState(""); // eslint-disable-next-line
  
  const [todoEditing,setToDoEditing] = React.useState(null); 
  const [editingText, setEditingText] = React.useState(""); 
  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);
  React.useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);
  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,
    };
    if (newTodo.text.length > 0 ) {
        setTodos([...todos].concat(newTodo));
        setTodo("");
    
    } else {
        
        alert("Enter Valid Task");
        setTodo(""); 
    }
  }

  function handleDelete(id){
    let updatedToDos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedToDos);
  }

  function toggleComplete(id){
    let completedToDos = [...todos].map((todo)=> { 
          if(todo.id === id)
          {
              todo.completed = !todo.completed;
          }
          return todo;
       }      
    );
    setTodos(completedToDos);
  }
  function submitEdits(id)
  {
      const updateTodos = [...todos].map((todo) =>{
      if(todo.id === id)
      {
        todo.text = editingText;
      }
       return todo;
      });
      setEditingText(updateTodos);
      setToDoEditing(null);
  }
return(
<div className ="App">
<h1>Todo List</h1>
<form onSubmit={handleSubmit}>
<input type ="text"  onChange={(e) => setTodo(e.target.value)}
          placeholder="Add a new task"
          value={todo} align ="right" />
<button type ="submit">Add Todo</button>
</form>
{todos.map((todo) => (
            <div key={todo.id} className="todo">
              <div className="todo-text">
                <input
                  type="checkbox"
                  id="completed"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                />
                {todo.id === todoEditing ? (
                  <input
                    type="text"
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                ) : (
                  <div>{todo.text}</div>
                )}
              </div>
              <div className="todo-actions">
                {todo.id === todoEditing ? (
                  <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
                ) : (
                  <button onClick={() => setToDoEditing(todo.id)}>Edit</button>
                )}
    
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
              </div>
            </div>
          ))}
 
</div>
);
};
export default App;
