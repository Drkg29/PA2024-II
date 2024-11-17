import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">Acerca de Nosotros</h3>
          <p>Somos una tienda dedicada a ofrecer los mejores productos de fitness para ayudarte a alcanzar tus objetivos de salud y bienestar.</p>
        </div>
        <div className="footer-section">
          <h3 className="footer-title">Enlaces Útiles</h3>
          <ul className="footer-links">
            <li><a href="/home">Inicio</a></li>
            <li><a href="/about">Sobre Nosotros</a></li>
            <li><a href="/products">Productos</a></li>
            <li><a href="/contact">Contacto</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3 className="footer-title">Contáctanos</h3>
          <p>Email: support@fitnessstore.com</p>
          <p>Teléfono: +123 456 7890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Tienda de Fitness. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
