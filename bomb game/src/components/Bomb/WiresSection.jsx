import React, { useState, useEffect } from 'react';

const WiresSection = () => {
  const COLORS_EXTRA = ['#800080', '#ffa500', '#55ffff', '#8b4513', '#ff69b4', '#808080', '#006400', '#4169E1']; 

  const [wires, setWires] = useState([]);
  const [cutWires, setCutWires] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [rule, setRule] = useState(null);

  const timer = 42; // fixo para teste

  const shuffle = (array) => {
    return [...array].sort(() => 0.5 - Math.random());
  };

  const generateWiresForRule = (selectedRule) => {
    let selectedColors = [];
    const extraColors = shuffle(COLORS_EXTRA);

    switch (selectedRule) {
      case 1: // Regra 1: vermelho + timer par
        selectedColors.push('#ff0000'); // vermelho
        break;
      case 2: // Regra 2: branco e amarelo
        selectedColors.push('#ffffff', '#ffff00'); // branco, amarelo
        break;
      case 3: // Regra 3: mais de 1 azul
        selectedColors.push('#4169E1', '#4169E1'); // dois azuis
        break;
      default:
        break;
    }

    // completa com outras cores aleatórias que não interferem
    while (selectedColors.length < 5) {
      const nextColor = extraColors.pop();
      selectedColors.push(nextColor);
    }

    return shuffle(selectedColors);
  };

  useEffect(() => {
    const selectedRule = Math.ceil(Math.random() * 3); // 1, 2 ou 3
    setRule(selectedRule);

    const randomWires = generateWiresForRule(selectedRule);
    setWires(randomWires);
    setCutWires(Array(randomWires.length).fill(false));
    setIsCorrect(null);
  }, []);

  const handleCutWire = (index) => {
    if (cutWires[index]) return;

    const newCutWires = [...cutWires];
    newCutWires[index] = true;
    setCutWires(newCutWires);

    checkIfCorrect(newCutWires, index);
  };

  const checkIfCorrect = (newCutWires, cutIndex) => {
    let correct = false;

    switch (rule) {
      case 1:
        correct = cutIndex === 2; // 3º fio
        break;
      case 2:
        correct = cutIndex === wires.length - 1; // último fio
        break;
      case 3:
        correct = cutIndex === 1; // 2º fio
        break;
      default:
        correct = true;
    }

    setIsCorrect(correct);
  };

  const containerStyle = {
    backgroundColor: '#2a2a2a',
    borderRadius: '15px',
    padding: '35px',
    boxShadow: '0 0 10px rgba(255, 50, 50, 0.2)',
    height: '100%',
  };

  const wiresRowStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '50px',
    padding: '50px 0',
    height: '100px',
    marginTop: '100px',
  };

  const wireStyle = {
    width: '13px',
    height: '300px',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'all 0.2s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
    position: 'relative',
  };

  const feedbackBoxStyle = {
    marginTop: '20px',
    height: '30px',
    width: '150px',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: '6px',
    backgroundColor: isCorrect === null ? 'transparent' : isCorrect ? '#4CAF50' : '#f44336',
    boxShadow: isCorrect === null ? 'none' : `0 0 10px ${isCorrect ? '#4CAF50' : '#f44336'}`,
    transition: 'background-color 0.3s, box-shadow 0.3s',
  };

  return (
    <div style={containerStyle}>
      <h3
        style={{
          margin: '0 0 15px',
          color: '#eee',
          fontSize: '1rem',
          textAlign: 'center',
        }}
      >
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
              transform: cutWires[index] ? 'scale(0.9)' : 'scale(1)',
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
            onClick={() => handleCutWire(index)}
          />
        ))}
      </div>

      <div style={feedbackBoxStyle}></div>
    </div>
  );
};

export default WiresSection;
