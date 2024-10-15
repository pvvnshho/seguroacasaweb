import React from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
} from '@mui/material';

const MensualidadComponente = () => {
  const [monto, setMonto] = React.useState(100000); // Establecemos el monto fijo
  const [email, setEmail] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Pago de $${monto} realizado. Un comprobante ha sido enviado a ${email}. ¡Gracias!`);
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, margin: '0 auto', borderRadius: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Pago de Mensualidad
      </Typography>
      <Typography variant="body1" gutterBottom>
        Realiza tu pago mensual de manera rápida y segura.
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Ingrese su Gmail"
          variant="outlined"
          fullWidth
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <Box sx={{ mb: 2, textAlign: 'center' }}>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              fontSize: '24px',
              padding: '20px',
              borderRadius: 4,
              width: '100%',
              bgcolor: '#4caf50', // Color verde
              '&:hover': {
                bgcolor: '#388e3c', // Color verde más oscuro al pasar el mouse
              },
            }}
          >
            Pago Mensual: ${monto}
          </Button>
        </Box>
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Realizar Pago
        </Button>
      </form>
      <Typography variant="h6" sx={{ mt: 4 }}>
        Plan Mensual
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card sx={{ bgcolor: '#e3f2fd' }}>
            <CardContent>
              <Typography variant="h6">Plan Furgón Escolar</Typography>
              <Typography variant="body1">$100.000</Typography>
              <Typography variant="body2">Pago mensual por uso del furgón escolar.</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="body2" color="text.secondary">
          Todos los pagos son seguros y procesados con tecnología de encriptación.
        </Typography>
      </Box>
    </Paper>
  );
};

export default MensualidadComponente;
