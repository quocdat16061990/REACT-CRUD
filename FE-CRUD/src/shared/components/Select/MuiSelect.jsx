import React, { forwardRef } from 'react';
import {  Controller, useForm } from 'react-hook-form';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const CustomSelect = forwardRef(({ name, label, options }, ref) => {
  const { control } = useForm();

  return (
    <FormControl variant="outlined" style={{ width: '100%' }}>
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select
            {...field}
            label={label}
            style={{ width: '100%' }}
            autoWidth
            ref={ref} 
          >
            {options.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
});

export default CustomSelect;