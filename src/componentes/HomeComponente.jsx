import React from 'react';
import {
  Box,
  Grid,
  CardMedia,
  Typography,
  Card,
  Button,
  IconButton,
} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const cardData = [
  {
    img: 'url_to_image1.jpg',
    tag: 'Transporte Seguro',
    title: 'Furgones Escolares',
    description: 'Furgones equipados con GPS para un seguimiento seguro.',
    authors: 'Autor 1',
  },
  {
    img: 'url_to_image2.jpg',
    tag: 'Horarios',
    title: 'Horarios de Recolección',
    description: 'Consulta los horarios de recolección de los estudiantes.',
    authors: 'Autor 2',
  },
  {
    img: 'url_to_image3.jpg',
    tag: 'Contacta',
    title: 'Soporte al Cliente',
    description: 'Estamos aquí para ayudarte con cualquier consulta.',
    authors: 'Autor 3',
  },
];

const HomeComponente = () => {
  const handleLogout = () => {
    console.log('Cerrar sesión');
    // Aquí iría la lógica para cerrar sesión
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {cardData.map((card, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card variant="outlined">
              <CardMedia component="img" alt={card.title} image={card.img} />
              <Box sx={{ padding: 2 }}>
                <Typography variant="caption" component="div">{card.tag}</Typography>
                <Typography variant="h6" component="div">{card.title}</Typography>
                <Typography variant="body2" color="text.secondary">{card.description}</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ padding: 2 }}>
                {card.authors}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ marginTop: 4, border: '1px solid #ccc', padding: 2 }}>
        <Typography variant="h6">Ubicación en el Mapa</Typography>
        <Box sx={{ height: 300, backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <MapIcon sx={{ fontSize: 60, color: '#888' }} />
          <Typography variant="body2" color="text.secondary">Aquí va el mapa</Typography>
        </Box>
      </Box>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">Redes Sociales</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1 }}>
          <IconButton aria-label="Facebook">
            <img src="path_to_facebook_icon.png" alt="Facebook" />
          </IconButton>
          <IconButton aria-label="Twitter">
            <img src="path_to_twitter_icon.png" alt="Twitter" />
          </IconButton>
          <IconButton aria-label="Instagram">
            <img src="path_to_instagram_icon.png" alt="Instagram" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeComponente;
