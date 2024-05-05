import { useState, useContext, useEffect } from "react";
import { TaskContext } from "../context/TaskContext";
import Header from '../Login/Header';

function TaskForm({usuarios}) {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState('');
    const { crearTarea } = useContext(TaskContext);
    const [hora, setHora] = useState('');
    const [error, setError] = useState(false);
    const [fechaActual, setFechaActual] = useState('');
    const [notificacion, setNotificacion] = useState(false);
    const [observaciones, setObservaciones] = useState('');
    const [id_cedula, setId_cedula] = useState(usuarios);
  

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

        if (descripcion === '' || fecha === '' || titulo === '' || observaciones === '') {
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
        setObservaciones('');

        guardarEnBaseDeDatos();
      };
      
      const guardarEnBaseDeDatos = async () => {
        try {
          const response = await fetch('http://localhost:3001/crearTarea', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              nombre_tarea: titulo,
              descripcion_tarea: descripcion,
              fechavencimiento_tarea: fecha,
              observacion_tarea: observaciones,
              nombre_usuario_tarea:id_cedula, 
            })
          });

          if (!response.ok) {
            throw new Error('Error al guardar la información en la base de datos');
          }

          console.log('Tarea guardada exitosamente en la base de datos');
        } catch (error) {
          console.error('Error:', error);
        }
      };
      

    const handleFechaActual = () => {
        const fechaActual = new Date();
        const fechaFormateada = fechaActual.toLocaleDateString();
        const horaFormateada = fechaActual.toLocaleTimeString();
        const fechaHoraFormateada = `${fechaFormateada} ${horaFormateada}`;
        setFechaActual(fechaHoraFormateada);
    };

    return (
        <>
        <div><Header /></div>
        {/* <p>CEDULA ES : {id_cedula}</p> */}
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
                <textarea
                    style={{ color: 'black' }}
                    className="bg-slate-300 p-3 w-full mb-2"
                    placeholder="Observaciones de la tarea"
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
                />
                {notificacion && <p style={{ color: 'yellow' }}>¡Faltan 5 días para la fecha de entrega!</p>}
                {error && <p style={{ color: 'red' }}>Llene toda la información</p>}

                <button className='bg-indigo-700 px-3 py-1 text-white' type="submit">Guardar</button>
            </form>
        </div>
        </>
    );
}

export default TaskForm;

