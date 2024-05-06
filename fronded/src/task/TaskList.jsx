import React, { useState, useEffect } from "react";
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

    const eliminarTarea = async (idTarea) => {
        console.log(idTarea)
        try {
            const response = await fetch(`http://localhost:3001/eliminarTareas/${idTarea}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Error al eliminar tarea");
            }
            obtenerTareas(); 
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="grid grid-cols-4 gap-2">
            {tareas.map((tarea) => (
                <TaskCard key={tarea.id_tarea} tarea={tarea} agregarTarea={agregarTarea} eliminarTarea={() => eliminarTarea(tarea.id_tarea)} />
            ))}
        </div>
    );
}

export default TaskList;

