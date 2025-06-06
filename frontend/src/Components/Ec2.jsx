import * as React from 'react';
import { Box, TextField} from '@mui/material';
export default function Ec2() {

  return (
     <Box sx={{ width: '100%', maxWidth: 400, margin: '20px auto' }}>
    
        <TextField fullWidth label="Name" id="fullWidth" />
  
    </Box>
  );
}
