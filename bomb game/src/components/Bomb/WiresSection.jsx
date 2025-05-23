import React, { useState, useEffect } from 'react';

const WiresSection = () => {
  // Cores exclusivas por regra (5 fios cada), sem a regra 3
  const RULE_WIRES = {
    1: ['#ff5555', '#800080', '#ffa500', '#55ffff', '#8b4513'], // vermelho, roxo, laranja, ciano, marrom
    2: ['#ffffff', '#ffff55', '#ff69b4', '#808080', '#006400'], // branco, amarelo, rosa, cinza, verde escuro
    4: ['#00008b', '#87ceeb', '#40e0d0', '#4169e1', '#4682b4'], // azul escuro, azul claro, azul piscina, azul royal, azul petróleo
  };

  // Função para embaralhar (Fisher-Yates)
  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const [ruleNumber, setRuleNumber] = useState(null);
  const [wires, setWires] = useState([]);
  const [cutWires, setCutWires] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null); // null = não verificado

  const timer = 42; // valor fixo para teste

  useEffect(() => {
    // Escolhe aleatoriamente uma regra entre 1, 2 e 4
    const ruleKeys = Object.keys(RULE_WIRES);
    const chosenRule = ruleKeys[Math.floor(Math.random() * ruleKeys.length)];
    setRuleNumber(parseInt(chosenRule));

    // Usa o conjunto fixo de fios da regra escolhida e embaralha para exibição
    const fixedWires = RULE_WIRES[chosenRule];
    const shuffledWires = shuffleArray(fixedWires);

    setWires(shuffledWires);
    setCutWires(Array(shuffledWires.length).fill(false));
    setIsCorrect(null);
  }, []);

  const handleCutWire = (index) => {
    if (cutWires[index]) return; // já cortado

    const newCutWires = [...cutWires];
    newCutWires[index] = true;
    setCutWires(newCutWires);

    checkIfCorrect(newCutWires);
  };

  // Checa corte correto conforme regra e cores exclusivas
  const checkIfCorrect = (newCutWires) => {
    let mustCutColor = null;

    switch (ruleNumber) {
      case 1:
        // Regra 1: P = existe vermelho e timer par, cortar 3º fio (index 2)
        if (timer % 2 === 0) {
          mustCutColor = RULE_WIRES[1][2];
        }
        break;

      case 2:
        // Regra 2: P = branco, Q = amarelo, P ∧ Q → cortar último fio
        mustCutColor = RULE_WIRES[2][RULE_WIRES[2].length - 1];
        break;

      case 4:
        // Regra 4: mais de 3 fios azuis → cortar 2º fio
        mustCutColor = RULE_WIRES[4][1];
        break;

      default:
        mustCutColor = null;
    }

    if (!mustCutColor) {
      setIsCorrect(true);
      return;
    }

    const correctIndex = wires.findIndex((c) => c === mustCutColor);

    const onlyCorrectCut = newCutWires.every((cut, idx) =>
      idx === correctIndex ? cut === true : cut === false
    );

    setIsCorrect(onlyCorrectCut);
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
    width: '220px',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: '6px',
    backgroundColor:
      isCorrect === null ? 'transparent' : isCorrect ? '#4CAF50' : '#f44336',
    boxShadow:
      isCorrect === null ? 'none' : `0 0 10px ${isCorrect ? '#4CAF50' : '#f44336'}`,
    transition: 'background-color 0.3s, box-shadow 0.3s',
    color: '#fff',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    userSelect: 'none',
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
        SELECIONE O FIO PARA CORTAR (Regra {ruleNumber})
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

      <div style={feedbackBoxStyle}>
        {isCorrect === null
          ? ''
          : isCorrect
          ? '✅ Fio correto cortado!'
          : '❌ Fio incorreto! Tente novamente.'}
      </div>
    </div>
  );
};

export default WiresSection;
