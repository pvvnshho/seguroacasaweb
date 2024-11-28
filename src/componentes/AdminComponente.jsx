import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../createClient';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CommuteIcon from '@mui/icons-material/Commute'; // Icono para furgón

const AdminComponente = () => {
  const [users, setUsers] = useState([]);
  const [furgones, setFurgones] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const navigate = useNavigate();

  // Función para obtener los usuarios filtrando por tipo_usuario
  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('usuarios') // Reemplazar 'users' con 'usuarios'
      .select('*')
      .in('tipo_usuario', ['conductor', 'usuario']); // Filtra por tipo_usuario

    if (error) {
      console.error('Error fetching users:', error);
    } else {
      console.log('Usuarios obtenidos:', data); // Verifica los datos
      setUsers(data);
    }
  };

  // Función para obtener los furgones activos
  const fetchFurgones = async () => {
    const { data, error } = await supabase
      .from('furgones') // Reemplazar con la tabla 'furgones'
      .select('*');

    if (error) {
      console.error('Error fetching furgones:', error);
    } else {
      console.log('Furgones obtenidos:', data);
      setFurgones(data);
    }
  };

  // Función para obtener los estudiantes registrados
  const fetchEstudiantes = async () => {
    const { data, error } = await supabase
      .from('estudiantes') // Reemplazar con la tabla 'estudiantes'
      .select('*');

    if (error) {
      console.error('Error fetching estudiantes:', error);
    } else {
      console.log('Estudiantes obtenidos:', data);
      setEstudiantes(data);
    }
  };

  // Llamada a las funciones al montar el componente
  useEffect(() => {
    fetchUsers();
    fetchFurgones();
    fetchEstudiantes();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Panel de Administración
      </Typography>

      {/* Estadísticas */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Usuarios Registrados</Typography>
            <Typography variant="h5">{users.length > 0 ? users.length : 'No hay usuarios'}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Furgones Activos</Typography>
            <Typography variant="h5">{furgones.length > 0 ? furgones.length : 'No hay furgones'}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Estudiantes Registrados</Typography>
            <Typography variant="h5">{estudiantes.length > 0 ? estudiantes.length : 'No hay estudiantes'}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Acciones rápidas */}
      <Box sx={{ marginTop: 3 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginRight: 2 }}
          startIcon={<PersonAddIcon />}
          onClick={() => navigate('/registro')}
        >
          Agregar Usuario
        </Button>
        <Button
          variant="contained"
          color="secondary" // Color diferente para el botón de furgones
          sx={{ marginRight: 2 }}
          startIcon={<CommuteIcon />}
          onClick={() => navigate('/registrarFurgon')} // Redirige a la página de registro de furgones
        >
          Agregar Furgón
        </Button>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<VisibilityIcon />}
          onClick={() => navigate('/gestionUsuarios')}
        >
          Ver Usuarios
        </Button>
      </Box>

      {/* Lista de usuarios */}
      <Box sx={{ marginTop: 3 }}>
        <Typography variant="h5" gutterBottom>
          Lista de Usuarios
        </Typography>
        <Grid container spacing={2}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Paper sx={{ padding: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccountCircleIcon sx={{ fontSize: 40, marginRight: 2 }} />
                  <Typography variant="h6">{user.name}</Typography>
                </Box>
                <Typography variant="body2"><strong>Email:</strong> {user.email}</Typography>
                <Typography variant="body2"><strong>Tipo:</strong> {user.tipo_usuario}</Typography>
                <Typography variant="body2"><strong>Fecha de nacimiento:</strong> {user.fecha_nacimiento}</Typography>
                <Typography variant="body2"><strong>RUT:</strong> {user.rut}</Typography>
                <Typography variant="body2"><strong>Dirección:</strong> {user.direccion}</Typography>
                <Typography variant="body2"><strong>Teléfono:</strong> {user.telefono}</Typography>
                <Box sx={{ marginTop: 1 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={() => navigate(`/editarUsuario/${user.id}`)}
                  >
                    Editar
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminComponente;
