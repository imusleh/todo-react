import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [task, setTask] = useState("");
  const [time, setTime] = useState(new Date());

  // Update clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  //  Save to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo(e) {
    e.preventDefault();
    if (!task.trim()) {
      alert("Please enter a task.");
      return;
    }
    setTodos([...todos, task]);
    setTask("");
  }

  function deleteTodo(text) {
    setTodos(todos.filter((t) => t !== text));
  }

  function clearAll() {
    if (confirm("Are you sure you want to clear all tasks?")) {
      setTodos([]);
    }
  }

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const todayDate = time.toLocaleDateString(undefined, dateOptions);
  const currentTime = time.toLocaleTimeString();

  return (
    <div className="app-wrapper">
      <div className="container">
        {/* Clock Section */}
        <div className="clock-box">
          <h2>{todayDate}</h2>
          <p>{currentTime}</p>
        </div>

        <h1>To Do List</h1>

        <form onSubmit={addTodo}>
          <input
            type="text"
            placeholder="Add a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
          />
          <button type="submit">Add</button>
        </form>

        <button id="clear-all" onClick={clearAll}>
          Clear All
        </button>

        <ul>
          {todos.map((t, i) => (
            <li key={i}>
              <span>{t}</span>
              <button className="delete-btn" onClick={() => deleteTodo(t)}>
                Done
              </button>
            </li>
          ))}
        </ul>
      </div>

      <footer>
        <p>
          Author: Islam Musleh
          <br />
          <a href="mailto:islam.musleh@gmail.com">islam.musleh@gmail.com</a>
        </p>
        <a
          href="https://github.com/imusleh"
          target="_blank"
          title="GitHub"
          rel="noreferrer"
        >
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub Logo"
          />
        </a>
      </footer>
    </div>
  );
}
