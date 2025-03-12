import React from 'react';
import coinImage from '../images/coin.svg'; // Importation de l'image SVG

function CreditDisplay({ credits }) {
  return (
    <div className="credit-display">
      <i class="fa-solid fa-sack-dollar"></i> {/* Utilisation de l'image importée */}
      <span className="credits">{credits}</span>
    </div>
  );
}

export default CreditDisplay;
