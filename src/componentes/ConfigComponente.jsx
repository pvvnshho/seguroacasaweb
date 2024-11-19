import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import { supabase } from '../createClient'; // Asegúrate de que Supabase esté configurado correctamente

const ConfigComponente = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [editedUsuarios, setEditedUsuarios] = useState({}); // Estado para los cambios temporales

  // Cargar usuarios desde la base de datos
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('usuarios')
        .select(
          'rut_usuario, nombre_usuario, direccion, telefono, correo_usuario, foto_usuario, fecha_nacimiento, tipo_usuario, created_at'
        ) // Incluimos created_at
        .order('created_at', { ascending: false }); // Ordenamos de más nuevos a más antiguos

      if (error) {
        console.error('Error al cargar usuarios:', error.message);
      } else {
        setUsuarios(data);
      }
    };

    fetchUsers();
  }, []);

  // Manejar cambios en el tipo de usuario temporalmente
  const handleTypeChange = (rutUsuario, newType) => {
    setEditedUsuarios((prevState) => ({
      ...prevState,
      [rutUsuario]: newType,
    }));
  };

  // Guardar los cambios realizados
  const saveTypeChange = async (rutUsuario) => {
    const newType = editedUsuarios[rutUsuario];
    if (!newType) return; // Si no hay cambios, no hacer nada

    const { error } = await supabase
      .from('usuarios')
      .update({ tipo_usuario: newType })
      .eq('rut_usuario', rutUsuario);

    if (error) {
      console.error('Error al guardar el tipo de usuario:', error.message);
    } else {
      alert('Tipo de usuario actualizado correctamente');
      // Actualizamos el estado de los usuarios y eliminamos el cambio temporal
      setUsuarios((prevState) =>
        prevState.map((user) =>
          user.rut_usuario === rutUsuario ? { ...user, tipo_usuario: newType } : user
        )
      );
      setEditedUsuarios((prevState) => {
        const { [rutUsuario]: _, ...rest } = prevState; // Eliminamos el usuario actualizado de los cambios temporales
        return rest;
      });
    }
  };

  // Eliminar un usuario de la tabla y de Supabase Auth
  const deleteUser = async (rutUsuario, correoUsuario) => {
    try {
      // 1. Eliminar de Supabase Auth
      const { error: authError } = await supabase.auth.admin.deleteUserByEmail(correoUsuario);
      if (authError) {
        console.error('Error al eliminar usuario de Auth:', authError.message);
        alert(`No se pudo eliminar de la autenticación: ${authError.message}`);
        return;
      }

      // 2. Eliminar de la tabla `usuarios`
      const { error: dbError } = await supabase
        .from('usuarios')
        .delete()
        .eq('rut_usuario', rutUsuario);

      if (dbError) {
        console.error('Error al eliminar usuario de la tabla:', dbError.message);
        alert(`No se pudo eliminar de la tabla: ${dbError.message}`);
        return;
      }

      // 3. Actualizar el estado
      setUsuarios((prevState) => prevState.filter((user) => user.rut_usuario !== rutUsuario));
      alert('Usuario eliminado correctamente de Auth y de la base de datos.');
    } catch (error) {
      console.error('Error general al eliminar usuario:', error);
      alert('Hubo un problema al eliminar el usuario.');
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Configuración de Usuarios
      </Typography>

      <List>
        {usuarios.map((usuario) => (
          <ListItem key={usuario.rut_usuario}>
            <ListItemText
              primary={`${usuario.nombre_usuario} (${usuario.tipo_usuario})`}
              secondary={`RUT: ${usuario.rut_usuario} | Teléfono: ${usuario.telefono} | Dirección: ${usuario.direccion} | Correo: ${usuario.correo_usuario}`}
            />
            <FormControl sx={{ minWidth: 150, marginRight: 2 }}>
              <InputLabel>Tipo</InputLabel>
              <Select
                value={editedUsuarios[usuario.rut_usuario] || usuario.tipo_usuario}
                onChange={(e) => handleTypeChange(usuario.rut_usuario, e.target.value)}
                label="Tipo"
              >
                <MenuItem value="admin">Administrador</MenuItem>
                <MenuItem value="conductor">Conductor</MenuItem>
                <MenuItem value="usuario">Usuario</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={() => saveTypeChange(usuario.rut_usuario)}
              disabled={!editedUsuarios[usuario.rut_usuario]} // Deshabilita si no hay cambios
              sx={{ marginRight: 2 }}
            >
              Guardar
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => deleteUser(usuario.rut_usuario, usuario.correo_usuario)}
            >
              Eliminar
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ConfigComponente;
