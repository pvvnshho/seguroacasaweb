import React, { useState, useEffect } from 'react';
import { supabase } from '../createClient'; // Asegúrate de que la ruta esté correcta
import { Box, Typography, Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const EstudiantesComponente = () => {
  const [estudiantes, setEstudiantes] = useState([]);

  // Función para obtener los estudiantes y sus usuarios
  const fetchEstudiantes = async () => {
    const { data: estudiantesData, error: estudiantesError } = await supabase
      .from('estudiantes')
      .select(`
        rut_estudiante,
        nombre_estudiante,
        fecha_nacimiento,
        curso,
        usuarios (
          nombre_usuario,
          telefono,
          correo_usuario
        )
      `) // Establecemos la relación correctamente aquí.
      .eq('usuarios.tipo_usuario', 'usuario'); // Aseguramos que solo sean usuarios

    if (estudiantesError) {
      alert('Error al obtener los estudiantes: ' + estudiantesError.message);
      return;
    }

    setEstudiantes(estudiantesData);
  };

  useEffect(() => {
    fetchEstudiantes();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Estudiantes
      </Typography>

      <Typography variant="h6" gutterBottom>
        Lista de Estudiantes
      </Typography>
      <Grid container spacing={2}>
        {estudiantes.map((estudiante) => (
          <Grid item xs={12} sm={6} md={4} key={estudiante.rut_estudiante}>
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
                <Typography variant="body1"><strong>Nombre del Estudiante:</strong> {estudiante.nombre_estudiante}</Typography>
                <Typography variant="body1"><strong>RUT del Estudiante:</strong> {estudiante.rut_estudiante}</Typography>
                <Typography variant="body1"><strong>Fecha de Nacimiento:</strong> {estudiante.fecha_nacimiento}</Typography>
                <Typography variant="body1"><strong>Curso:</strong> {estudiante.curso}</Typography>

                {/* Asegúrate de que los datos del usuario estén bien referenciados */}
                <Typography variant="body1"><strong>Nombre del Usuario:</strong> {estudiante.usuarios?.nombre_usuario}</Typography>
                <Typography variant="body1"><strong>Teléfono del Usuario:</strong> {estudiante.usuarios?.telefono}</Typography>
                <Typography variant="body1"><strong>Correo del Usuario:</strong> {estudiante.usuarios?.correo_usuario}</Typography>

                <Box sx={{ marginTop: 2 }}>
                  <IconButton onClick={() => console.log('Editar Estudiante')}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => console.log('Eliminar Estudiante')}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EstudiantesComponente;
