import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// PrivateRoute protège l'accès aux routes lorsque l'utilisateur n'est pas connecté
const PrivateRoute = ({ element, ...rest }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn'); // Vérifie si l'utilisateur est connecté

  // Si l'utilisateur est connecté, affiche l'élément. Sinon, redirige vers la page de login.
  return isLoggedIn ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
