import { useState } from "react";

function TodoForm({ addTask }) {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    addTask(task);
    setTask("");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite uma tarefa..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>
    </>
  );
}

export default TodoForm;
