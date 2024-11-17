import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Header.css';

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header>
      <nav className="navbar">
        <h1>
          <Link to="/" className="logo-link">
            Fitness Store Online
          </Link>
        </h1>
        <ul className={`nav-links ${isNavOpen ? 'show' : ''}`}>
          <li><Link to="/" onClick={() => setIsNavOpen(false)}>Home</Link></li>
          <li className="dropdown" ref={dropdownRef}>
            <div 
              className="dropdown-toggle" 
              onClick={handleDropdownToggle} 
              aria-haspopup="true" 
              aria-expanded={isDropdownOpen}
            >
              Suplementos <i className="fas fa-caret-down"></i>
            </div>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li><Link to="/proteins" onClick={() => { setIsNavOpen(false); setIsDropdownOpen(false); }}>Proteínas</Link></li>
                <li><Link to="/creatines" onClick={() => { setIsNavOpen(false); setIsDropdownOpen(false); }}>Creatinas</Link></li>
                <li><Link to="/combos" onClick={() => { setIsNavOpen(false); setIsDropdownOpen(false); }}>Combos</Link></li>
              </ul>
            )}
          </li>
          <li><Link to="/blog" onClick={() => setIsNavOpen(false)}>Blog</Link></li>
          <li><Link to="/contact" onClick={() => setIsNavOpen(false)}>Contacto</Link></li>
          <li><Link to="/auth" onClick={() => setIsNavOpen(false)}>Iniciar Sesión</Link></li>
          <li>
            <Link to="/cart" onClick={() => setIsNavOpen(false)}>
              <i className="fas fa-shopping-cart"></i>
            </Link>
          </li>
        </ul>
        <div className="hamburger" onClick={handleNavToggle}>
          <i className={`fas ${isNavOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </div>
      </nav>
      <div className="header-bar"></div>
    </header>
  );
};

export default NavBar;
