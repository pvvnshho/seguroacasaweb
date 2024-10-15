import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import RegistroComponente from '../src/componentes/RegistroComponente';
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function RegistroPage() {
  return (
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
      <AppBar position="static" sx={{ backgroundColor: '#3751FE' }}>
        <Toolbar>
          <LockIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Seguro a Casa</Typography>
          {/* Botones de navegación */}
          <Button color="inherit" component={Link} to="/">Inicio</Button>
          <Button color="inherit" component={Link} to="/login">Iniciar Sesión</Button>
        </Toolbar>
      </AppBar>

      {/* Logo representativo de registro */}
      <Box sx={{ mt: 3, mb: 2 }}>
        <AccountCircleIcon sx={{ fontSize: 60 }} />
      </Box>

      {/* Espacio entre la barra y el componente de registro */}
      <Box
        sx={{
          mt: 4,
          width: '100%',
          maxWidth: 400,
          p: 4,
          backgroundColor: 'rgba(255, 255, 255, 1)', // Color blanco
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(255, 255, 255, 1)',
        }}
      >
        <RegistroComponente />
      </Box>
    </Box>
  );
}

export default RegistroPage;




