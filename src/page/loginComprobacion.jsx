import React, { useState } from 'react';
import { supabase } from '../createClient';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Grid, Select, MenuItem, InputLabel, FormControl, CircularProgress } from '@mui/material';

const LoginComprobacion = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rut, setRut] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('usuario');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden.');
      return;
    }

    if (tipoUsuario === 'admin') {
      setMessage('No puedes registrar un usuario como admin desde este formulario.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setMessage(`Error al registrar: ${error.message}`);
      } else {
        const { error: insertError } = await supabase
          .from('usuarios')
          .insert([
            {
              rut_usuario: rut,
              tipo_usuario: tipoUsuario,
              correo_usuario: email,
            },
          ]);

        if (insertError) {
          setMessage(`Error al registrar los datos adicionales: ${insertError.message}`);
        } else {
          setMessage('¡Registro exitoso! Revisa tu correo para verificar tu cuenta.');
          navigate('/home');
        }
      }
    } catch (error) {
      setMessage(`Hubo un error al registrar: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(`Error al iniciar sesión: ${error.message}`);
      } else {
        const { data: userData, error: userError } = await supabase
          .from('usuarios')
          .select('tipo_usuario')
          .eq('correo_usuario', email)
          .single();

        if (userError) {
          setMessage(`Error al obtener el tipo de usuario: ${userError.message}`);
        } else {
          if (userData.tipo_usuario === 'conductor') {
            navigate('/perfilConductor');
          } else if (userData.tipo_usuario === 'admin') {
            navigate('/admin');
          } else {
            navigate('/home');
          }
        }
      }
    } catch (error) {
      setMessage(`Hubo un error al iniciar sesión: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#000', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container component="main" maxWidth="xs" sx={styles.container}>
        <Typography variant="h4" align="center" sx={styles.header}>
          {isLogin ? 'Iniciar sesión' : 'Registro'}
        </Typography>

        {message && (
          <Typography color="error" variant="body2" align="center" sx={{ marginBottom: 2 }}>
            {message}
          </Typography>
        )}

        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Correo electrónico"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={styles.input}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={styles.input}
              />
            </Grid>

            {!isLogin && (
              <>
                <Grid item xs={12}>
                  <TextField
                    label="Confirmar contraseña"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    sx={styles.input}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="RUT"
                    variant="outlined"
                    fullWidth
                    value={rut}
                    onChange={(e) => setRut(e.target.value)}
                    sx={styles.input}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Tipo de usuario</InputLabel>
                    <Select
                      value={tipoUsuario}
                      onChange={(e) => setTipoUsuario(e.target.value)}
                      label="Tipo de usuario"
                      sx={styles.input}
                    >
                      <MenuItem value="usuario">Usuario</MenuItem>
                      <MenuItem value="conductor">Conductor</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                onClick={isLogin ? handleLogin : handleRegister}
                disabled={loading}
                sx={styles.button}
              >
                {loading ? <CircularProgress size={24} /> : isLogin ? 'Iniciar sesión' : 'Registrarse'}
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Typography align="center" variant="body2">
                {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
                <span onClick={() => setIsLogin(!isLogin)} style={styles.switchLink}>
                  {isLogin ? 'Registrarse' : 'Iniciar sesión'}
                </span>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#2c2f36', // Fondo oscuro
    borderRadius: 8,
    padding: 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: '#fff',
    marginBottom: 3,
  },
  input: {
    '& .MuiInputBase-root': {
      backgroundColor: '#3a3f47', // Fondo oscuro para los inputs
      color: '#fff', // Texto blanco en los inputs
    },
    '& .MuiInputLabel-root': {
      color: '#bbb', // Color de las etiquetas en inputs
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#007BFF', // Color de borde en focus
    },
  },
  button: {
    backgroundColor: '#007BFF',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  },
  switchLink: {
    color: '#007BFF',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default LoginComprobacion;
