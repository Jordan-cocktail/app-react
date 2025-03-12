import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Importer useLocation pour obtenir l'URL actuelle

function Navbar() {
  const location = useLocation(); // Récupérer l'URL actuelle

  return (
    <div className="navbar">
      <Link to="/classement" className={`link ${location.pathname === '/classement' ? 'active' : ''}`}>
        <i className="fa-solid fa-trophy"></i> Podium
      </Link>
      <Link to="/tournois" className={`link ${location.pathname === '/tournois' ? 'active' : ''}`}>
        <i className="fa-solid fa-shield"></i> Tournois
      </Link>
      <Link to="/" className={`link ${location.pathname === '/' ? 'active' : ''}`}>
        <i className="fa-solid fa-house"></i> Accueil
      </Link>
      <Link to="/jeux" className={`link ${location.pathname === '/jeux' ? 'active' : ''}`}>
        <i className="fa-solid fa-gamepad"></i> Jeux
      </Link>
      <Link to="/shop" className={`link ${location.pathname === '/shop' ? 'active' : ''}`}>
        <i className="fa-solid fa-store"></i> Shop
      </Link>
    </div>
  );
}

export default Navbar;
