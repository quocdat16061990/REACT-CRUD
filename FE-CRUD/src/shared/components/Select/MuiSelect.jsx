import React from 'react';
import { Select } from '@mui/material';
const MuiSelect = ({children , autoWidth , classes  , defaultOpen , defaultValue , input , onChange , ...props}) => {
    return (
        <Select autoWidth={autoWidth} classes={classes} defaultOpen = {defaultOpen} onChange={onChange} defaultValue={defaultValue} {...props}>{children}</Select>
    );
};

export default MuiSelect;