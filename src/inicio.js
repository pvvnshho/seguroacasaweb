// src/Inicio.js

import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import SettingsIcon from '@mui/icons-material/Settings';
import InicioComponente from './componentes/InicioComponente';

const Inicio = () => {
  return (
    <div>
      {/* Barra de Navegación */}
      <AppBar position="static" sx={{ backgroundColor: '#3751FE', height: '48px', boxShadow: 'none' }}>
        <Toolbar sx={{ minHeight: '48px', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '18px' }}>
            Seguro a Casa
          </Typography>

          {/* Iconos de configuración y redes sociales */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" aria-label="Configuración" size="small">
              <SettingsIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="Facebook" size="small" sx={{ ml: 1 }}>
              <FacebookIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="Twitter" size="small" sx={{ ml: 1 }}>
              <TwitterIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="Instagram" size="small" sx={{ ml: 1 }}>
              <InstagramIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <InicioComponente />
    </div>
  );
};

export default Inicio;
