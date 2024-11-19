import React, { useState } from 'react';
import { supabase } from '../createClient'; // Importa tu configuración de Supabase
import { useNavigate } from 'react-router-dom'; // Para la navegación
import '../componentes/LoginComponente1.css'; // Estilos CSS

export default function LoginComponente() {
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook de navegación para redirigir

  // Maneja el login con Google
  const handleLoginWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      if (error) {
        console.error('Error de autenticación:', error.message); // Muestra el error en consola
        setError(`Error: ${error.message}`); // Muestra el error en el estado para la UI
        return;
      }

      // Si el login es exitoso, redirige a /home
      console.log('Autenticación exitosa:', data); // Ver datos de usuario autenticado si es necesario
      navigate('/home'); // Redirección correcta a /home
    } catch (error) {
      console.error('Ocurrió un error inesperado:', error); // Muestra error inesperado en consola
      setError('Ocurrió un error inesperado. Por favor, intenta nuevamente.'); // Muestra mensaje de error en el estado
    }
  };

  return (
    <div className="login-container">
      <h1>Bienvenido a la aplicación</h1>
      <p>Inicia sesión con tu cuenta de Google</p>

      <div className="form-container">
        <button className="google-button" onClick={handleLoginWithGoogle}>
          Iniciar sesión con Google
        </button>

        {error && <p className="error-message">{error}</p>} {/* Muestra el mensaje de error en la interfaz */}
      </div>
    </div>
  );
}
