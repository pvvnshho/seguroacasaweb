import * as React from 'react';
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { supabase } from '../createClient';

const RegistroComponente = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [userType, setUserType] = React.useState('usuario'); // Opciones: 'usuario' o 'conductor'
  const [error, setError] = React.useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      // Crear el usuario en Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      // Si el registro es exitoso, guarda el tipo de usuario en la base de datos
      const { error: insertError } = await supabase
        .from('users') // Asegúrate de que esta tabla existe y contiene el campo `user_type`
        .insert([{ email, user_type: userType }]);

      if (insertError) throw insertError;

      alert('Registro exitoso, verifica tu correo para confirmar tu cuenta.');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box sx={{ textAlign: 'center', minHeight: '100vh', bgcolor: 'white', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Registro
      </Typography>

      <Box
        sx={{
          width: '100%',
          maxWidth: '600px',
          mx: 'auto',
          p: 3,
          bgcolor: '#1e1e1e',  // Fondo del formulario en negro
          boxShadow: 3,         // Sombra para darle un toque elegante
          borderRadius: 2,
        }}
      >
        {error && <Typography sx={{ color: 'red', mb: 2 }}>{error}</Typography>}

        <TextField
          label="Correo Electrónico"
          variant="outlined"
          fullWidth
          sx={{ mb: 2, bgcolor: '#333', '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { color: 'white' }}}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <TextField
          label="Contraseña"
          variant="outlined"
          fullWidth
          sx={{ mb: 2, bgcolor: '#333', '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { color: 'white' }}}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
        />

        <TextField
          label="Confirmar Contraseña"
          variant="outlined"
          fullWidth
          sx={{ mb: 2, bgcolor: '#333', '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { color: 'white' }}}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          type="password"
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel sx={{ color: 'white' }}>Tipo de Usuario</InputLabel>
          <Select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            sx={{
              backgroundColor: '#333',
              color: 'white',
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
            }}
            required
          >
            <MenuItem value="usuario">Usuario</MenuItem>
            <MenuItem value="conductor">Conductor</MenuItem>
          </Select>
          <FormHelperText sx={{ color: 'white' }}>Selecciona el tipo de usuario</FormHelperText>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mb: 2 }}
          onClick={handleRegister}
        >
          Registrar
        </Button>
      </Box>
    </Box>
  );
};

export default RegistroComponente;
