import React, { useState, useEffect } from 'react';

const Jeux = () => {
  const [position, setPosition] = useState(50); // Position de la balle sur l'axe X
  const [obstacles, setObstacles] = useState([]); // Liste des obstacles
  const [gameOver, setGameOver] = useState(false); // Statut du jeu
  const [score, setScore] = useState(0); // Score du joueur

  // Déplacer la balle à gauche
  const moveLeft = () => setPosition(prevPos => Math.max(prevPos - 5, 0));

  // Déplacer la balle à droite
  const moveRight = () => setPosition(prevPos => Math.min(prevPos + 5, 100));

  // Générer des obstacles à intervalles réguliers
  const generateObstacle = () => {
    const newObstacle = {
      id: Date.now(),
      left: Math.random() * 90,
      top: 0,
      speed: 2 + Math.random() * 2,
    };
    setObstacles(prev => [...prev, newObstacle]);
  };

  // Déplacer les obstacles vers le bas
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setObstacles(prev =>
        prev.map(obs => ({
          ...obs,
          top: obs.top + obs.speed,
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, [gameOver]);

  // Vérification de collision entre la balle et les obstacles
  useEffect(() => {
    const checkCollision = () => {
      obstacles.forEach(obs => {
        if (obs.top > 90 && Math.abs(obs.left - position) < 10) {
          setGameOver(true);
        }
      });
    };

    if (!gameOver) {
      checkCollision();
      setScore(prev => prev + 1);
    }
  }, [obstacles, position, gameOver]);

  // Générer un obstacle toutes les 2 secondes
  useEffect(() => {
    if (gameOver) return;

    const obstacleInterval = setInterval(generateObstacle, 2000);
    return () => clearInterval(obstacleInterval);
  }, [gameOver]);

  return (
    <div className="game-container">
      <h1>Jeu Subway Surfer</h1>
      {gameOver && <div className="game-over">Game Over</div>}
      <div className="score">Score: {score}</div>
      <div className="game-field">
        <div
          className="ball"
          style={{
            left: `${position}%`,
            bottom: '10px', // Placer la balle en bas de l'écran
          }}
        ></div>
        {obstacles.map(obstacle => (
          <div
            key={obstacle.id}
            className="obstacle"
            style={{
              left: `${obstacle.left}%`,
              bottom: `${obstacle.top}%`,
              backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`, // Couleur aléatoire
            }}
          ></div>
        ))}
      </div>
      {!gameOver && (
        <div className="controls">
          <button onClick={moveLeft}>Gauche</button>
          <button onClick={moveRight}>Droite</button>
        </div>
      )}
    </div>
  );
};

export default Jeux;
