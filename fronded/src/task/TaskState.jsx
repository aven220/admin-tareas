import { useState } from "react";

function TaskState() {
    const [estado, setEstado] = useState('');

    const handleEstado = (e) => {
        setEstado(e.target.value);
    };

    return (
        <div>
            <select value={estado} onChange={handleEstado} style={{ color: 'black', backgroundColor: estado === '' ? 'white' : estado === '1' ? 'red' : estado === '2' ? 'orange' : 'green' }}>
                <option value="">--Seleccionar--</option>
                <option value="1">Pendiente</option>
                <option value="2">En progreso</option>
                <option value="3">Completada</option>
            </select>
        </div>
    )
}

export default TaskState;

