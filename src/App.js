// App.js
import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Component from './componentes/Component';
import MyButton from './componentes/MyButton';
import Typography from '@mui/material/Typography';
import SizeAvatars from './componentes/SizeAvatars';
import Stack from '@mui/material/Stack';
import Login from './login'; // Ruta corregida si es necesario
import Registro from './registro'; // Ruta corregida si es necesario
import Perfil from './perfil'; // Ruta corregida si es necesario
import Mensualidad from './mensualidad';
import Ruta from './ruta';
import Conductor from './conductor';
import Horarios from './horarios';
import Home from './home'; 
import Inicio from './inicio'; // Ruta correcta para Inicio
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Crea un tema
const theme = createTheme({
  palette: {
    mode: 'dark', // Cambia a 'light' si prefieres
  },
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulación de autenticación

  return (
    <ThemeProvider theme={theme}> {/* Envuelve la aplicación en ThemeProvider */}
      <div>
        <Routes>
          {/* Redirigir al componente Inicio si no está autenticado */}
          <Route path="/" element={isLoggedIn ? <Home /> : <Inicio />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/mensualidad" element={<Mensualidad />} />
          <Route path="/ruta" element={<Ruta />} />
          <Route path="/conductor" element={<Conductor />} />
          <Route path="/horarios" element={<Horarios />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;





