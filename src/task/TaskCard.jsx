// TaskCard.jsx
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskCard({ t }) {
  const {eliminarTarea} = useContext(TaskContext);

  return (
    <div className="bg-gray-800 text-white">
      <h1 className="text-xl font-bold capitalize">{t.titulo}</h1>
      <h3 className="text-gray-500 text-sm">{t.descripcion}</h3>
      <button className='bg-red-500 px-5 py-1 rounded-md mt-4 hover:bg-red-400' onClick={() => {
        eliminarTarea(t.id)
      }}>Eliminar tarea</button>
    </div>
  );
}

export default TaskCard;
