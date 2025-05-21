import React, { useState, useEffect } from 'react';

const WiresSection = () => {
  const availableColors = ['#ff5555', '#5555ff', '#55ff55', '#ffff55', '#333', '#ff55ff', '#55ffff'];

  const generateRandomWires = (num) => {
    const shuffled = [...availableColors].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  const [wires, setWires] = useState([]);
  const [cutWires, setCutWires] = useState([]);
  const [message, setMessage] = useState('');

  const timer = 42; // Exemplo: valor fixo só para teste da lógica.

  useEffect(() => {
    const randomWires = generateRandomWires(5);
    setWires(randomWires);
    setCutWires(Array(5).fill(false));
    setMessage('');
  }, []);

  const handleCutWire = (index) => {
    const newCutWires = [...cutWires];
    newCutWires[index] = true;
    setCutWires(newCutWires);
    console.log(`Cortou o fio ${index + 1}: Cor ${wires[index]}`);
    
    checkIfCorrect(newCutWires);
  };

 const checkIfCorrect = (newCutWires) => {
  const hasRed = wires.includes('#ff5555');
  const hasBlack = wires.includes('#333');
  const hasYellow = wires.includes('#ffff55');
  const hasGreen = wires.includes('#55ff55');

  const isThirdCut = newCutWires[2];
  const isLastCut = newCutWires[wires.length - 1];
  const isFirstCut = newCutWires[0];

  let correct = false;
  let ruleApplied = '';

  // Regra 1: prioridade máxima
  if (hasRed && timer % 2 === 0) {
    correct = isThirdCut;
    ruleApplied = 'Corte o 3º fio';
  }
  // Regra 2: se a 1ª não se aplicou
  else if (hasBlack || hasYellow) {
    correct = isLastCut;
    ruleApplied = 'Corte o último fio';
  }
  // Regra 3: se as anteriores não se aplicaram
  else if (!hasGreen) {
    correct = isFirstCut;
    ruleApplied = 'Corte o primeiro fio';
  } else {
    ruleApplied = 'Nenhuma regra se aplica';
    correct = true;  // Se nenhuma regra se aplica, considera correto
  }

  if (correct) {
    setMessage(`✅ ${ruleApplied}! Fios cortados corretamente!`);
  } else {
    setMessage(`❌ ${ruleApplied}! Fios incorretos!`);
  }
};

  

  const containerStyle = {
    backgroundColor: '#2a2a2a',
    borderRadius: '15px',
    padding: '35px',
    boxShadow: '0 0 10px rgba(255, 50, 50, 0.2)',
    height: '100%'
  };

  const wiresRowStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '30px',
    padding: '50px 0',
    height: '100px'
  };

  const wireStyle = {
    width: '13px',
    height: '150px',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'all 0.2s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
    position: 'relative'
  };

  return (
    <div style={containerStyle}>
      <h3 style={{ 
        margin: '0 0 15px',
        color: '#eee',
        fontSize: '1rem',
        textAlign: 'center'
      }}>
        SELECIONE O FIO PARA CORTAR
      </h3>
      
      <div style={wiresRowStyle}>
        {wires.map((color, index) => (
          <div 
            key={index}
            style={{ 
              ...wireStyle,
              backgroundColor: color,
              opacity: cutWires[index] ? 0.3 : 1,
              transform: cutWires[index] ? 'scale(0.9)' : 'scale(1)'
            }}
            onMouseEnter={(e) => {
              if (!cutWires[index]) {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = `0 0 10px ${color}`;
              }
            }}
            onMouseLeave={(e) => {
              if (!cutWires[index]) {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
              }
            }}
            onClick={() => {
              if (!cutWires[index]) {
                handleCutWire(index);
              }
            }}
          />
        ))}
      </div>

      {message && (
        <div style={{ color: '#fff', textAlign: 'center', marginTop: '20px', fontSize: '1.2rem' }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default WiresSection;
