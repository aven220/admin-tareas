import { useState, useEffect } from "react";
import TaskCard from "./TaskCard";

function TaskList({ usuarios }) {
    const [tareas, setTareas] = useState([]);

    useEffect(() => {
        obtenerTareas();
    }, [usuarios]);

    const obtenerTareas = async () => {
        try {
            const response = await fetch(`http://localhost:3001/tareas/${usuarios}`);
            if (!response.ok) {
                throw new Error("Error al obtener las tareas del servidor");
            }
            const data = await response.json();
            setTareas(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const agregarTarea = (nuevaTarea) => {
        setTareas([...tareas, nuevaTarea]);
    };

    return (
        <div className="grid grid-cols-4 gap-2">
            {tareas.map((tarea) => (
                <TaskCard key={tarea.id_tarea} tarea={tarea} />
            ))}
        </div>
    );
}

export default TaskList;
