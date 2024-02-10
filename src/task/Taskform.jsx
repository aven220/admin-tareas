// TaskForm.jsx
import { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskForm() {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const { crearTarea } = useContext(TaskContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        crearTarea({ titulo, descripcion });
        setTitulo('');
        setDescripcion('');
    };

    return (
    <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="bg-slate-400 p-10 mb-4">
            <h1 className="text-2xl font-bold text-white mb-5 text-center">Crear tarea</h1>
            <input
            className="bg-slate-300 p-3 w-full mb-2"
                type="text"
                placeholder="Escribe tu tarea"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                autoFocus
            />
            <textarea
            className="bg-slate-300 p-3 w-full mb-2"
                placeholder="Escribe la descripción de la tarea"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
            />
            <button className='bg-indigo-700 px-3 py-1 text-white' type="submit">Guardar</button>
        </form>
    </div>
    );
}

export default TaskForm;