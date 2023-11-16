import { useState } from "react";
//Imports the useState hook from React.
//This hook is used to add state variables to functional components.
import "./styles.css";

//Defines the App component as a default export
export default function App() {
  //two state variables
  //text: Stores the input value for adding new todos.
  //todos: Stores an array of todo items.
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [date, setDate] = useState(new Date()); //set date
  const [darkMode, setDarkMode] = useState(false); //switch to dark mode

  // Update the state structure to include todo items with their corresponding priorities
  const [todoWithPriority, setTodoWithPriority] = useState([]);
  const [priority, setPriority] = useState("medium"); // Set default priority to 'medium'

  //handleOnChange: This function captures changes in the input field (onChange={handleOnChange}).
  //It updates the text state with the new value entered in the input field.
  function handleOnChange(e) {
    setText(e.target.value);
  }

  //add: This function is triggered by a button click (onClick={add}).
  //It adds the current value of text to the todos array using the setTodos function.
  //It spreads the existing todos array and adds the new text value at the end
  function add(e) {
    // setTodos([...todos, text]);
    // Create a new todo object containing text and priority
    const newTodo = { text: text, priority: priority };
    setTodoWithPriority([...todoWithPriority, newTodo]);
    setText(""); // Clear the input field after adding the todo
  }

  //remove: This function is triggered by clicking the '-' button associated with each todo item.
  //It removes the corresponding todo item from the todos array by creating a new array
  function remove(index) {
    //(newArray) using the filter method, excluding the item with the specified index.
    //The updated array is then set as the new state using setTodos.
    let newArray = todoWithPriority.filter((el, i) => i !== index);
    setTodoWithPriority(newArray);
    // let newArray = todos.filter((el, i) => i !== index);
    // setTodos(newArray);
  }

  function completeTask(index) {
    const updatedTodos = [...todoWithPriority];
    updatedTodos[index].completed = true;
    updatedTodos[index].completionDate = new Date().toLocaleDateString();
    setTodoWithPriority(updatedTodos);
  }

  return (
    <div className={`App ${darkMode ? "dark-mode" : ""}`}>
      <h1>Hello CodeSandbox</h1>
      <div>Todo List</div>

      <p>
        Current Date: {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
      </p>
      <p>
        {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
      </p>

      <p>
        <button
          onClick={() => {
            setDarkMode(!darkMode);
          }}
        >
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </p>

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      <input onChange={handleOnChange} />
      <button onClick={add}>Add</button>

      <div className="todo-list-container">
        <ul className="todo-list">
          {todoWithPriority.map((todo, index) => (
            <li
              key={index}
              className={`${todo.priority} ${
                todo.completed ? "completed" : ""
              }`}
            >
              {todo.text} - Priority: {todo.priority}
              {todo.completed ? (
                <span> - Completed on: {todo.completionDate}</span>
              ) : (
                <button onClick={() => completeTask(index)}>Complete</button>
              )}
              <button onClick={() => remove(index)}>-</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
