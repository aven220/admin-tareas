import { useState, useContext } from "react";
import TaskState from "./TaskState";
import { TaskContext } from "../context/TaskContext";


function TaskCard({ t }) {
  const { eliminarTarea, modificarTarea } = useContext(TaskContext);
  const [mostrarInfo, setMostrarInfo] = useState(false);
  const [mostrarInfoCompleta, setMostrarInfoCompleta] = useState(false);
  const [modificar, setModificar] = useState(false);
  const [titulo, setTitulo] = useState(t.titulo);
  const [descripcion, setDescripcion] = useState(t.descripcion);
  const [fecha, setFecha] = useState(t.fecha);
  const [hora, setHora] = useState(t.hora);

  const handleVerInfo = () => {
    setMostrarInfo(true);
    setMostrarInfoCompleta(true);
  };

  const handleOcultarInfo = () => {
    setMostrarInfo(false);
    setMostrarInfoCompleta(false);
  };

  const handleModificar = () => {
    setModificar(true);
  };

  const handleGuardarModificacion = (modificacion) => {
    try {
      modificarTarea(t.id, modificacion);
      setModificar(false); 
    } catch (error) {
      console.error("Error al modificar la tarea:", error);
    }
  };

  return (
    <div className="bg-gray-800 text-white">
      {!modificar && (
        <>
          <h1 className="text-xl font-bold capitalize">{titulo}</h1>
          <TaskState />
          {mostrarInfoCompleta && (
            <>
              <h3 className="text-gray-500 text-sm">{descripcion}</h3>
              <p>Pendiente para: </p>
              <h3 style={{ color: "yellow" }}>{fecha}</h3>
              <p>Hora: </p>
              <h3 style={{ color: "red" }}>{hora}</h3>
              <p>Fecha de creación: </p>
              <h3>{t.fechaActual}</h3>
            </>
          )}
          {!mostrarInfo && (
            <button
              type="submit"
              className="bg-red-500 px-5 py-1 rounded-md mt-4 hover:bg-red-400"
              style={{ backgroundColor: "green" }}
              onClick={handleVerInfo}
            >
              Ver
            </button>
          )}
          {mostrarInfo && (
            <>
              <button
                className="bg-red-500 px-5 py-1 rounded-md mt-4 hover:bg-red-400"
                onClick={handleOcultarInfo}
              >
                Ocultar
              </button>
              <button
                type="submit"
                className="bg-red-500 px-5 py-1 rounded-md mt-4 hover:bg-red-400"
                style={{ color: "white", backgroundColor: "green" }}
                onClick={handleModificar}
              >
                Modificar
              </button>
            </>
          )}
          <button
            className="bg-red-500 px-5 py-1 rounded-md mt-4 hover:bg-red-400"
            onClick={() => {
              eliminarTarea(t.id);
            }}
          >
            Eliminar tarea
          </button>
        </>
      )}
      {modificar && (
        <form style={{ color: "black" }}>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
          <input
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
          />
          <button
            className="bg-red-500 px-5 py-1 rounded-md mt-4 hover:bg-red-400"
            onClick={handleGuardarModificacion}
          >
            Guardar
          </button>
        </form>
      )}
    </div>
  );
}

export default TaskCard;
