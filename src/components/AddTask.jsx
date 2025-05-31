import { useState } from "react";
import Input from "./Input";

function AddTask({ onCreateTaskClick }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
      <Input
        placeholder="Título da tarefa"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <Input
        placeholder="Descrição da tarefa"
        type="text"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button
        onClick={() => {
          if (!title.trim() | !description.trim()) {
            return alert("Preencha o título e a descrição da tarefa!");
          }
          onCreateTaskClick(title, description);
          setTitle("");
          setDescription("");
        }}
        className="bg-slate-500 px-4 py-2 rounded-md text-white font-medium"
      >
        Criar tarefa
      </button>
    </div>
  );
}

export default AddTask;
