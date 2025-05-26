import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AxiosInterceptor from './api/axiosInterceptor';

import Login from './components/Login';
import Register from './components/Register';
import DataHewan from './components/DataHewan';
import DataPemilik from './components/DataPemilik';
import Home from './components/Home';


function App() {
  return (
    <>
    <AxiosInterceptor />
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/datahewan" element={<DataHewan />} />
      <Route path="/datapemilik" element={<DataPemilik />} />
      <Route path="*" element={<h2 style={{textAlign: "center", marginTop: 50}}>404 - Halaman tidak ditemukan</h2>} />
    </Routes>
    </>
  );
}

export default App;
