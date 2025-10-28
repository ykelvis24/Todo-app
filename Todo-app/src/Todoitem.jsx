import { useState } from "react";

export default function TodoItem({ item, deleteTask, toggleComplete, updateTask }) {
  const [editing, setEditing] = useState(false);
  const [newValue, setNewValue] = useState(item.text);

  const handleEdit = () => {
    if (editing) updateTask(item.id, newValue);
    setEditing(!editing);
  };

  return (
    <li className={item.completed ? "todo completed" : "todo"}>
      <div className="left">
        {editing ? (
          <input
            className="edit-input"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
        ) : (
          <span className="task-text">{item.text}</span>
        )}
        <small className="due-date">Due: {item.due}</small>
      </div>

      <div className="actions">
        <button className="done" onClick={() => toggleComplete(item.id)}>
          Done
        </button>
        <button className="edit" onClick={handleEdit}>
          {editing ? "Save" : "Edit"}
        </button>
        <button className="delete" onClick={() => deleteTask(item.id)}>
          X
        </button>
      </div>
    </li>
  );
}
