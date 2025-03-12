import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Assure-toi de pouvoir utiliser des liens React Router si nécessaire
import CreditDisplay from './components/CreditDisplay';
import LifeDisplay from './components/LifeDisplay';
import { UserContext } from './contexts/UserContext';
import OffCanvas from './components/OffCanvas'; // Importer le composant OffCanvas
import Settings from './pages/Settings'; // Importer la page Settings
import Profil from './pages/Profil'; // Importer la page Profil

function NavTop() {
  const { credits, lives, avatarUrl, loading, error } = useContext(UserContext);
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false); // Pour gérer l'état du OffCanvas
  const [pageTitle, setPageTitle] = useState(''); // État pour le titre de la page
  const [isAvatarOffCanvasOpen, setIsAvatarOffCanvasOpen] = useState(false); // Pour gérer l'état du OffCanvas de Profil

  // Fonction pour ouvrir le OffCanvas de Paramètres
  const openSettings = () => {
    setPageTitle('Paramètres');
    setIsOffCanvasOpen(true);
  };

  // Fonction pour fermer le OffCanvas de Paramètres
  const closeSettings = () => {
    setIsOffCanvasOpen(false);
  };

  // Fonction pour ouvrir le OffCanvas de Profil
  const openProfil = () => {
    setPageTitle('Profil');
    setIsAvatarOffCanvasOpen(true); // Ouvre l'OffCanvas avec le Profil
  };

  // Fonction pour fermer le OffCanvas de Profil
  const closeProfil = () => {
    setIsAvatarOffCanvasOpen(false);
  };

  // Utilisation d'un useEffect pour ajouter et supprimer la classe 'no-scroll'
  useEffect(() => {
    if (isOffCanvasOpen || isAvatarOffCanvasOpen) {
      document.body.classList.add('no-scroll'); // Empêche le défilement du body
    } else {
      document.body.classList.remove('no-scroll'); // Restaure le défilement du body
    }

    return () => {
      document.body.classList.remove('no-scroll'); // Assure-toi que la classe est supprimée si le composant est démonté
    };
  }, [isOffCanvasOpen, isAvatarOffCanvasOpen]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="navtop">
      <div className="navtopLeft">
        {/* Icône de paramètres pour ouvrir l'OffCanvas */}
        <div className="settings" onClick={openSettings}>
          <i className="fa-solid fa-gear"></i>
        </div>
      </div>
      <div className="navtopCenter">
        <div className="nav-item credits">
          <CreditDisplay credits={credits} />
        </div>
        <div className="nav-item lifes">
          <LifeDisplay lives={lives} />
        </div>
      </div>
      <div className="navtopRight">
        {/* Clic sur l'avatar pour ouvrir l'OffCanvas avec le Profil */}
        <div className="avatar-container" onClick={openProfil}>
          {avatarUrl ? (
            <img src={avatarUrl} alt="Avatar utilisateur" className="avatar" />
          ) : (
            <div className="avatar-placeholder">A</div>
          )}
        </div>
      </div>

      {/* Affiche l'OffCanvas avec la page Settings */}
      <OffCanvas isOpen={isOffCanvasOpen} onClose={closeSettings} title={pageTitle}>
        <Settings />
      </OffCanvas>

      {/* Affiche l'OffCanvas avec la page Profil */}
      <OffCanvas isOpen={isAvatarOffCanvasOpen} onClose={closeProfil} title={pageTitle}>
        <Profil />
      </OffCanvas>
    </div>
  );
}

export default NavTop;
