import { useState } from 'react';

const symbolRules = {
  'Δ': [true, false, true],    // Delta: Ativar 1 e 3
  'Ω': [false, false, false],  // Omega: Todos desligados
  '✛': [false, true, false],   // Cruz: Ativar apenas 2
  '◯': [true, true, true]      // Círculo: Todos ativados
};

const symbols = Object.keys(symbolRules);
const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];

const SwitchesSection = () => {
  const [switches, setSwitches] = useState([false, false, false]);
  const [feedback, setFeedback] = useState('');

  const toggleSwitch = (index) => {
    const newSwitches = [...switches];
    newSwitches[index] = !newSwitches[index];
    setSwitches(newSwitches);
    setFeedback(''); // Limpa o feedback ao mudar os interruptores
  };

  const handleConfirm = () => {
    const correctPositions = symbolRules[randomSymbol];
    const isCorrect = switches.every((sw, i) => sw === correctPositions[i]);
    
    if (isCorrect) {
      setFeedback({ text: 'CORRETO!', color: '#4CAF50' });
    } else {
      setFeedback({ text: 'INCORRETO! Verifique o manual', color: '#f44336' });
    }
  };

  const containerStyle = {
    backgroundColor: '#2a2a2a',
    borderRadius: '15px',
    padding: '25px',
    boxShadow: '0 0 15px rgba(255, 50, 50, 0.3)',
    border: '2px solid #ff5555',
    height: '100%',
    position: 'relative'
  };

  const confirmButtonStyle = {
    padding: '10px 20px',
    backgroundColor: '#ff5555',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    marginTop: '20px',
    width: '100%',
    transition: 'all 0.3s',
    '&:hover': {
      backgroundColor: '#ff3333'
    }
  };

  const feedbackStyle = {
    marginTop: '15px',
    padding: '10px',
    borderRadius: '5px',
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: feedback ? `${feedback.color}20` : 'transparent',
    color: feedback?.color || 'transparent'
  };

  return (
    <div style={containerStyle}>
      <div style={{ 
        fontSize: '2rem',
        marginBottom: '20px',
        color: '#ff5555',
        textAlign: 'center'
      }}>
        SÍMBOLO: <span style={{ fontWeight: 'bold' }}>{randomSymbol}</span>
      </div>
      
      {switches.map((isOn, index) => (
        <div key={index} style={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: '15px 0',
          padding: '10px',
          backgroundColor: '#333',
          borderRadius: '10px'
        }}>
          <span style={{ color: '#ddd', fontSize: '1rem' }}>
            Interruptor {index + 1}
          </span>
          <div 
            style={{ 
              width: '60px',
              height: '30px',
              backgroundColor: isOn ? '#4CAF50' : '#555',
              borderRadius: '15px',
              position: 'relative',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onClick={() => toggleSwitch(index)}
          >
            <div 
              style={{
                position: 'absolute',
                width: '26px',
                height: '26px',
                backgroundColor: '#fff',
                borderRadius: '50%',
                top: '2px',
                left: isOn ? '32px' : '2px',
                transition: 'all 0.3s'
              }}
            />
          </div>
        </div>
      ))}

      <button 
        style={confirmButtonStyle}
        onClick={handleConfirm}
      >
        CONFIRMAR
      </button>

      {feedback && (
        <div style={feedbackStyle}>
          {feedback.text}
        </div>
      )}
    </div>
  );
};

export default SwitchesSection;