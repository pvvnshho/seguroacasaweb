import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { supabase } from '../createClient'; // Asegúrate de que esta es tu instancia de Supabase

const PagosComponente = () => {
  const [pagos, setPagos] = useState([]);

  useEffect(() => {
    // Obtener los pagos guardados en la base de datos
    const fetchPagos = async () => {
      const { data, error } = await supabase
        .from('pagos') // La tabla donde guardas los pagos
        .select('*') // Seleccionamos todos los pagos
        .order('date', { ascending: false }); // Ordenamos por fecha (más reciente primero)

      if (error) {
        console.error('Error al obtener los pagos:', error.message);
      } else {
        setPagos(data);
      }
    };

    fetchPagos();
  }, []);

  return (
    <Paper sx={{ p: 4, maxWidth: 1000, margin: '0 auto', borderRadius: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Pagos Realizados
      </Typography>
      <Typography variant="body1" gutterBottom>
        Aquí puedes ver el historial de todos los pagos realizados por los usuarios.
      </Typography>

      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="h6">Email</Typography></TableCell>
              <TableCell><Typography variant="h6">Monto</Typography></TableCell>
              <TableCell><Typography variant="h6">Fecha</Typography></TableCell>
              <TableCell><Typography variant="h6">Estado</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pagos.length > 0 ? (
              pagos.map((pago) => (
                <TableRow key={pago.id}>
                  <TableCell>{pago.user_email}</TableCell>
                  <TableCell>{pago.amount} USD</TableCell>
                  <TableCell>{new Date(pago.date).toLocaleString()}</TableCell>
                  <TableCell>{pago.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>No se han realizado pagos aún.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default PagosComponente;
