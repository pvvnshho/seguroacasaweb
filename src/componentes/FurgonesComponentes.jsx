import React, { useState, useEffect } from 'react';
import { supabase } from '../createClient'; // Asegúrate de que la ruta esté correcta
import { TextField, Button, Box, Typography, Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const FurgonesComponente = () => {
  const [matricula, setMatricula] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [año, setAño] = useState('');
  const [imagen, setImagen] = useState(null); // Estado para la imagen
  const [furgones, setFurgones] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentFurgon, setCurrentFurgon] = useState(null);
  const [showForm, setShowForm] = useState(false); // Estado para controlar la visibilidad del formulario

  // Función para obtener los furgones
  const fetchFurgones = async () => {
    const { data: furgonesData, error: furgonesError } = await supabase
      .from('furgones')
      .select('*');

    if (furgonesError) {
      alert('Error al obtener los furgones: ' + furgonesError.message);
      return;
    }

    setFurgones(furgonesData);
  };

  useEffect(() => {
    fetchFurgones();
  }, []);

  // Función para subir la imagen a Supabase y obtener la URL
  const uploadImage = async (imageFile) => {
    const fileName = `${Date.now()}-${imageFile.name}`; // Nombre único para el archivo
    const { data, error } = await supabase.storage
      .from('furgon-images') // Asegúrate de tener un bucket en Supabase llamado 'furgon-images'
      .upload(fileName, imageFile);

    if (error) {
      alert('Error al subir la imagen: ' + error.message);
      return null;
    }

    const imageUrl = `${supabase.storage.from('furgon-images').getPublicUrl(fileName).publicURL}`;
    return imageUrl; // Devuelve la URL de la imagen
  };

  const handleRegisterFurgon = async () => {
    if (editMode) {
      const { error } = await supabase
        .from('furgones')
        .update({ matricula, marca, modelo, año, foto_furgon: imagen }) // Cambié 'imagen' por 'foto_furgon'
        .eq('matricula', currentFurgon.matricula);  // Usamos "matricula" en lugar de "id"

      if (error) {
        alert('Error al actualizar el furgón: ' + error.message);
      } else {
        alert('Furgón actualizado exitosamente');
        setEditMode(false);
        setCurrentFurgon(null);
        fetchFurgones(); // Recarga los datos
      }
    } else {
      const uploadedImageUrl = imagen ? await uploadImage(imagen) : null;

      const { error } = await supabase
        .from('furgones')
        .insert([{
          matricula,
          marca,
          modelo,
          año,
          foto_furgon: uploadedImageUrl, // Guarda la URL de la imagen si se subió
        }]);

      if (error) {
        alert('Error al registrar el furgón: ' + error.message);
      } else {
        alert('Furgón registrado exitosamente');
        setMatricula('');
        setMarca('');
        setModelo('');
        setAño('');
        setImagen(null); // Resetea la imagen
        fetchFurgones(); // Recarga los datos
      }
    }
  };

  const handleEditFurgon = (furgon) => {
    setMatricula(furgon.matricula);
    setMarca(furgon.marca);
    setModelo(furgon.modelo);
    setAño(furgon.año);
    setImagen(furgon.foto_furgon); // Setea la imagen del furgón en modo edición
    setCurrentFurgon(furgon);
    setEditMode(true);
  };

  const handleDeleteFurgon = async (matricula) => {  // Usamos "matricula" en lugar de "id"
    const { error } = await supabase
      .from('furgones')
      .delete()
      .eq('matricula', matricula);  // Usamos "matricula" en lugar de "id"

    if (error) {
      alert('Error al eliminar el furgón: ' + error.message);
    } else {
      alert('Furgón eliminado exitosamente');
      fetchFurgones(); // Recarga los datos
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Furgones
      </Typography>

      {/* Botón para mostrar el formulario */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowForm(!showForm)}
        sx={{ marginBottom: 4 }}
      >
        {showForm ? 'Cancelar' : 'Agregar Furgón'}
      </Button>

      {/* Formulario de registro, solo visible si showForm es true */}
      {showForm && (
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h6">{editMode ? 'Editar Furgón' : 'Registrar Furgón'}</Typography>
          <TextField
            label="Matrícula"
            variant="outlined"
            fullWidth
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Marca"
            variant="outlined"
            fullWidth
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Modelo"
            variant="outlined"
            fullWidth
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Año"
            variant="outlined"
            fullWidth
            value={año}
            onChange={(e) => setAño(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            component="label"
            sx={{ marginBottom: 2 }}
          >
            Subir Imagen
            <input
              type="file"
              hidden
              onChange={(e) => setImagen(e.target.files[0])}
            />
          </Button>

          {imagen && (
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              Imagen seleccionada: {imagen.name}
            </Typography>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={handleRegisterFurgon}
          >
            {editMode ? 'Actualizar Furgón' : 'Registrar Furgón'}
          </Button>
        </Box>
      )}

      <Typography variant="h6" gutterBottom>
        Lista de Furgones
      </Typography>
      <Grid container spacing={2}>
        {furgones.map((furgon) => (
          <Grid item xs={12} sm={6} md={4} key={furgon.matricula}>  {/* Usamos "matricula" como clave */}
            <Box
              sx={{
                border: '1px solid #ccc',
                borderRadius: 2,
                padding: 2,
                textAlign: 'center',
                position: 'relative',
                backgroundImage: furgon.foto_furgon ? `url(${furgon.foto_furgon})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: 200,
              }}
            >
              <Box sx={{ position: 'relative', zIndex: 2 }}>
                <Typography variant="body1"><strong>Matrícula:</strong> {furgon.matricula}</Typography>
                <Typography variant="body1"><strong>Marca:</strong> {furgon.marca}</Typography>
                <Typography variant="body1"><strong>Modelo:</strong> {furgon.modelo} - <strong>Año:</strong> {furgon.año}</Typography>

                <Box sx={{ marginTop: 2 }}>
                  <IconButton onClick={() => handleEditFurgon(furgon)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteFurgon(furgon.matricula)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FurgonesComponente;
