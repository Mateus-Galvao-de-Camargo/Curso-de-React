import { useEffect, useState } from "react";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { v4 } from "uuid";
import Title from "./components/Title";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Se descomentar isso vai consumir a API e criar uma tarefa toda vez que carregar a página
  // useEffect(() => {
  //   // Sempre lembrando que pode ser uma arrowfunction
  //   async function fetchTasks() {
  //     const response = await fetch(
  //       `https://jsonplaceholder.typicode.com/todos/1`,
  //       {
  //         method: "GET",
  //       }
  //     );

  //     const data = await response.json();
  //     onCreateTaskClick(data.title, data.id)
  //   }
  //   fetchTasks();
  // }, []);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id == taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id != taskId);
    setTasks(newTasks);
  }

  function onCreateTaskClick(title, description) {
    const newTask = {
      id: v4(),
      title: title,
      description: description,
      isCompleted: false,
    };
    // setTasks(tasks.push(newTask));
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title className="text-3xl text-slate-100 font-bold text-center">
          Gerenciador de Tarefas
        </Title>
        <AddTask onCreateTaskClick={onCreateTaskClick} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
