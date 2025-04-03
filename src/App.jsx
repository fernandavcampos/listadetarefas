import { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState("all"); // Novo estado para os filtros

  useEffect(() => {
    console.log("Tarefas Salvas:", tasks); // 🛠 Depuração
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (text) => {
    setTasks([...tasks, { text, completed: false }]);
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const clearCompletedTasks = () => {
    setTasks(tasks.filter((task) => !task.completed));
  }; //Essa função filtra a lista de tarefas e mantém apenas as que não foram concluídas.

  const toggleTask = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (index, newText) => {
    setTasks(
      tasks.map((task, i) => (i === index ? { ...task, text: newText } : task))
    );
  };

  // Função para filtrar as tarefas com base no estado "filter"
  const filteredTasks = tasks.filter((task) => {
    console.log(`Filtro ativo: ${filter}, Tarefa:`, task); // 🛠 Verificação no console
    if (filter === "completed") return task.completed === true;
    if (filter === "pending") return task.completed === false;
    return true; // "all" retorna todas as tarefas
  });

  return (
    <div className="container">
      <h1>Lista de Tarefas</h1>
      <TodoForm addTask={addTask} />

      {/* Adicionando os botões de filtro */}
      <div className="filters">
        <button onClick={() => setFilter("all")}>Todas</button>
        <button onClick={() => setFilter("pending")}>Pendentes</button>
        <button onClick={() => setFilter("completed")}>Concluídas</button>
        <button
          onClick={clearCompletedTasks}
          style={{ backgroundColor: "red", color: "white" }}
        >
          Limpar Concluídas
        </button>
      </div>

      {/* Passamos a lista filtrada para o TodoList */}
      <TodoList
        tasks={filteredTasks}
        removeTask={removeTask}
        toggleTask={toggleTask}
        editTask={editTask}
      />
    </div>
  );
}

export default App;
