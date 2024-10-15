// src/componentes/LoginComponente.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../createClient'; // Asegúrate de que la ruta sea correcta
import './LoginComponente.css'; // Importa tu hoja de estilos

const LoginComponente = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Obtiene la sesión actual del usuario
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Escucha los cambios en el estado de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Limpia la suscripción al desmontar el componente
    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Limpiar errores anteriores

    try {
      // Validar que los campos no estén vacíos
      if (!email || !password) {
        setError('Por favor, ingrese su correo electrónico y contraseña.');
        return;
      }

      // Intentar iniciar sesión con Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setError(`Error: ${error.message}`);
        console.error('Error durante el inicio de sesión:', error.message);
        return;
      }

      // Verificar si el correo ha sido confirmado
      if (!data.user.email_confirmed_at) {
        setError('Por favor, confirma tu correo electrónico antes de iniciar sesión.');
        return;
      }

      alert('Inicio de sesión exitoso');
    } catch (error) {
      console.error('Ocurrió un error inesperado:', error);
      setError('Ocurrió un error inesperado. Por favor, intenta nuevamente.');
    }
  };

  if (session) {
    return <div>¡Has iniciado sesión con éxito!</div>; // Mensaje de éxito
  }

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default LoginComponente;
