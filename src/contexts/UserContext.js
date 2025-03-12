import React, { createContext, useState, useEffect } from 'react';
import apiUrl from '../config'; // Importation de l'URL de l'API

// Créer le contexte
export const UserContext = createContext();

// Créer le provider
export const UserProvider = ({ children }) => {
  const [credits, setCredits] = useState(0);
  const [lives, setLives] = useState(0);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      // Récupération des données utilisateur
      fetch(`${apiUrl}wp-json/wp/v2/users/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données utilisateur');
          }
          return response.json();
        })
        .then((data) => {
          setCredits(data.acf?.credits || 0);
          setLives(data.acf?.life || 0);

          const avatarId = data.acf?.photo_de_profil;
          if (avatarId) {
            // Récupérer l'URL de l'image
            fetch(`${apiUrl}wp-json/wp/v2/media/${avatarId}`)
              .then((response) => {
                if (!response.ok) {
                  throw new Error('Erreur lors de la récupération de l’avatar');
                }
                return response.json();
              })
              .then((imageData) => {
                setAvatarUrl(imageData.source_url || '');
              })
              .catch(() => {
                setError('Erreur lors de la récupération de l’avatar');
              });
          }
          setLoading(false);
        })
        .catch(() => {
          setError('Erreur lors de la récupération des données utilisateur');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider value={{ credits, lives, avatarUrl, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};
