import React from 'react';
import { Avatar, Box, Typography, Grid, Paper, Card, CardContent } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const ConductorComponenteConTarjetas = () => {
  // Simulando datos del conductor
  const conductor = {
    nombre: 'Juan Pérez',
    tipoLicencia: 'Clase B',
    rut: '12.345.678-9',
    fechaNacimiento: '01/01/1980',
    telefono: '123456789',
    correo: 'juan.perez@example.com',
  };

  return (
    <Paper elevation={3} sx={{ p: 4, width: '80%', margin: '0 auto' }}> {/* Ajusta el tamaño aquí */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
        <Avatar 
          sx={{ width: 120, height: 120, mb: 2 }} 
          alt="Perfil del Conductor" 
          src="/ruta-a-la-foto-del-conductor.jpg" 
        />
        <Typography variant="h5" gutterBottom>
          {conductor.nombre}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Conductor de Furgón Escolar
        </Typography>
      </Box>

      <Grid container spacing={3}>

        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountBoxIcon sx={{ mr: 1 }} />
                <Typography variant="body1">RUT: {conductor.rut}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="body1">Tipo de Licencia: {conductor.tipoLicencia}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="body1">Fecha de nacimiento: {conductor.fechaNacimiento}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EmailIcon sx={{ mr: 1 }} />
                <Typography variant="body1">Correo: {conductor.correo}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PhoneIcon sx={{ mr: 1 }} />
                <Typography variant="body1">Teléfono: {conductor.telefono}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Paper>
  );
};

export default ConductorComponenteConTarjetas;
