// LoginPage.js
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles'; // Importa ThemeProvider
import { AppBar, Toolbar, Button } from '@mui/material'; // Importa AppBar y Toolbar
import { Link } from 'react-router-dom'; // Importa Link
import LoginComponente from '../src/componentes/LoginComponente'; // Asegúrate de que la ruta sea correcta

const demoTheme = createTheme({
  // Define tu tema aquí si es necesario
});

function DemoPageContent() {
  return (
    <ThemeProvider theme={demoTheme}> {/* Envuelve en ThemeProvider para aplicar el tema */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          flex: 1,
        }}
      >
        {/* Barra de Navegación Superior */}
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>Iniciar Sesión</Typography>
            {/* Botones de navegación */}
            <Button color="inherit" component={Link} to="/">Inicio</Button>
            <Button color="inherit" component={Link} to="/registro">Registrar</Button>
          </Toolbar>
        </AppBar>

        {/* Espacio entre la barra y el componente de inicio de sesión */}
        <Box sx={{ mt: 4, width: '100%', maxWidth: 400, p: 4, border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}> 
          {/* Añade un margen superior, ancho, y padding al LoginComponente */}
          <LoginComponente /> {/* Aquí se inserta tu componente de inicio de sesión */}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default DemoPageContent; // Asegúrate de exportar el componente




