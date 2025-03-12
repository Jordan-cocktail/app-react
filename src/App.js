// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import NavTop from './Navtop';
import Login from './components/Login';
import OffCanvas from './components/OffCanvas'; // Importer le composant OffCanvas

// Importer les pages
import Classement from './pages/Classement';
import Tournois from './pages/Tournois';
import Accueil from './pages/Accueil'; 
import Jeux from './pages/Jeux';
import Shop from './pages/Shop';
import Data from './pages/Data';

// Importer le UserProvider
import { UserProvider } from './contexts/UserContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false); // Gestion de l'état pour l'OffCanvas

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true); // L'utilisateur est connecté
    } else {
      setIsAuthenticated(false); // L'utilisateur n'est pas connecté
    }
  }, []);

  const toggleOffCanvas = () => {
    setIsOffCanvasOpen(prevState => !prevState); // Change l'état d'ouverture de l'OffCanvas
  };

  return (
    <UserProvider>
      <Router>
        <div className="app">
          {isAuthenticated && <NavTop />} {/* Afficher NavTop si l'utilisateur est authentifié */}



          {/* OffCanvas */}
          <OffCanvas isOpen={isOffCanvasOpen} onClose={toggleOffCanvas} />

          <div className="content">
            <Routes>
              {/* Routes protégées qui nécessitent l'authentification */}
              <Route path="/" element={isAuthenticated ? <Accueil /> : <Navigate to="/login" />} />
              <Route path="/classement" element={isAuthenticated ? <Classement /> : <Navigate to="/login" />} />
              <Route path="/tournois" element={isAuthenticated ? <Tournois /> : <Navigate to="/login" />} />
              <Route path="/jeux" element={isAuthenticated ? <Jeux /> : <Navigate to="/login" />} />
              <Route path="/shop" element={isAuthenticated ? <Shop /> : <Navigate to="/login" />} />
              <Route path="/data" element={<Data />} />
              {/* Route pour la page de login */}
              <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
            </Routes>
          </div>

          {isAuthenticated && <Navbar />} {/* Afficher Navbar si l'utilisateur est authentifié */}
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
