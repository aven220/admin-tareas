// TaskForm.jsx
import { useState, useContext, useEffect } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskForm() {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState('');
    const { crearTarea } = useContext(TaskContext);
    const [hora, setHora] = useState('');
    const [error, setError] = useState(false);
    const [fechaActual, setFechaActual] = useState('');
    const [notificacion, setNotificacion] = useState(false);

    useEffect(() => {
        const fechaEntrega = new Date(fecha);
        const fechaActual = new Date();
        const diferenciaEnDias = Math.ceil((fechaEntrega - fechaActual) / (1000 * 60 * 60 * 24));

        if (diferenciaEnDias === 5) {
            setNotificacion(true);
        } else {
            setNotificacion(false);
        }
    }, [fecha]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (descripcion === '' || fecha === '' || titulo === '') {
            setError(true);
            return;
        }
        setError(false);
        handleFechaActual();
        crearTarea({ titulo, descripcion, fecha, hora, fechaActual });
        setTitulo('');
        setDescripcion('');
        setFecha('');
        setHora('');
    };

    const handleFechaActual = () => {
        const fechaActual = new Date();
        const fechaFormateada = fechaActual.toLocaleDateString();
        const horaFormateada = fechaActual.toLocaleTimeString();
        const fechaHoraFormateada = `${fechaFormateada} ${horaFormateada}`;
        setFechaActual(fechaHoraFormateada);
    };

    return (
        <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="bg-slate-400 p-10 mb-4">
                <h1 className="text-2xl font-bold text-white mb-5 text-center titulo">CREAR TAREA</h1>
                <input
                    style={{ color: 'black' }}
                    className="bg-slate-300 p-3 w-full mb-2"
                    type="text"
                    placeholder="Nombre"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    autoFocus
                />
                <textarea
                    style={{ color: 'black' }}
                    className="bg-slate-300 p-3 w-full mb-2"
                    placeholder="Escribe la descripción de la tarea"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />
                <p style={{ color: 'black' }}>Fecha de entrega </p>
                <input
                    style={{ color: 'black' }}
                    className="bg-slate-300 p-3 w-full mb-2"
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                />
                <input
                    style={{ color: 'black' }}
                    className="bg-slate-300 p-3 w-full mb-2"
                    type="time"
                    value={hora}
                    onChange={(e) => {
                        setHora(e.target.value);
                        handleFechaActual();
                    }}
                />
                {notificacion && <p style={{ color: 'yellow' }}>¡Faltan 5 días para la fecha de entrega!</p>}
                {error && <p style={{ color: 'red' }}>Llene toda la información</p>}

                <button className='bg-indigo-700 px-3 py-1 text-white' type="submit">Guardar</button>
            </form>
        </div>
    );
}

export default TaskForm;
