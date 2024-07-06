import { useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Function to handle input change
  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  // Function to add a new task
  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((prevTasks) => [...prevTasks, { name: newTask, urgent: false }]);
      setNewTask("");
    }
  }

  // Function to delete a task
  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  // Function to move a task up in the list
  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  // Function to move a task down in the list
  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  // Function to handle Enter key press
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      addTask();
    }
  }

  // Function to toggle urgency of a task
  function toggleUrgency(index) {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, urgent: !task.urgent } : task
      )
    );
  }

  return (
    <div className="to-do-list">
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          placeholder="Enter the task..."
          value={newTask}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>
      <ol>
        {tasks.map((task, index) => (
          <li
            key={index}
            className={task.urgent ? "urgent" : "not-urgent"}
            onClick={() => toggleUrgency(index)}
          >
            <span className="text" onClick={() => deleteTask(index)}>
              {task.name}
            </span>
            <button className="move-button" onClick={() => moveTaskUp(index)}>
              👆
            </button>
            <button className="move-button" onClick={() => moveTaskDown(index)}>
              👇
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
