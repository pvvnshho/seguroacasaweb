// RutaComponente.jsx
import React from 'react';
import { GoogleMap, LoadScript, Polyline } from '@react-google-maps/api';
import { Box } from '@mui/material';

const containerStyle = {
  width: '100%',
  height: '400px', // Ajusta la altura según lo necesites
};

const center = {
  lat: -33.4489, // Latitud del centro del mapa
  lng: -70.6693, // Longitud del centro del mapa
};

// Define los puntos de la ruta fija
const path = [
  { lat: -33.4489, lng: -70.6693 }, // Punto de inicio
  { lat: -33.4589, lng: -70.6793 }, // Punto intermedio
  { lat: -33.4689, lng: -70.6893 }, // Punto final
];

const RutaComponente = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <LoadScript googleMapsApiKey="TU_API_KEY_DE_GOOGLE_MAPS">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13} // Nivel de acercamiento
          options={{
            disableDefaultUI: true, // Deshabilitar controles predeterminados
            clickableIcons: false, // Deshabilitar iconos clicables
            gestureHandling: 'greedy', // Permitir gestos de movimiento y zoom
          }}
        >
          <Polyline
            path={path}
            options={{
              strokeColor: '#FF0000', // Color de la ruta
              strokeOpacity: 1.0,
              strokeWeight: 2,
            }}
          />
        </GoogleMap>
      </LoadScript>
    </Box>
  );
};

export default RutaComponente;
