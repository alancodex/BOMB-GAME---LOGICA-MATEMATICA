import React from "react"; // Removido useState, useEffect, useContext desnecessários aqui
import { useBomb } from "./BombContext"; // Importa o hook

const BombTimer = () => {
  const { timeLeft, gameState } = useBomb(); // Obtém timeLeft e gameState do contexto

  const minutes = Math.floor(timeLeft / 60);
  const seconds = Math.floor(timeLeft % 60);

  const formatTime = () => {
    if (gameState === 'lost' && timeLeft <= 0) return "00:00";
    if (gameState === 'won') return "BOMBA DESARMADA"; 

    const m = String(minutes).padStart(2, '0');
    const s = String(seconds).padStart(2, '0');
    return `${m}:${s}`; 
  };
  
  // Determina a cor do timer com base no tempo restante ou estado do jogo
  let timerColor = '#ff5555'; // Cor padrão de perigo
  if (gameState === 'won') {
    timerColor = '#4CAF50'; // Verde para vitória
  } else if (timeLeft <= 30 && timeLeft > 10 && gameState === 'playing') {
    timerColor = '#ffcc00'; // Amarelo para aviso
  } else if (timeLeft <= 10 && gameState === 'playing') {
    timerColor = '#ff3300'; // Vermelho mais intenso para crítico
  }


  const timerContainerStyle = {
    backgroundColor: '#2a2a2a',
    borderRadius: '15px',
    padding: '10px', // Reduzido padding
    boxShadow: '0 0 20px rgba(255, 50, 50, 0.3)',
    border: `2px solid ${timerColor}`, // Borda dinâmica
    textAlign: 'center',
    transition: 'border-color 0.5s',
  };

  const timerDisplayStyle = {
    backgroundColor: '#111',
    color: timerColor, // Cor dinâmica
    fontFamily: '"Segment7Standard", "Courier New", monospace', // Adicionado fallback
    fontSize: 'clamp(2rem, 10vw, 3rem)', // Fonte responsiva
    padding: '20px 10px', // Padding ajustado
    borderRadius: '10px',
    margin: '10px 0', // Margem ajustada
    letterSpacing: '3px',
    transition: 'color 0.5s',
    minHeight: '60px', // Altura mínima para consistência
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const titleStyle = {
    margin: '0 0 10px',
    color: '#ddd',
    fontSize: '1rem', // Tamanho ajustado
    textTransform: 'uppercase',
  };

  return (
    <div style={timerContainerStyle}>
      <h2 style={titleStyle}>Tempo Restante</h2>
      <div style={timerDisplayStyle}>{formatTime()}</div>
    </div>
  );
};

export default BombTimer;
