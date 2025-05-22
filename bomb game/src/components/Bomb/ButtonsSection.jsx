import { useState } from 'react';

const buttonsContainerStyle = {
  backgroundColor: '#2a2a2a',
  borderRadius: '15px',
  padding: '25px',
  boxShadow: '0 0 15px rgba(255, 50, 50, 0.3)',
  height: '100%'
};

const buttonGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '15px',
  marginTop: '20px'
};

const buttonStyle = {
  padding: '15px',
  fontSize: '1.2rem',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s',
  fontWeight: 'bold'
};

const numberButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#444',
  color: 'white'
};

const disarmButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#ff5555',
  color: 'white',
  gridColumn: '1 / -1',
  fontSize: '1.3rem'
};

export default function ButtonsSection() {
  const [display, setDisplay] = useState(generateRandomDisplay());
  const [stage, setStage] = useState(1);
  const [history, setHistory] = useState([]);
  const [positions, setPositions] = useState(generateRandomPositions());

  function generateRandomDisplay() {
    return Math.floor(Math.random() * 4) + 1; // de 1 a 4
  }

  function generateRandomPositions() {
    return [1, 2, 3, 4].sort(() => Math.random() - 0.5);
  }

  function resetGame() {
    setStage(1);
    setHistory([]);
    setPositions(generateRandomPositions());
    setDisplay(generateRandomDisplay());
  }

  function handleButtonClick(posIndex) {
    const pressedNumber = positions[posIndex];
    let correct = false;

    if (stage === 1) {
      if ((display === 1 || display === 2) && posIndex === 1) correct = true;
      if (display === 3 && posIndex === 2) correct = true;
      if (display === 4 && posIndex === 3) correct = true;
    } else if (stage === 2) {
      if (display === 1 && pressedNumber === 4) correct = true;
      if ((display === 2 || display === 4) && posIndex === history[0].position) correct = true;
      if (display === 3 && posIndex === 0) correct = true;
    }

    if (correct) {
      const newHistory = [...history, { display, position: posIndex, number: pressedNumber }];
      setHistory(newHistory);
      if (stage === 2) {
        alert('Parabéns! Módulo desarmado!');
        resetGame();
      } else {
        setStage(stage + 1);
        setDisplay(generateRandomDisplay());
      }
    } else {
      alert('Erro! Reiniciando o módulo.');
      resetGame();
    }
  }

  return (
    <div style={buttonsContainerStyle}>
      <h2 style={{ margin: '0 0 20px', color: '#ddd' }}>CONTROLES</h2>
      <div style={{ color: '#fff', marginBottom: '10px' }}>
        <strong>Número exibido:</strong> {display}
      </div>
      <div style={{ color: '#fff', marginBottom: '10px' }}>
        <strong>Estágio:</strong> {stage}
      </div>
      <div style={buttonGridStyle}>
        {positions.map((num, idx) => (
          <button
            key={idx}
            style={numberButtonStyle}
            onClick={() => handleButtonClick(idx)}
          >
            {num}
          </button>
        ))}
        <button style={disarmButtonStyle} onClick={resetGame}>
          DESARMAR BOMBA
        </button>
      </div>
    </div>
  );
}
