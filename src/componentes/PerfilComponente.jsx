import React from 'react';
import { Avatar, Box, Typography, Grid, Paper, Card, CardContent } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const PerfilComponenteConTarjetas = () => {
  return (
    <Paper elevation={3} sx={{ p: 4, width: '80%', margin: '0 auto' }}> {/* Ajusta el tamaño aquí */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
        <Avatar 
          sx={{ width: 120, height: 120, mb: 2 }} 
          alt="Perfil del Tutor" 
          src="/ruta-a-la-foto-del-tutor.jpg" 
        />
        <Typography variant="h5" gutterBottom>
          Juan Pérez
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Tutor del Alumno
        </Typography>
      </Box>

      <Grid container spacing={3}>

        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountBoxIcon sx={{ mr: 1 }} />
                <Typography variant="body1">RUT: 12.345.678-9</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="body1">Fecha de nacimiento: 01/01/1980</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EmailIcon sx={{ mr: 1 }} />
                <Typography variant="body1">Correo: tutor@mail.com</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PhoneIcon sx={{ mr: 1 }} />
                <Typography variant="body1">Teléfono: +56 9 1234 5678</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <HomeIcon sx={{ mr: 1 }} />
                <Typography variant="body1">Dirección: Calle Falsa 123</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="body1">Nombre familiar: Pedro Pérez</Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Paper>
  );
};

export default PerfilComponenteConTarjetas;
