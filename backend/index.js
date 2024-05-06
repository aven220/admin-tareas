const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bd_gestortareas'
});

const port = 3001;
// Crear nuevo usuario
app.post('/crear', (req, res) => {
    const id_cedula = req.body.id_cedula;
    const nombre_usuario = req.body.nombre_usuario;
    const contrasena_usuario = req.body.contrasena_usuario;
    const login_usuario = req.body.login_usuario;
    const email_usuario = req.body.email_usuario;
    const celular_usuario = req.body.celular_usuario;

    db.query('SELECT * FROM usuarios WHERE login_usuario = ?', login_usuario, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error interno del servidor');
        } else if (result.length > 0) {
            res.status(400).send('El nombre de usuario ya está registrado');
        } else {
            db.query('INSERT INTO usuarios(id_cedula, nombre_usuario, contrasena_usuario, login_usuario, email_usuario, celular_usuario) VALUES (?, ?, ?, ?, ?, ?)',
                [id_cedula, nombre_usuario, contrasena_usuario, login_usuario, email_usuario, celular_usuario],
                (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send('Error interno del servidor');
                    } else {
                        res.send('Usuario registrado con éxito');
                    }
                }
            );
        }
    });
});

//Login usuario
app.post('/login', (req, res) => {
    const login_usuario = req.body.login_usuario;
    const contrasena_usuario = req.body.contrasena_usuario;

    db.query('SELECT id_cedula FROM usuarios WHERE login_usuario = ? AND contrasena_usuario = ?', [login_usuario, contrasena_usuario], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error interno del servidor');
        } else if (result.length === 0) {
            res.status(401).send('Correo o contraseña incorrectos');
        } else {
            const id_cedula = result[0].id_cedula;
            res.send({ id_cedula }); 
        }
    });
});



// Ruta para crear una nueva tarea
app.post('/crearTarea', (req, res) => {
    const { nombre_tarea, descripcion_tarea, fechavencimiento_tarea, observacion_tarea, nombre_usuario_tarea } = req.body;

    const fecharegistro_tarea = new Date();
    const id_tipotarea_tarea = 1;
    const id_estadotarea_tarea = 1;

    db.query('INSERT INTO tareas (nombre_tarea, descripcion_tarea, fecharegistro_tarea, nombre_usuario_tarea, fechavencimiento_tarea, observacion_tarea, id_tipotarea_tarea, id_estadotarea_tarea) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [nombre_tarea, descripcion_tarea, fecharegistro_tarea, nombre_usuario_tarea, fechavencimiento_tarea, observacion_tarea, id_tipotarea_tarea, id_estadotarea_tarea],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error interno del servidor');
            } else {
                res.send('Tarea creada exitosamente');
            }
        }
    );
});

app.get('/tareas/:id_cedula', (req, res) => {
    const id_cedula = req.params.id_cedula;

    db.query('SELECT * FROM tareas WHERE nombre_usuario_tarea = ?', [id_cedula], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error interno del servidor');
      } else {
        console.log("Tareas encontradas:", result); 
        res.json(result);
      }
    });
  });
  
  app.delete('/eliminarTareas/:id_tarea', (req, res) => {
    const id_tarea = req.params.id_tarea;

    db.query('DELETE FROM tareas WHERE id_tarea = ?', [id_tarea], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error interno del servidor');
        } else {
            console.log("Tarea eliminada:", id_tarea); 
            res.status(200).send('Tarea eliminada correctamente');
        }
    });
});

  


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
