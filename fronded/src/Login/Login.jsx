import { useState } from "react";
import "./Login.css";
import Axios from 'axios';

function Login({ setUsuarios }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cedula, setCedula] = useState("");
  const [celular, setCelular] = useState("");
  const [error, setError] = useState(false);
  const [registerMode, setRegisterMode] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (registerMode) {
      if (
        password !== confirmPassword ||
        !email.includes("@") ||
        !email.includes(".")
      ) {
        setError(true);
        return;
      }
      try {
        const response = await Axios.post('http://localhost:3001/crear', {
          id_cedula: cedula,
          nombre_usuario: username,
          login_usuario: username,
          email_usuario: email,
          celular_usuario: celular,
          contrasena_usuario: password
        });
        console.log(response.data);
        setError(false);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    } else {
      try {
        const response = await Axios.post('http://localhost:3001/login', {
            login_usuario: username,
            contrasena_usuario: password
        });
        console.log('Inicio de sesión exitoso. El ID de cédula es:', response.data.id_cedula);
        setError(false);
        setUsuarios([response.data.id_cedula]); 
    } catch (error) {
        console.error(error);
        setError(true);
    }
    
    }
  };

  const toggleMode = () => {
    setRegisterMode(!registerMode);
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setCedula("");
    setCelular("");
    setError(false);
  };

  return (
    <div className="login-form">
      <h2>{registerMode ? "Registro" : "Iniciar sesión"}</h2>
      <form onSubmit={handleSubmit}>
        {registerMode && (
          <>
            <div className="input-group">
              <input type="text" placeholder="Cédula" value={cedula} onChange={(e) => setCedula(e.target.value)} required/>
            </div>
            <div className="input-group">
              <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="input-group">
              <input type="text" placeholder="Celular" value={celular} onChange={(e) => setCelular(e.target.value)} required />
            </div>
          </>
        )}
        <div className="input-group">
          <input type="text" placeholder="Nombre de usuario" value={username} onChange={(e) => setUsername(e.target.value)} required={!registerMode} />
        </div>
        <div className="input-group">
          <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {registerMode && (
          <div className="input-group">
            <input type="password" placeholder="Confirmar contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
        )}
        <button type="submit" className="submit-button">
          {registerMode ? "Registrarse" : "Ingresar"}
        </button>
      </form>
      {error && (
        <p style={{ color: "red" }}>
          {registerMode
            ? "Error al registrar. Por favor, revise sus datos."
            : "Usuario o contraseña incorrectos"}
        </p>
      )}
      <p>
        {registerMode
          ? "¿Ya tienes una cuenta?"
          : "¿No tienes una cuenta?"}
        <button className="toggle-button" onClick={toggleMode}>
          {registerMode ? "Iniciar sesión" : "Registrarse"}
        </button>
      </p>
    </div>
  );
}

export default Login;
