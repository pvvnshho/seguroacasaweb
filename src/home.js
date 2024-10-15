import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DescriptionIcon from '@mui/icons-material/Description';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import HomeComponente from '../src/componentes/HomeComponente';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import Chip from '@mui/material/Chip';

const NAVIGATION = [

  {
    segment: 'mensualidad',
    title: 'Mensualidad',
    icon: <DescriptionIcon />,
  },
  {
    segment: 'perfil',
    title: 'Perfil',
    icon: <DescriptionIcon />,
  },
  {
    segment: 'ruta',
    title: 'Ruta',
    icon: <DescriptionIcon />,
  },
  {
    segment: 'conductor',
    title: 'Conductor',
    icon: <DescriptionIcon />,
  },
  {
    segment: 'horarios',
    title: 'Horarios',
    icon: <DescriptionIcon />,
  },
  {
    segment: 'home',
    title: 'Inicio',
    icon: <DescriptionIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent() {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        flex: 1,
      }}
    >
      <HomeComponente /> {/* Aquí se inserta tu componente de inicio */}
    </Box>
  );
}

function DashboardLayoutNavigationLinks(props) {
  const { window } = props;
  const navigate = useNavigate();

  return (
    <AppProvider
      navigation={NAVIGATION}
      theme={demoTheme}
      window={window}
    >
      <DashboardLayout>
        {/* Barra de herramientas superior donde está "Toolpad" */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 2,
            backgroundColor: '#f5f5f5', // Cambia el color de fondo si es necesario
            position: 'sticky',
            top: 0,
            zIndex: 1000,
          }}
        >
          {/* Contenedor para Collapse Menu y el contenido adicional */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton aria-label="Collapse Menu">
              <DescriptionIcon />
            </IconButton>
            <Typography variant="h6" sx={{ marginLeft: 1 }}>Toolpad</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip label="Transporte" />
            <Chip label="Horarios" />
            <Chip label="Contacto" />
            <input
              type="text"
              placeholder="Buscar..."
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <IconButton size="small" aria-label="Buscar">
              <SearchIcon />
            </IconButton>
            <IconButton size="small" aria-label="RSS feed">
              <RssFeedRoundedIcon />
            </IconButton>
          </Box>
        </Box>

        <DemoPageContent />
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutNavigationLinks.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutNavigationLinks;
