import React, { useState, useEffect } from 'react';
import { useBomb, MODULES } from './BombContext'; // Corrigido para usar o hook e MODULES

const buttonsContainerStyle = {
  backgroundColor: '#2a2a2a', // Estilo padrão
  borderRadius: '15px',
  padding: '25px',
  boxShadow: '0 0 15px rgba(255, 50, 50, 0.3)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'background-color 0.5s, border 0.5s',
};

const buttonGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '15px',
  marginTop: '20px',
};

const buttonStyle = {
  padding: '15px',
  fontSize: '1.2rem',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s',
  fontWeight: 'bold',
};

const numberButtonStyleBase = {
  ...buttonStyle,
  backgroundColor: '#444',
  color: 'white',
};

export default function ButtonsSection() {
  const { disarmModule, registerError, solvedModules, gameState } = useBomb();
  const isModuleGloballyDisarmed = solvedModules[MODULES.BUTTONS];

  const [display, setDisplay] = useState(generateRandomDisplay());
  const [stage, setStage] = useState(1);
  const [history, setHistory] = useState([]); // Armazena { position: posIndex, number: pressedNumber }
  const [positions, setPositions] = useState(generateRandomPositions()); // Números nos botões [1,2,3,4] embaralhados
  const [feedbackMessage, setFeedbackMessage] = useState('');

  function generateRandomDisplay() {
    return Math.floor(Math.random() * 4) + 1; // de 1 a 4
  }

  function generateRandomPositions() {
    return [1, 2, 3, 4].sort(() => Math.random() - 0.5);
  }

  const resetModuleState = () => {
    setStage(1);
    setHistory([]);
    setPositions(generateRandomPositions());
    setDisplay(generateRandomDisplay());
    setFeedbackMessage(isModuleGloballyDisarmed ? 'MÓDULO DESARMADO!' : '');
  };

  useEffect(() => {
    // Resetar o estado interno do módulo se o jogo for reiniciado (módulo não está mais desarmado globalmente)
    // ou se o estado do jogo mudar para 'playing' e o módulo ainda não estiver desarmado.
    if (gameState === 'playing' && !isModuleGloballyDisarmed) {
      resetModuleState();
    } else if (isModuleGloballyDisarmed) {
      setFeedbackMessage('MÓDULO DESARMADO!');
      // Garante que o histórico visual reflita o sucesso se já estiver desarmado
      if (history.length < 2) { // Simula um histórico de sucesso para os indicadores
        setHistory([{position:0, number:0}, {position:1, number:1}]);
      }
    }
  }, [isModuleGloballyDisarmed, gameState]);

  function handleButtonClick(posIndex) {
    if (isModuleGloballyDisarmed || gameState !== 'playing') return;

    const pressedNumber = positions[posIndex];
    let correct = false;

    // Lógica do manual de botões (conforme o código original)
    // Estágio 1
    if (stage === 1) {
      if (display === 1 && posIndex === 1) correct = true; // Posição 2
      else if (display === 2 && posIndex === 1) correct = true; // Posição 2
      else if (display === 3 && posIndex === 2) correct = true; // Posição 3
      else if (display === 4 && posIndex === 3) correct = true; // Posição 4
    } 
    // Estágio 2
    else if (stage === 2) {
      const firstStageData = history[0]; // { position: indexDoBotao, number: numeroNoBotao }
      if (display === 1 && pressedNumber === 4) correct = true;
      else if (display === 2 && posIndex === firstStageData.position) correct = true;
      else if (display === 3 && posIndex === 0) correct = true; // Posição 1
      else if (display === 4 && posIndex === firstStageData.position) correct = true;
    }

    if (correct) {
      const newHistory = [...history, { display, position: posIndex, number: pressedNumber }];
      setHistory(newHistory);
      setFeedbackMessage(`Estágio ${stage} correto!`);

      if (stage === 2) {
        setFeedbackMessage('MÓDULO DESARMADO!');
        disarmModule(MODULES.BUTTONS);
      } else {
        setStage(prevStage => prevStage + 1);
        setDisplay(generateRandomDisplay()); // Novo display para o próximo estágio
        // As posições dos números nos botões não mudam entre os estágios deste módulo.
      }
    } else {
      setFeedbackMessage('ERRO! Penalidade aplicada.');
      registerError(MODULES.BUTTONS);
      resetModuleState(); // Reseta o módulo após um erro
    }
  }
  
  const dynamicContainerStyle = {
    ...buttonsContainerStyle,
    backgroundColor: isModuleGloballyDisarmed ? '#3c3c3c' : '#2a2a2a',
    border: isModuleGloballyDisarmed ? '2px solid #4CAF50' : '2px solid #ff5555',
  };

  const titleStyle = {
    margin: '0 0 15px',
    color: isModuleGloballyDisarmed ? '#4CAF50' : '#eee',
    fontSize: '1.2rem',
    textAlign: 'center',
    fontWeight: 'bold',
  };

  const displayBoxStyle = {
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: '12px',
    padding: '15px 30px', // Ajustado
    fontSize: 'clamp(2rem, 8vw, 3rem)', // Responsivo
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '10px auto', // Ajustado
    width: 'fit-content',
    minWidth: '60px', // Largura mínima
    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)',
  };
  
  const feedbackTextStyle = {
    textAlign: 'center',
    marginTop: '15px', // Ajustado
    marginBottom: '10px',
    color: feedbackMessage.includes('DESARMADO') || feedbackMessage.includes('correto') ? '#4CAF50' : '#f44336',
    fontWeight: 'bold',
    fontSize: '1rem',
    minHeight: '20px', // Para evitar pulo de layout
    opacity: feedbackMessage && !isModuleGloballyDisarmed ? 1 : (isModuleGloballyDisarmed ? 1 : 0),
    transition: 'opacity 0.3s',
  };

  const stageIndicatorContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: 'auto', // Empurra para baixo
    paddingTop: '15px', // Espaço acima
  };

  return (
    <div style={dynamicContainerStyle}>
      <div>
        <h3 style={titleStyle}>
          {isModuleGloballyDisarmed ? "MÓDULO DE BOTÕES DESARMADO" : `MÓDULO DE BOTÕES (Estágio ${stage}/2)`}
        </h3>
        <div style={displayBoxStyle}>
          {isModuleGloballyDisarmed ? '✓' : display}
        </div>
      </div>

      <div style={buttonGridStyle}>
        {positions.map((num, idx) => (
          <button
            key={idx}
            style={{
                ...numberButtonStyleBase,
                opacity: isModuleGloballyDisarmed ? 0.7 : 1,
                cursor: isModuleGloballyDisarmed ? 'default' : 'pointer',
            }}
            onClick={() => handleButtonClick(idx)}
            disabled={isModuleGloballyDisarmed || gameState !== 'playing'}
          >
            {num}
          </button>
        ))}
      </div>
      
      <div>
        <div style={feedbackTextStyle}>
            {feedbackMessage}
        </div>
        <div style={stageIndicatorContainerStyle}>
            {Array.from({ length: 2 }).map((_, index) => (
            <div
                key={index}
                style={{
                width: '15px',
                height: '15px',
                borderRadius: '50%',
                backgroundColor: history.length > index ? '#4CAF50' : (isModuleGloballyDisarmed && index < history.length ? '#4CAF50' : '#666'), // Cinza se não alcançado
                border: `2px solid ${history.length > index || (isModuleGloballyDisarmed && index < history.length) ? '#4CAF50' : '#444'}`,
                transition: 'background-color 0.3s, border-color 0.3s',
                }}
            />
            ))}
        </div>
      </div>
    </div>
  );
}
