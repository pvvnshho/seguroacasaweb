import React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

function SizeAvatars() {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar
        alt="Remy Sharp"
        src="/CUVcOWP4.webp"
        sx={{ width: 200, height: 200 }}
      />
    </Stack>
  );
}

export default SizeAvatars; // Exporta el componente

