import React from 'react';
import { motion } from 'framer-motion';

const OffCanvas = ({ isOpen, onClose, children, title }) => {
  return (
    <motion.div
      className={`off-canvas ${isOpen ? 'open' : ''}`}
      initial={{ left: '-100%' }}
      animate={{ left: isOpen ? 0 : '-100%' }}
      exit={{ left: '-100%' }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 40,
        mass: 1,
      }}
    >

      {/* Bouton de retour en haut à gauche */}
      <div className="off-canvas-header">
        <div className="off-canvas-header-left">
          <div className="off-canvas-close" onClick={onClose}>
            <i className="fa-solid fa-arrow-left"></i> Retour
          </div>
        </div>

        {/* Affichage dynamique du titre de la page */}
        <div className="off-canvas-header-center titrePage">
          <h2>{title}</h2>
        </div>

        <div className="off-canvas-header-right ">
        </div>

      </div>

      <div className="off-canvas-content">
        {children} {/* Affiche le contenu passé en tant qu'enfants */}
      </div>
    </motion.div>
  );
};

export default OffCanvas;
