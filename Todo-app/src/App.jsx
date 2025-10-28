import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import "./App.css";

export default function App() {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTasks = localStorage.getItem("todos");
    const savedTheme = localStorage.getItem("darkMode");

    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedTheme) setDarkMode(JSON.parse(savedTheme));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const addTask = () => {
    if (!task.trim()) return;
    const newTask = {
      id: Date.now(),
      text: task,
      due: dueDate || "No date",
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTask("");
    setDueDate("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const updateTask = (id, newText) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, text: newText } : t
      )
    );
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div className={darkMode ? "container dark" : "container"}>
      <h1>ELVIS TO-DO APP</h1>

      <button className="theme-btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <div className="input-area">
        <input
          type="text"
          placeholder="Task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button className="add-btn" onClick={addTask}>Add</button>
      </div>

      <div className="filters">
        <button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>All</button>
        <button onClick={() => setFilter("active")} className={filter === "active" ? "active" : ""}>Active</button>
        <button onClick={() => setFilter("completed")} className={filter === "completed" ? "active" : ""}>Completed</button>
      </div>

      <ul>
        {filteredTasks.length === 0 ? (
          <p className="empty">Nothing here yet</p>
        ) : (
          filteredTasks.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              deleteTask={deleteTask}
              toggleComplete={toggleComplete}
              updateTask={updateTask}
            />
          ))
        )}
      </ul>
    </div>
  );
}
