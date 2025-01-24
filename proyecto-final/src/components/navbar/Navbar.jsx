import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import CartWidget from './CartWidget/CartWidget';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Alterna el estado del menú
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Cierra el menú
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-logo">OversizeLook</h1>
      <div className="navbar-links-container">
        <ul className="navbar-links">
          <li><Link to="/">Inicio</Link></li>
          <li>
            <a href="#servicios" onClick={toggleMenu}>Artículos</a>
            {isMenuOpen && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/category/remeras" onClick={closeMenu}>Remeras</Link>
                </li>
                <li>
                  <Link to="/category/pantalones" onClick={closeMenu}>Pantalones</Link>
                </li>
              </ul>
            )}
          </li>
          <li><Link to="#contacto">Contacto</Link></li>
        </ul>
      </div>
      <CartWidget />
    </nav>
  );
}

export default Navbar;