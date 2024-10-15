// PerfilPage.js
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DescriptionIcon from '@mui/icons-material/Description';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import PerfilComponente from '../src/componentes/PerfilComponente'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const demoTheme = createTheme({
  // ... tema
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
      <PerfilComponente /> {/* Aquí se inserta tu componente de perfil */}
    </Box>
  );
}

function DashboardLayoutNavigationLinks(props) {
  const { window } = props;
  const navigate = useNavigate(); // Usa useNavigate para la navegación

  return (
    <AppProvider
      navigation={[

        {
          segment: 'mensualidad',
          title: 'Mensualidad',
          icon: <DescriptionIcon />,
          onClick: () => navigate('/mensualidad'), // Función para navegar a Mensualidad
        },
        {
          segment: 'perfil',
          title: 'Perfil',
          icon: <DescriptionIcon />,
          onClick: () => navigate('/perfil'), // Función para navegar a Perfil
        },
        {
          segment: 'ruta',
          title: 'Ruta',
          icon: <DescriptionIcon />,
          onClick: () => navigate('/ruta'), // Función para navegar a Ruta
        },
        {
          segment: 'conductor',
          title: 'Conductor',
          icon: <DescriptionIcon />,
          onClick: () => navigate('/conductor'), // Función para navegar a Conductor
        },
        {
          segment: 'horarios',
          title: 'Horarios',
          icon: <DescriptionIcon />,
          onClick: () => navigate('/horarios'), // Función para navegar a Horarios
        },
        {
          segment: 'home',
          title: 'Inicio',
          icon: <DescriptionIcon />,
          onClick: () => navigate('/'), // Función para navegar a Inicio
        },
      ]}
      theme={demoTheme}
    >
      <DashboardLayout>
        <DemoPageContent />
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutNavigationLinks.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutNavigationLinks;

