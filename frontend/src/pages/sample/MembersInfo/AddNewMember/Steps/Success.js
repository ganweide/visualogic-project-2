import React from 'react';
import Box from '@mui/material/Box';

function Success() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
      }}
    >
      <div className='font-medium'>successfully Submitted!</div>
    </Box>
  );
}

export default Success;
