import React from 'react';
import { useBomb } from '../components/Bomb/BombContext'; // Ajuste o caminho

const GameOverPage: React.FC = () => {
  const { restartGame } = useBomb();

  const pageStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#1a1a1a',
    color: 'white',
    textAlign: 'center',
    padding: '20px',
    fontFamily: "'Arial', sans-serif",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: 'clamp(2.5rem, 8vw, 4rem)',
    color: '#ff3333', // Vermelho mais intenso
    marginBottom: '20px',
    textShadow: '0 0 10px #ff3333, 0 0 20px #ff3333',
    animation: 'pulseRed 1.5s infinite',
  };

  const messageStyle: React.CSSProperties = {
    fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
    marginBottom: '40px',
    color: '#cccccc',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '15px 35px',
    fontSize: 'clamp(1rem, 3vw, 1.3rem)',
    backgroundColor: '#ff5555',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 5px 15px rgba(255, 85, 85, 0.4)',
    transition: 'background-color 0.3s, transform 0.2s',
    fontWeight: 'bold',
    letterSpacing: '1px',
  };

  // Keyframes para animação (precisariam ser injetados no <head> ou via styled-components)
  // Para simplificar, não adicionarei a injeção de <style> aqui, mas a animação está definida.
  const keyframesStyle = `
    @keyframes pulseRed {
      0% { transform: scale(1); text-shadow: 0 0 10px #ff3333, 0 0 20px #ff3333; }
      50% { transform: scale(1.05); text-shadow: 0 0 20px #ff3333, 0 0 30px #ff3333; }
      100% { transform: scale(1); text-shadow: 0 0 10px #ff3333, 0 0 20px #ff3333; }
    }
  `;

  return (
    <>
      <style>{keyframesStyle}</style> {/* Injetando keyframes */}
      <div style={pageStyle}>
        <h1 style={titleStyle}>GAME OVER</h1>
        <p style={messageStyle}>A bomba explodiu! Mais sorte na próxima vez.</p>
        <button
          style={buttonStyle}
          onClick={restartGame}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#dd4444')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ff5555')}
        >
          TENTAR NOVAMENTE
        </button>
      </div>
    </>
  );
};

export default GameOverPage;
