import React from 'react';
import { Input } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import './MuiInput.css'
const MuiInput = ({ name, label, ...rest }) => {
    const { control, errors } = useForm();
    const customStyle = {
        width: '100%',
        paddingLeft:'20px',
        paddingTop: '20px',
        paddingBottom: '20px',
        marginBottom : '11px',
        borderRadius: '10px',
        border: '1px solid #00B4AA', 
       
      };
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            {...rest}
            style={customStyle}
          />
        )}
      />
    );
  };
  
  export default MuiInput;

