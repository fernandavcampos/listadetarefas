import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./TodoList.css";

function TodoList({ tasks, toggleTask, removeTask, editTask }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [newText, setNewText] = useState("");

  const startEditing = (index, text) => {
    setEditingIndex(index);
    setNewText(text);
  };

  const handleEdit = () => {
    if (newText.trim() !== "") {
      editTask(editingIndex, newText);
    }
    setEditingIndex(null);
  };

  return (
    <ul>
      <AnimatePresence>
        {tasks.map((task, index) => (
          <motion.li
            key={index}
            className={task.completed ? "completed" : ""}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  autoFocus
                />
                <button onClick={handleEdit}>Salvar</button>
              </>
            ) : (
              <>
                <span onClick={() => toggleTask(index)}>{task.text}</span>
                <button onClick={() => startEditing(index, task.text)}>
                  Editar
                </button>
                <button onClick={() => removeTask(index)}>Remover</button>
              </>
            )}
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}

export default TodoList;
