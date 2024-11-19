import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { supabase } from '../createClient'; // Importa tu instancia de Supabase

const MensualidadComponente = () => {
  const [monto] = useState(55); // Monto fijo de 55 dólares
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePayPalApprove = async (data, actions) => {
    setIsLoading(true); // Para mostrar un indicador de carga

    // Simulamos el pago al capturar la transacción
    await actions.order.capture().then(async () => {
      try {
        // Guardar el pago simulado en la base de datos (Simulando un pago real)
        const { data: paymentData, error } = await supabase
          .from('pagos') // La tabla donde guardas los pagos
          .insert([
            {
              user_email: email,
              amount: monto,
              status: 'Completo', // Estado del pago
              date: new Date().toISOString(), // Fecha del pago
            }
          ]);

        if (error) {
          console.error("Error al guardar el pago:", error.message);
          alert('Hubo un error al guardar el pago.');
        } else {
          alert(`Pago de $${monto} realizado con éxito. Un comprobante ha sido enviado a ${email}. ¡Gracias!`);
        }
      } catch (err) {
        console.error('Error al simular el pago:', err);
        alert('Hubo un problema al procesar el pago.');
      } finally {
        setIsLoading(false);
      }
    });
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, margin: '0 auto', borderRadius: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Pago de Mensualidad
      </Typography>
      <Typography variant="body1" gutterBottom>
        Realiza tu pago mensual de manera rápida y segura.
      </Typography>
      <form>
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
          <Typography variant="h6">Pago Mensual: ${monto}</Typography>
        </Box>
        <PayPalScriptProvider options={{ "client-id": "Af12X0lH_uk9rzSAJyGNAHq46IoEb6HZKSMLqh8VW0uPvLrUieptUZp_LY7I6Q0-5YKY4VnsbhpRITZS" }}>
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: monto.toString(),
                  },
                }],
              });
            }}
            onApprove={handlePayPalApprove}
          />
        </PayPalScriptProvider>
      </form>
      <Typography variant="h6" sx={{ mt: 4 }}>
        Plan Mensual
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card sx={{ bgcolor: '#e3f2fd' }}>
            <CardContent>
              <Typography variant="h6">Plan Furgón Escolar</Typography>
              <Typography variant="body1">$55 USD</Typography>
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
