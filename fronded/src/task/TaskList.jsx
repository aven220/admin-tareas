// TaskList.jsx
import { useContext } from "react";
import TaskCard from "./TaskCard";
import { TaskContext } from "../context/TaskContext";

function TaskList() {
    const { tareas } = useContext(TaskContext);

    if (tareas.length === 0) {
        return <h1 className="text-4xl font-bold text-white mb-5 text-center">No hay tareas pendientes</h1>;
    }

    return (
        <div className="grid grid-cols-4 gap-2">
            {tareas.map((t) => (
                <TaskCard key={t.id} t={t} />
            ))}
        </div>
    );
}

export default TaskList;
