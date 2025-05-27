import React, { useState, useEffect } from 'react';
import { useBomb, MODULES } from './BombContext'; // Ajuste o caminho se necessário

const symbolRules = {
  'Δ': [true, false, true],   // Delta: Ativar 1 e 3
  'Ω': [false, false, false],  // Omega: Todos desligados
  '✛': [false, true, false],  // Cruz: Ativar apenas 2
  '◯': [true, true, true]     // Círculo: Todos ativados
};
const symbols = Object.keys(symbolRules);

const SwitchesSection = () => {
  const { disarmModule, registerError, solvedModules } = useBomb();
  
  const [currentSymbol, setCurrentSymbol] = useState('');
  const [switches, setSwitches] = useState([false, false, false]);
  const [feedback, setFeedback] = useState({ text: '', color: 'transparent' });

  const isModuleDisarmed = solvedModules[MODULES.SWITCHES];

  // Inicializa ou reseta o módulo
  useEffect(() => {
    if (isModuleDisarmed) {
        setFeedback({ text: 'MÓDULO DESARMADO!', color: '#4CAF50' });
        return;
    }
    // Seleciona um novo símbolo aleatório quando o jogo começa ou é resetado
    setCurrentSymbol(symbols[Math.floor(Math.random() * symbols.length)]);
    setSwitches([false, false, false]); // Reseta os switches
    setFeedback({ text: '', color: 'transparent' }); // Limpa o feedback
  }, [isModuleDisarmed]); // Dependência para resetar se o jogo for reiniciado


  const toggleSwitch = (index) => {
    if (isModuleDisarmed) return;
    const newSwitches = [...switches];
    newSwitches[index] = !newSwitches[index];
    setSwitches(newSwitches);
    if (feedback.text) setFeedback({ text: '', color: 'transparent' }); // Limpa feedback ao interagir
  };

  const handleConfirm = () => {
    if (isModuleDisarmed || !currentSymbol) return; // Não faz nada se desarmado ou sem símbolo

    const correctPositions = symbolRules[currentSymbol];
    const isCorrect = switches.every((sw, i) => sw === correctPositions[i]);

    if (isCorrect) {
      setFeedback({ text: 'MÓDULO DESARMADO!', color: '#4CAF50' });
      disarmModule(MODULES.SWITCHES);
    } else {
      setFeedback({ text: 'INCORRETO! Penalidade.', color: '#f44336' });
      registerError(MODULES.SWITCHES);
    }
  };

  const containerStyle = {
    backgroundColor: isModuleDisarmed ? '#3c3c3c' : '#2a2a2a',
    borderRadius: '15px',
    padding: '25px',
    boxShadow: '0 0 15px rgba(255, 50, 50, 0.3)',
    border: isModuleDisarmed ? '2px solid #4CAF50' : '2px solid #ff5555',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around', // Melhor distribuição
    transition: 'background-color 0.5s, border 0.5s',
  };

  const titleStyle = {
    fontSize: '1.2rem',
    color: isModuleDisarmed ? '#4CAF50' : '#eee',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const symbolDisplayContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  };
  
  const symbolTextStyle = {
    fontSize: '1rem',
    color: '#ccc',
    marginBottom: '5px',
  };

  const symbolStyle = {
    fontSize: '2.5rem', // Símbolo maior
    color: '#ff5555',
    fontWeight: 'bold',
    minHeight: '40px', // Para evitar pulo de layout se o símbolo não carregar
  };

  const switchesContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    margin: '20px 0',
  };

  const switchWrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  };

  const confirmButtonStyle = {
    padding: '12px 25px', // Botão maior
    backgroundColor: isModuleDisarmed ? '#555' : '#ff5555',
    color: 'white',
    border: 'none',
    borderRadius: '8px', // Mais arredondado
    cursor: isModuleDisarmed ? 'default' : 'pointer',
    fontSize: '1.1rem', // Fonte maior
    fontWeight: 'bold',
    transition: 'all 0.3s',
    boxShadow: isModuleDisarmed ? 'none' : '0 4px 8px rgba(0,0,0,0.2)',
    opacity: isModuleDisarmed ? 0.7 : 1,
  };

  const feedbackStyle = {
    marginTop: '15px',
    padding: '10px',
    borderRadius: '5px',
    textAlign: 'center',
    fontWeight: 'bold',
    minHeight: '40px', // Para não colapsar
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: feedback.text ? `${feedback.color}30` : 'transparent', // Fundo suave
    color: feedback.color || 'transparent',
    border: feedback.text ? `1px solid ${feedback.color}` : '1px solid transparent',
    transition: 'all 0.3s',
  };

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>
        {isModuleDisarmed ? "MÓDULO DE INTERRUPTORES DESARMADO" : "MÓDULO DE INTERRUPTORES"}
      </h3>
      
      <div style={symbolDisplayContainerStyle}>
        <span style={symbolTextStyle}>SÍMBOLO ALVO:</span>
        <div style={symbolStyle}>
          {currentSymbol || (isModuleDisarmed ? '✓' : '...')}
        </div>
      </div>


      <div style={switchesContainerStyle}>
        {switches.map((isOn, index) => (
          <div key={index} style={switchWrapperStyle}>
            <span style={{ color: '#ddd', fontSize: '1.5rem', fontWeight:'bold' }}>{index + 1}</span>
            <div
              style={{
                width: '60px',
                height: '30px',
                backgroundColor: isOn ? '#4CAF50' : '#555',
                borderRadius: '15px',
                position: 'relative',
                cursor: isModuleDisarmed ? 'default' : 'pointer',
                transition: 'all 0.3s',
                opacity: isModuleDisarmed ? 0.6 : 1,
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
                  transition: 'all 0.3s',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div>
        <button 
          style={confirmButtonStyle} 
          onClick={handleConfirm}
          disabled={isModuleDisarmed}
        >
          {isModuleDisarmed ? "DESARMADO" : "CONFIRMAR"}
        </button>
        <div style={feedbackStyle}>
          {feedback.text}
        </div>
      </div>
    </div>
  );
};

export default SwitchesSection;
