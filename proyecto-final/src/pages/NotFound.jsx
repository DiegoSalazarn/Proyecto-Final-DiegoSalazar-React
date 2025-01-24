import React from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>404 - Página no encontrada</h2>
      <p>La ruta que intentaste acceder no existe.</p>
      <Link to="/" style={{ color: '#007bff', textDecoration: 'underline' }}>
        Volver al inicio
      </Link>
    </div>
  );
}

export default NotFound;

