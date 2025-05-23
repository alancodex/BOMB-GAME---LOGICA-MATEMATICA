import React, { useState, useEffect } from 'react';

const WiresSection = () => {
  // Cores conforme pedido
  const COLORS_RULE_1 = ['#ff0000', '#800080', '#ffa500', '#55ffff', '#8b4513']; // vermelho e outras
  const COLORS_RULE_2 = ['#ffffff', '#ffff00', '#ff69b4', '#808080', '#006400']; // branco, amarelo e outras
  const COLORS_RULE_4 = ['#4169E1', '#4169E1', '#4169E1', '#4169E1', '#4169E1']; // azul (mesmo tom repetido para preencher)

  // Junta todas as cores para embaralhar
  const ALL_COLORS = [...COLORS_RULE_1, ...COLORS_RULE_2, ...COLORS_RULE_4];

  // Gera fios embaralhados (5 fios)
  const generateRandomWires = () => {
    const shuffled = [...ALL_COLORS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  };

  const [wires, setWires] = useState([]);
  const [cutWires, setCutWires] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);

  const timer = 42; // valor fixo para teste

  useEffect(() => {
    const randomWires = generateRandomWires();
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
    const hasRed = wires.includes('#ff0000');
    const hasWhite = wires.includes('#ffffff');
    const hasYellow = wires.includes('#ffff00');

    // Conta quantos fios azuis (#4169E1)
    const blueShade = '#4169E1';
    const blueCount = wires.filter(color => color === blueShade).length;

    let correct = false;

    // Regra 1: vermelho e timer par → cortar 3º fio (índice 2)
    if (hasRed && timer % 2 === 0) {
      correct = cutIndex === 2;
    }
    // Regra 2: branco e amarelo → cortar último fio
    else if (hasWhite && hasYellow) {
      correct = cutIndex === wires.length - 1;
    }
    // Regra 4: mais de 2 azuis → cortar 2º fio (índice 1)
    else if (blueCount > 2) {
      correct = cutIndex === 1;
    } else {
      // Nenhuma regra válida → aceita qualquer corte
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
