import { useState, useContext } from 'react';
import { BombContext } from '../Bomb/BombContext';

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

export default function ButtonsSection() {
  const { timeLeft, setTimeLeft } = useContext(BombContext);

  const [display, setDisplay] = useState(generateRandomDisplay());
  const [stage, setStage] = useState(1);
  const [history, setHistory] = useState([]);
  const [positions, setPositions] = useState(generateRandomPositions());
  const [isDisarmed, setIsDisarmed] = useState(false); // controle do desarme

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
    setIsDisarmed(false);
  }

  function handleButtonClick(posIndex) {
    if (isDisarmed) return; // bloqueia inputs após desarmar

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
        setIsDisarmed(true); // marcou módulo desarmado
      } else {
        setStage(stage + 1);
        setDisplay(generateRandomDisplay());
      }
    } else {
      setTimeLeft(prev => (prev - 30 > 0 ? prev - 30 : 0));
      resetGame();
    }
  }

  return (
    <div style={buttonsContainerStyle}>
      <div style={{
        backgroundColor: '#fff',
        color: '#000',
        borderRadius: '12px',
        padding: '20px 40px',
        fontSize: '48px',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: '20px auto',
        width: 'fit-content'
      }}>
        {display}
      </div>

      <div style={buttonGridStyle}>
        {positions.map((num, idx) => (
          <button
            key={idx}
            style={numberButtonStyle}
            onClick={() => handleButtonClick(idx)}
            disabled={isDisarmed} // bloqueia botão após desarme
          >
            {num}
          </button>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px', color: '#4CAF50', fontWeight: 'bold', fontSize: '1.3rem' }}>
        {isDisarmed && '✅ Módulo Desarmado!'}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            style={{
              width: '15px',
              height: '15px',
              borderRadius: '50%',
              backgroundColor: history.length > index ? '#4CAF50' : '#f44336',
              transition: 'background-color 0.3s'
            }}
          />
        ))}
      </div>
    </div>
  );
}
