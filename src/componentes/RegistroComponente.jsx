import React, { useState } from 'react';
import { Box, TextField, Button, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Collapse } from '@mui/material';
import { supabase } from '../createClient'; // Asegúrate de que la ruta sea correcta

const RegistroComponente = () => {
  const [isConductor, setIsConductor] = useState(false);
  const [formData, setFormData] = useState({
    rut_usuario: '',
    nombre_usuario: '',
    fecha_nacimiento: '',
    direccion: '',
    nom_familiar: '',
    telefono: '',
    correo_usuario: '',
    contraseña_usuario: '', // Nuevo campo
    // Campos de conductor
    rut_conductor: '',
    correo_conductor: '',
    nombre_conductor: '',
    tipo_licencia: '',
    fecha_vencimiento: '',
    cod_licencia: '',
    telefono_conductor: '',
    contraseña_conductor: '', // Nuevo campo
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    let data, error;

    if (isConductor) {
      const { rut_conductor, correo_conductor, nombre_conductor, tipo_licencia, fecha_vencimiento, cod_licencia, telefono_conductor, contraseña_conductor } = formData;
      ({ data, error } = await supabase.from('conductores').insert([{ 
        rut_conductor, 
        correo_conductor, 
        nombre_conductor, 
        tipo_licencia, 
        fecha_vencimiento, 
        cod_licencia, 
        telefono: telefono_conductor,
        contraseña_conductor 
      }]));
    } else {
      const { rut_usuario, nombre_usuario, fecha_nacimiento, direccion, nom_familiar, telefono, correo_usuario, contraseña_usuario } = formData;
      ({ data, error } = await supabase.from('usuarios').insert([{ 
        rut_usuario, 
        nombre_usuario, 
        fecha_nacimiento, 
        direccion, 
        nom_familiar, 
        telefono, 
        correo_usuario,
        contraseña_usuario 
      }]));
    }

    if (error) {
      console.error('Error al registrar:', error);
      alert(`Error al registrar: ${error.message} (Código: ${error.code})`);
    } else {
      console.log('Registro exitoso:', data);
      alert('Registro exitoso!');
      setFormData({
        rut_usuario: '',
        nombre_usuario: '',
        fecha_nacimiento: '',
        direccion: '',
        nom_familiar: '',
        telefono: '',
        correo_usuario: '',
        contraseña_usuario: '', // Reiniciar campo
        rut_conductor: '',
        correo_conductor: '',
        nombre_conductor: '',
        tipo_licencia: '',
        fecha_vencimiento: '',
        cod_licencia: '',
        telefono_conductor: '',
        contraseña_conductor: '', // Reiniciar campo
      });
    }
  };
  return (
    <Box sx={{ textAlign: 'center', bgcolor: '#121212', minHeight: '100vh', p: 2 }}> {/* Fondo oscuro */}
      <Typography variant="h5" gutterBottom sx={{ color: 'white' }}> {/* Texto en blanco */}
        Crear Cuenta
      </Typography>
      <Box
        sx={{
          width: '100%',
          maxWidth: '600px',
          mx: 'auto',
          p: 3,
          bgcolor: '#1e1e1e', // Fondo del formulario oscuro
          boxShadow: 1,
          borderRadius: 2,
        }}
      >
        <FormControl component="fieldset" sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ color: 'white' }}> {/* Texto en blanco */}
            ¿Eres un conductor?
          </Typography>
          <RadioGroup
            row
            value={isConductor ? 'conductor' : 'usuario'}
            onChange={(e) => setIsConductor(e.target.value === 'conductor')}
          >
            <FormControlLabel 
              value="usuario" 
              control={<Radio />} 
              label={<Typography sx={{ color: 'white' }}>Usuario</Typography>} 
            /> {/* Texto en blanco */}
            <FormControlLabel 
              value="conductor" 
              control={<Radio />} 
              label={<Typography sx={{ color: 'white' }}>Conductor</Typography>} 
            /> {/* Texto en blanco */}
          </RadioGroup>
        </FormControl>

        {/* Campos de usuario o conductor */}
        {isConductor ? (
          <Collapse in={isConductor}>
            <Typography variant="h6" sx={{ mb: 2, color: 'white' }}> {/* Texto en blanco */}
              Información del Conductor
            </Typography>
            <TextField
              label="RUT Conductor"
              variant="outlined"
              fullWidth
              sx={{ mb: 2, bgcolor: '#2e2e2e' }} // Fondo de input oscuro
              name="rut_conductor"
              value={formData.rut_conductor}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'white' } }} // Label en blanco
              inputProps={{ style: { color: 'white' } }} // Input en blanco
            />
            <TextField
              label="Correo Conductor"
              variant="outlined"
              fullWidth
              sx={{ mb: 2, bgcolor: '#2e2e2e' }} // Fondo de input oscuro
              name="correo_conductor"
              value={formData.correo_conductor}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'white' } }} // Label en blanco
              inputProps={{ style: { color: 'white' } }} // Input en blanco
            />
            <TextField
              label="Nombre Conductor"
              variant="outlined"
              fullWidth
              sx={{ mb: 2, bgcolor: '#2e2e2e' }} // Fondo de input oscuro
              name="nombre_conductor"
              value={formData.nombre_conductor}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'white' } }} // Label en blanco
              inputProps={{ style: { color: 'white' } }} // Input en blanco
            />
            <TextField
              label="Tipo de Licencia"
              variant="outlined"
              fullWidth
              sx={{ mb: 2, bgcolor: '#2e2e2e' }} // Fondo de input oscuro
              name="tipo_licencia"
              value={formData.tipo_licencia}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'white' } }} // Label en blanco
              inputProps={{ style: { color: 'white' } }} // Input en blanco
            />
            <TextField
              label="Fecha de Vencimiento"
              variant="outlined"
              type="date"
              fullWidth
              sx={{ mb: 2, bgcolor: '#2e2e2e' }} // Fondo de input oscuro
              InputLabelProps={{ shrink: true, style: { color: 'white' } }} // Label en blanco
              name="fecha_vencimiento"
              value={formData.fecha_vencimiento}
              onChange={handleChange}
              inputProps={{ style: { color: 'white' } }} // Input en blanco
            />
            <TextField
              label="Código de Licencia"
              variant="outlined"
              fullWidth
              sx={{ mb: 2, bgcolor: '#2e2e2e' }} // Fondo de input oscuro
              name="cod_licencia"
              value={formData.cod_licencia}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'white' } }} // Label en blanco
              inputProps={{ style: { color: 'white' } }} // Input en blanco
            />
            <TextField
              label="Teléfono Conductor"
              variant="outlined"
              fullWidth
              sx={{ mb: 2, bgcolor: '#2e2e2e' }} // Fondo de input oscuro
              name="telefono_conductor"
              value={formData.telefono_conductor}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'white' } }} // Label en blanco
              inputProps={{ style: { color: 'white' } }} // Input en blanco
            />
            <TextField
              label="Contraseña"
              type="password"
              variant="outlined"
              fullWidth
              sx={{ mb: 2, bgcolor: '#2e2e2e' }} // Fondo de input oscuro
              name="contraseña_conductor" // Agregar aquí
              value={formData.contraseña_conductor}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'white' } }} // Label en blanco
              inputProps={{ style: { color: 'white' } }} // Input en blanco
            />
          </Collapse>
        ) : (
          <Collapse in={!isConductor}>
            <TextField
              label="RUT Usuario"
              variant="outlined"
              fullWidth
              sx={{ mb: 2, bgcolor: '#2e2e2e' }} // Fondo de input oscuro
              name="rut_usuario"
              value={formData.rut_usuario}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'white' } }} // Label en blanco
              inputProps={{ style: { color: 'white' } }} // Input en blanco
            />
            <TextField
              label="Nombre Usuario"
              variant="outlined"
              fullWidth
              sx={{ mb: 2, bgcolor: '#2e2e2e' }} // Fondo de input oscuro
              name="nombre_usuario"
              value={formData.nombre_usuario}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'white' } }} // Label en blanco
              inputProps={{ style: { color: 'white' } }} // Input en blanco
            />
            <TextField
              label="Fecha de Nacimiento"
              variant="outlined"
              type="date"
              fullWidth
              sx={{ mb: 2, bgcolor: '#2e2e2e' }} // Fondo de input oscuro
              InputLabelProps={{ shrink: true, style: { color: 'white' } }} // Label en blanco
              name="fecha_nacimiento"
              value={formData.fecha_nacimiento}
              onChange={handleChange}
              inputProps={{ style: { color: 'white' } }} // Input en blanco
            />
            <TextField
              label="Dirección"
              variant="outlined"
              fullWidth
              sx={{ mb: 2, bgcolor: '#2e2e2e' }} // Fondo de input oscuro
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'white' } }} // Label en blanco
              inputProps={{ style: { color: 'white' } }} // Input en blanco
            />
            <TextField
              label="Nombre Familiar"
              variant="outlined"
              fullWidth
              sx={{ mb: 2, bgcolor: '#2e2e2e' }} // Fondo de input oscuro
              name="nom_familiar"
              value={formData.nom_familiar}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'white' } }} // Label en blanco
              inputProps={{ style: { color: 'white' } }} // Input en blanco
            />
            <TextField
              label="Teléfono"
              variant="outlined"
              fullWidth
              sx={{ mb: 2, bgcolor: '#2e2e2e' }} // Fondo de input oscuro
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'white' } }} // Label en blanco
              inputProps={{ style: { color: 'white' } }} // Input en blanco
            />
            <TextField
              label="Correo Usuario"
              variant="outlined"
              fullWidth
              sx={{ mb: 2, bgcolor: '#2e2e2e' }} // Fondo de input oscuro
              name="correo_usuario"
              value={formData.correo_usuario}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'white' } }} // Label en blanco
              inputProps={{ style: { color: 'white' } }} // Input en blanco
            />
            <TextField
              label="Contraseña"
              type="password"
              variant="outlined"
              fullWidth
              sx={{ mb: 2, bgcolor: '#2e2e2e' }} // Fondo de input oscuro
              name="contraseña_usuario" // Agregar aquí
              value={formData.contraseña_usuario}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'white' } }} // Label en blanco
              inputProps={{ style: { color: 'white' } }} // Input en blanco
            />
          </Collapse>
        )}

        <Button variant="contained" color="primary" onClick={handleRegister} fullWidth>
          Registrarse
        </Button>
      </Box>
    </Box>
  );
};

export default RegistroComponente;

