import React, { useState, useEffect } from 'react';
import { supabase } from '../createClient'; // Asegúrate de que la ruta esté correcta
import { Box, Typography, Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ConductoresComponente = () => {
  const [conductores, setConductores] = useState([]);

  // Función para obtener los conductores y sus furgones
  const fetchConductores = async () => {
    const { data: conductoresData, error: conductoresError } = await supabase
      .from('usuarios')
      .select(`
        rut_usuario,
        nombre_usuario,
        telefono,
        correo_usuario,
        furgones (
          matricula,
          modelo
        )
      `) // Establecemos la relación correctamente aquí.
      .eq('tipo_usuario', 'conductor'); // Aseguramos que solo sean conductores

    if (conductoresError) {
      alert('Error al obtener los conductores: ' + conductoresError.message);
      return;
    }

    setConductores(conductoresData);
  };

  useEffect(() => {
    fetchConductores();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Conductores
      </Typography>

      <Typography variant="h6" gutterBottom>
        Lista de Conductores y sus Furgones
      </Typography>
      <Grid container spacing={2}>
        {conductores.map((conductor) => (
          <Grid item xs={12} sm={6} md={4} key={conductor.rut_usuario}>
            <Box
              sx={{
                border: '1px solid #ccc',
                borderRadius: 2,
                padding: 2,
                textAlign: 'center',
                position: 'relative',
                backgroundColor: 'black',  // Fondo negro
                color: 'white',  // Texto blanco
                height: 250,
              }}
            >
              <Box sx={{ position: 'relative', zIndex: 2 }}>
                <Typography variant="body1"><strong>Nombre del Conductor:</strong> {conductor.nombre_usuario}</Typography>
                <Typography variant="body1"><strong>RUT del Conductor:</strong> {conductor.rut_usuario}</Typography>
                <Typography variant="body1"><strong>Teléfono del Conductor:</strong> {conductor.telefono}</Typography>
                <Typography variant="body1"><strong>Correo del Conductor:</strong> {conductor.correo_usuario}</Typography>

                {/* Asegúrate de que los datos del furgón estén bien referenciados */}
                <Typography variant="body1"><strong>Matrícula del Furgón:</strong> {conductor.furgones?.matricula}</Typography>
                <Typography variant="body1"><strong>Modelo del Furgón:</strong> {conductor.furgones?.modelo}</Typography>


              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ConductoresComponente;
