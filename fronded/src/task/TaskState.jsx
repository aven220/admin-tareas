import { useState } from "react";

function TaskState({ id_estadotarea_tarea }) {
    const [estado, setEstado] = useState(parseInt(id_estadotarea_tarea));

    const handleEstado = (e) => {
        setEstado(parseInt(e.target.value));
    };

    return (
        <div>
            {/* <p>{id_estadotarea_tarea}</p> */}
            <select value={estado} onChange={handleEstado} style={{ color: 'black', backgroundColor:  estado === 1 ? 'red' : estado === 2 ? 'orange' : 'green' }}>
                <option value="1">Pendiente</option>
                <option value="2">En progreso</option>
                <option value="3">Completada</option>
            </select>
        </div>
    )
}

export default TaskState;
