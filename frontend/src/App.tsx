import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import './App.css';

import Login from './auth/Login'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
    <ToastContainer />
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </Router>
    </>
   
  );
}

export default App;
