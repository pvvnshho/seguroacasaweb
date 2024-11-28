import React, { useState, useEffect } from 'react';
import { supabase } from '../createClient'; // Ajusta la ruta si es necesario
import { TextField, Button, Box, Typography, Grid, List, ListItem, ListItemText } from '@mui/material';

const Perfil = () => {
  const [usuario, setUsuario] = useState({
    rut_usuario: '',
    nombre_usuario: '',
    direccion: '',
    telefono: '',
    correo_usuario: '',
    foto_usuario: '',
    fecha_nacimiento: '', // Añadido aquí
  });

  const [estudiante, setEstudiante] = useState({
    rut_estudiante: '',
    nombre_estudiante: '',
    fecha_nacimiento: '', // Ya existía aquí
    curso: '',
  });

  const [estudiantesList, setEstudiantesList] = useState([]); // Lista para mostrar estudiantes
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error al obtener el usuario:', error);
        return;
      }
      if (data.user) {
        setUser(data.user);
        obtenerDatosUsuario(data.user.email);
      } else {
        window.location.href = '/login';
      }
    };

    getUser();
  }, []);

  const obtenerDatosUsuario = async (email) => {
    try {
      const { data: usuarioData, error: usuarioError } = await supabase
        .from('usuarios')
        .select('*')
        .eq('correo_usuario', email)
        .single();

      if (usuarioError) {
        console.error('Error al obtener los datos del usuario:', usuarioError);
        return;
      }

      setUsuario(usuarioData);

      // Intentamos obtener el estudiante solo si existe un rut_usuario en la tabla estudiantes
      const { data: estudianteData, error: estudianteError } = await supabase
        .from('estudiantes')
        .select('*')
        .eq('rut_usuario', usuarioData.rut_usuario);

      if (estudianteError) {
        console.error('Error al obtener los datos del estudiante:', estudianteError);
        return;
      }

      if (estudianteData.length > 0) {
        setEstudiante(estudianteData[0]);
        setEstudiantesList(estudianteData); // Guardar la lista de estudiantes
      } else {
        setEstudiante({}); // Si no hay datos, limpiamos el estado de estudiante
        setEstudiantesList([]); // Y limpiamos la lista
      }
    } catch (error) {
      console.error('Error al obtener los datos del usuario y estudiante:', error);
    }
  };

  const manejarCambio = (evento, tipo) => {
    const { name, value } = evento.target;
    if (tipo === 'usuario') {
      setUsuario((prevState) => ({ ...prevState, [name]: value }));
    } else {
      setEstudiante((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const guardarDatos = async () => {
    try {
      const { error: usuarioError } = await supabase
        .from('usuarios')
        .upsert([usuario], { onConflict: ['rut_usuario'] });

      if (usuarioError) throw usuarioError;

      const estudianteConRut = {
        ...estudiante,
        rut_usuario: usuario.rut_usuario,
      };

      const { error: estudianteError } = await supabase
        .from('estudiantes')
        .upsert([estudianteConRut], { onConflict: ['rut_estudiante'] });

      if (estudianteError) throw estudianteError;

      alert('Datos actualizados exitosamente.');
      setIsEditing(false);
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
      alert('Hubo un error al actualizar los datos.');
    }
  };

  const handleImageSelect = () => {
    const url = prompt("Ingresa la URL de la imagen:");
    if (url) {
      setImageURL(url);
      setUsuario((prevState) => ({
        ...prevState,
        foto_usuario: url,
      }));
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 4, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>Perfil del Usuario</Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
        {usuario.foto_usuario && (
          <img
            src={usuario.foto_usuario}
            alt="Foto de Perfil"
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid #1976d2',
            }}
          />
        )}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
        <Button variant="outlined" color="primary" onClick={handleImageSelect}>
          Seleccionar Foto
        </Button>
      </Box>

      <Typography variant="h6" gutterBottom>Datos del Tutor</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="RUT"
            name="rut_usuario"
            value={usuario.rut_usuario || ''}
            required
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nombre"
            name="nombre_usuario"
            value={usuario.nombre_usuario || ''}
            onChange={(e) => manejarCambio(e, 'usuario')}
            required
            disabled={!isEditing}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Dirección"
            name="direccion"
            value={usuario.direccion || ''}
            onChange={(e) => manejarCambio(e, 'usuario')}
            required
            disabled={!isEditing}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Teléfono"
            name="telefono"
            value={usuario.telefono || ''}
            onChange={(e) => manejarCambio(e, 'usuario')}
            required
            disabled={!isEditing}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Correo"
            name="correo_usuario"
            value={usuario.correo_usuario || ''}
            required
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Fecha de Nacimiento"
            name="fecha_nacimiento"
            value={usuario.fecha_nacimiento || ''}
            onChange={(e) => manejarCambio(e, 'usuario')}
            type="date"
            InputLabelProps={{ shrink: true }}
            required
            disabled={!isEditing}
          />
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>Datos del Estudiante</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="RUT Estudiante"
            name="rut_estudiante"
            value={estudiante.rut_estudiante || ''}
            onChange={(e) => manejarCambio(e, 'estudiante')}
            required
            disabled={!isEditing}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nombre Estudiante"
            name="nombre_estudiante"
            value={estudiante.nombre_estudiante || ''}
            onChange={(e) => manejarCambio(e, 'estudiante')}
            required
            disabled={!isEditing}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Fecha de Nacimiento Estudiante"
            name="fecha_nacimiento"
            value={estudiante.fecha_nacimiento || ''}
            onChange={(e) => manejarCambio(e, 'estudiante')}
            type="date"
            InputLabelProps={{ shrink: true }}
            required
            disabled={!isEditing}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Curso"
            name="curso"
            value={estudiante.curso || ''}
            onChange={(e) => manejarCambio(e, 'estudiante')}
            required
            disabled={!isEditing}
          />
        </Grid>
      </Grid>

      {isEditing && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
          <Button variant="contained" color="primary" onClick={guardarDatos}>
            Guardar Cambios
          </Button>
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
        <Button variant="outlined" color="primary" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancelar' : 'Editar'}
        </Button>
      </Box>

      <Typography variant="h6" gutterBottom sx={{ marginTop: 3 }}>Estudiantes Asociados</Typography>
      <List>
        {estudiantesList.map((student) => (
          <ListItem key={student.rut_estudiante}>
            <ListItemText primary={`${student.nombre_estudiante} - ${student.curso}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Perfil;
