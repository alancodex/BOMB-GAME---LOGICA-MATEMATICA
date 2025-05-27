import React from 'react';
import { useBomb } from '../components/Bomb/BombContext'; // Ajuste o caminho

const GameWinPage: React.FC = () => {
  const { restartGame } = useBomb();

  const pageStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#1a1a1a', // Um fundo escuro, mas talvez um pouco mais claro para vitória
    color: 'white',
    textAlign: 'center',
    padding: '20px',
    fontFamily: "'Arial', sans-serif",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: 'clamp(2.5rem, 8vw, 4rem)',
    color: '#4CAF50', // Verde para vitória
    marginBottom: '20px',
    textShadow: '0 0 10px #4CAF50, 0 0 20px #4CAF50',
    animation: 'pulseGreen 1.5s infinite',
  };

  const messageStyle: React.CSSProperties = {
    fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
    marginBottom: '40px',
    color: '#e0e0e0', // Cor clara para o texto
  };

  const buttonStyle: React.CSSProperties = {
    padding: '15px 35px',
    fontSize: 'clamp(1rem, 3vw, 1.3rem)',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 5px 15px rgba(76, 175, 80, 0.4)',
    transition: 'background-color 0.3s, transform 0.2s',
    fontWeight: 'bold',
    letterSpacing: '1px',
  };
  
  const keyframesStyle = `
    @keyframes pulseGreen {
      0% { transform: scale(1); text-shadow: 0 0 10px #4CAF50, 0 0 20px #4CAF50; }
      50% { transform: scale(1.05); text-shadow: 0 0 20px #4CAF50, 0 0 30px #4CAF50; }
      100% { transform: scale(1); text-shadow: 0 0 10px #4CAF50, 0 0 20px #4CAF50; }
    }
  `;

  return (
    <>
      <style>{keyframesStyle}</style> {/* Injetando keyframes */}
      <div style={pageStyle}>
        <h1 style={titleStyle}>BOMBA DESARMADA!</h1>
        <p style={messageStyle}>Você é um herói! Missão cumprida com sucesso.</p>
        <button
          style={buttonStyle}
          onClick={restartGame}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3a8a40')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4CAF50')}
        >
          JOGAR NOVAMENTE
        </button>
      </div>
    </>
  );
};

export default GameWinPage;
