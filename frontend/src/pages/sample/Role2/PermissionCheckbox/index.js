import React from 'react';
import {
  Grid,
  Typography,
  FormControlLabel,
  Checkbox
} from '@mui/material';


const PermissionSection = ({ title, permissions, state, setState }) => {
  const handleChange = (permission) => (e) => {
    const parts = title.split('-');
    const roleKey = parts[0].toLowerCase() + parts.slice(1).join('');
    setState((prev) => ({
      ...prev,
      [roleKey]: {
        ...prev[roleKey],
        [permission.toLowerCase()]: e.target.checked,
      }
    }))
  };
  
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={3}>
        <Typography>{title}</Typography>
      </Grid>
      {permissions.map((permission) => {
        const parts = title.split('-');
        const roleKey = parts[0].toLowerCase() + parts.slice(1).join('');
        return (
          <Grid item xs={3} key={permission}>
            <FormControlLabel
              control={
              <Checkbox 
                checked={state[roleKey][permission.toLowerCase()]}
                onChange={handleChange(permission)} 
              />
              }
              label={permission}
            />
          </Grid>
      )})}
    </Grid>
  );
};

export default PermissionSection;
