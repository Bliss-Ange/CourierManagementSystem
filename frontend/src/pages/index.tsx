import React from 'react';
import { 
    Box,
    Button,
    Typography,
} from "@mui/material";

export default function Homepage() {
    return (
        <>
            <Typography variant="h2" gutterBottom>
                Homepage
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            </Box>
        </>
    );
}