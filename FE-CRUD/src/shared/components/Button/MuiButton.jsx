import React from 'react';
import { Button } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
const MyButton = ({
    children,
    classes,
    color,
    component,
    href,
    size,
    sx,
    variant,
    ...props
}) => {
    return (
        <Button
            classes={classes}
            color={color}
            component={component}
            href={href}
            sx={sx}
            variant={variant}
            {...props}
        >
            {children}
        </Button>
    );
};

export default MyButton;