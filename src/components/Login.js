import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Afficher le chargement pendant la requête

    try {
      // Faire une requête POST à l'API pour récupérer le token
      const response = await fetch('https://dev11.cocktail-num.fr/wp-json/jwt-auth/v1/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,  // Utilise le champ username de l'état
          password,  // Utilise le champ password de l'état
        }),
      });

      if (!response.ok) {
        throw new Error('Identifiants invalides');
      }

      // Si la réponse est ok, récupérer le token
      const data = await response.json();

      // Sauvegarder le token dans localStorage
      localStorage.setItem('authToken', data.token);

      // Rediriger vers la page d'accueil après connexion réussie
      window.location.href = '/';  // Remplace par ta redirection souhaitée

    } catch (error) {
      setError(error.message);  // Afficher l'erreur si quelque chose échoue
    } finally {
      setLoading(false);  // Désactiver le chargement une fois la requête terminée
    }
  };

  return (
    <div className="login-form">
      <h2>Se connecter</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom d'utilisateur:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Afficher l'erreur s'il y en a */}
        <button type="submit" disabled={loading}>
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
}

export default Login;
