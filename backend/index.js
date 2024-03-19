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

app.post('/login', (req, res) => {
    const login_usuario = req.body.login_usuario;
    const contrasena_usuario = req.body.contrasena_usuario;

    db.query('SELECT * FROM usuarios WHERE login_usuario = ? AND contrasena_usuario = ?', [login_usuario, contrasena_usuario], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error interno del servidor');
        } else if (result.length === 0) {
            res.status(401).send('Correo o contraseña incorrectos');
        } else {
            res.send('Inicio de sesión exitoso');
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
