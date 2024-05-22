// App.tsx
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import IndexPage from './pages/index';

export default function App() {
    const theme = createTheme();
    const isLoggedIn = false;
  
    return (
    <ThemeProvider theme={theme}>
        <Router>
            <Routes>
            <Route path="/" element={<IndexPage/>}/>
            </Routes>
          
        </Router>
    </ThemeProvider>
      
    );
  }
