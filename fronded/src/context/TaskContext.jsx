// TaskContextProvider.jsx
import { createContext, useState, useEffect } from "react";
import { tareas as data } from "../Tareas";

export const TaskContext = createContext();

export function TaskContextProvider(props) {
    const [tareas, setTareas] = useState([]);

    useEffect(() => {
        setTareas(data);
    }, []);

    const crearTarea = (t) => {
        setTareas([...tareas, {
            titulo: t.titulo,
            id: tareas.length + 1,
            descripcion: t.descripcion,
            fecha: t.fecha,
            fechaActual: t.fechaActual
        }]);
    };

    const eliminarTarea = (tareaId) => {
        setTareas(tareas.filter((t) => t.id !== tareaId));
    };

    return (
        <TaskContext.Provider value={{ tareas, crearTarea, eliminarTarea }}>
            {props.children}
        </TaskContext.Provider>
    );
}