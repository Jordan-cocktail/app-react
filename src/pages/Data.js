import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserData() {
  const [userData, setUserData] = useState({ credits: 0, life: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('authToken');  // Récupère le token depuis localStorage
      const userId = 1; // Remplace par l'ID de l'utilisateur connecté

      const response = await axios.get(`https://dev11.cocktail-num.fr/wp-json/wp/v2/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Logge la réponse complète pour vérifier la structure
      console.log(response.data);  // Affiche la réponse de l'API dans la console

      // Récupère les valeurs des champs ACF (credits et life)
      const credits = response.data.acf.credits;
      const life = response.data.acf.life;

      // Met à jour l'état avec les données récupérées
      setUserData({ credits, life });
      setLoading(false);  // Fin du chargement
    } catch (error) {
      console.error(error);  // Affiche l'erreur dans la console
      setError('Erreur lors de la récupération des données utilisateur');
      setLoading(false);
    }
  };

  // Utilise useEffect pour appeler fetchUserData au chargement du composant
  useEffect(() => {
    fetchUserData();
  }, []);

  // Affichage des données
  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h3>Crédits: {userData.credits}</h3>
      <h3>Vies: {userData.life}</h3>
    </div>
  );
}

export default UserData;
