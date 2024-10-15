import React from 'react';
import { Box, Stack, Grid, Card, CardContent, TextField, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import fondo from '../fondo.png';

const InicioComponente = () => {
  return (
    <div>
      {/* Hero Section */}
      <Box
        sx={{
          height: '80vh',
          backgroundImage: `url(${fondo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          textAlign: 'center',
          padding: '20px',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: '#fff',
            padding: '10px',
            borderRadius: '5px',
            textShadow: '3px 3px 6px rgba(0, 0, 0, 0.8)',
            maxWidth: '700px',
          }}
        >
          La seguridad de tus hijos es nuestra prioridad.
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mt: 2,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: '#fff',
            padding: '10px',
            borderRadius: '5px',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
          }}
        >
          Únete al mejor servicio de furgones escolares
        </Typography>

        <Stack spacing={2} direction="row" sx={{ mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#4CAF50',
              color: '#FFFFFF',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#45a049',
              },
            }}
            component={Link}
            to="/registro"
          >
            Registrarse
          </Button>

          <Button
            variant="outlined"
            size="large"
            sx={{
              backgroundColor: '#3751FE',
              color: '#FFFFFF',
              borderColor: '#3751FE',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#2F45C5',
                borderColor: '#2F45C5',
              },
              padding: '10px 20px',
            }}
            component={Link}
            to="/login"
          >
            Iniciar Sesión
          </Button>
        </Stack>
      </Box>

      {/* Sección de Características */}
      <Grid container spacing={4} sx={{ padding: '40px' }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Seguridad</Typography>
              <Typography>Conductores capacitados y vehículos monitoreados para una mayor tranquilidad.</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Tecnología</Typography>
              <Typography>Monitoreo en tiempo real de la ubicación del furgón.</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Comodidad</Typography>
              <Typography>Viajes programados para que tus hijos lleguen a tiempo y seguros.</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Sección de Registro Rápido */}
      <Box sx={{ maxWidth: 400, margin: '40px auto', textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>¿Listo para unirte?</Typography>
        <Stack spacing={2} sx={{ mt: 3 }}>
          <TextField label="Email" variant="outlined" fullWidth />
          <TextField label="Contraseña" variant="outlined" type="password" fullWidth />
          <Button variant="contained" fullWidth sx={{ backgroundColor: '#3751FE', fontWeight: 'bold' }}>
            Registrarse
          </Button>
        </Stack>
      </Box>
    </div>
  );
};

export default InicioComponente;
