import React from 'react';
import lifeImage from '../images/coeur.svg'; // Remplace avec l'image appropriée pour les vies

function LifeDisplay({ lives }) {
  return (
    <div className="life-display">
      <i class="fa-solid fa-bolt-lightning"></i> {/* Utilisation de l'image importée */}
      <span className="lives">{lives}</span> {/* Affichage du nombre de vies */}
    </div>
  );
}

export default LifeDisplay;
