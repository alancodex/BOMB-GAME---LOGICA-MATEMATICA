import React, { useState, useEffect } from 'react';
import { useBomb, MODULES } from './BombContext'; // Ajuste o caminho se necessário

const WiresSection = () => {
  const { disarmModule, registerError, solvedModules } = useBomb();

  const COLORS_EXTRA = ['#800080', '#ffa500', '#55ffff', '#8b4513', '#ff69b4', '#808080', '#006400', '#4169E1'];
  const [wires, setWires] = useState([]);
  const [cutWires, setCutWires] = useState([]); // Array de booleanos para fios cortados
  const [rule, setRule] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const isModuleDisarmed = solvedModules[MODULES.WIRES];

  const shuffle = (array) => [...array].sort(() => 0.5 - Math.random());

  const generateWiresForRule = (selectedRule) => {
    let selectedColors = [];
    const availableExtraColors = shuffle([...COLORS_EXTRA]); // Copia para não modificar o original

    // Lógica de geração de fios baseada na regra (simplificada do seu código)
    // Adapte esta lógica conforme as regras exatas do seu manual
    switch (selectedRule) {
      case 1: // Ex: Cortar o 3º fio se houver um vermelho e o timer for par
        selectedColors.push('#ff0000'); // vermelho
        break;
      case 2: // Ex: Cortar o último fio se houver um branco e um amarelo
        selectedColors.push('#ffffff', '#ffff00'); // branco, amarelo
        break;
      case 3: // Ex: Cortar o 2º fio se houver mais de um azul
        selectedColors.push('#0000ff', '#0000ff'); // dois azuis (usei #0000ff para azul)
        break;
      default:
        break;
    }

    while (selectedColors.length < 5 && availableExtraColors.length > 0) {
      selectedColors.push(availableExtraColors.pop());
    }
    return shuffle(selectedColors);
  };

  // Setup inicial do módulo
  useEffect(() => {
    if (isModuleDisarmed) {
        setFeedbackMessage('MÓDULO DE FIOS DESARMADO');
        return;
    }
    const selectedRule = Math.ceil(Math.random() * 3); // 1, 2 ou 3
    setRule(selectedRule);
    const randomWires = generateWiresForRule(selectedRule);
    setWires(randomWires);
    setCutWires(Array(randomWires.length).fill(false));
    setFeedbackMessage('');
  }, [isModuleDisarmed]); // Reset se o jogo for reiniciado e o módulo não estiver mais desarmado


  const checkIfCorrect = (cutIndex) => {
    // Esta lógica de correção precisa ser robusta e alinhada com o manual do seu jogo.
    // O exemplo abaixo é uma simplificação baseada no seu switch original.
    let correctCut = false;
    switch (rule) {
      case 1: // Regra 1: Se o 3º fio for cortado (índice 2)
        correctCut = (cutIndex === 2);
        break;
      case 2: // Regra 2: Se o último fio for cortado
        correctCut = (cutIndex === wires.length - 1);
        break;
      case 3: // Regra 3: Se o 2º fio for cortado (índice 1)
        correctCut = (cutIndex === 1);
        break;
      default: // Se não houver regra definida, ou uma regra desconhecida
        correctCut = false; // Ou true, dependendo do comportamento desejado
    }

    if (correctCut) {
      setFeedbackMessage('MÓDULO DE FIOS DESARMADO!');
      disarmModule(MODULES.WIRES);
      // Marcar todos os fios como "cortados" visualmente ou apenas o correto
      // Aqui, vamos simular que o módulo foi resolvido e não permite mais cortes.
    } else {
      setFeedbackMessage('CORTE ERRADO! Penalidade aplicada.');
      registerError(MODULES.WIRES);
      // Opcional: resetar os fios cortados para permitir nova tentativa, ou manter o erro.
      // Se for apenas um erro e o jogador puder continuar tentando neste módulo:
      // const newCutWires = [...cutWires];
      // newCutWires[cutIndex] = false; // Desfaz o corte visualmente se for um erro que permite nova tentativa
      // setCutWires(newCutWires);
    }
  };
  
  const handleCutWire = (index) => {
    if (cutWires[index] || isModuleDisarmed) return;

    const newCutWires = [...cutWires];
    newCutWires[index] = true;
    setCutWires(newCutWires);

    checkIfCorrect(index);
  };


  const containerStyle = {
    backgroundColor: isModuleDisarmed ? '#3c3c3c' : '#2a2a2a', // Cor diferente se desarmado
    borderRadius: '15px',
    padding: '35px',
    boxShadow: '0 0 10px rgba(255, 50, 50, 0.2)',
    height: '100%',
    border: isModuleDisarmed ? '2px solid #4CAF50' : '2px solid transparent',
    transition: 'background-color 0.5s, border 0.5s',
  };

  const wiresRowStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '50px',
    padding: '50px 0',
    height: '100px',
    marginTop: '60px', // Ajustado para dar espaço ao título e feedback
  };

  const wireStyle = {
    width: '13px',
    height: '300px',
    cursor: isModuleDisarmed ? 'default' : 'pointer',
    borderRadius: '6px',
    transition: 'all 0.2s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
    position: 'relative',
  };

  const feedbackBoxStyle = {
    marginTop: '10px', // Ajustado
    marginBottom: '20px', // Espaço antes dos fios
    minHeight: '30px', // Para não colapsar
    width: 'auto',
    padding: '5px 15px',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: feedbackMessage.includes('DESARMADO') ? '#4CAF50' : feedbackMessage ? '#f44336' : 'transparent',
    boxShadow: feedbackMessage ? `0 0 10px ${feedbackMessage.includes('DESARMADO') ? '#4CAF50' : '#f44336'}` : 'none',
    transition: 'all 0.3s',
    opacity: feedbackMessage ? 1 : 0,
    textAlign: 'center',
  };
  
  const titleStyle = {
    margin: '0 0 15px',
    color: isModuleDisarmed ? '#4CAF50' : '#eee',
    fontSize: '1.2rem', // Aumentado
    textAlign: 'center',
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>
        {isModuleDisarmed ? "MÓDULO DE FIOS DESARMADO" : "MÓDULO DE FIOS"}
      </h3>
      <div style={feedbackBoxStyle}>{feedbackMessage && !isModuleDisarmed ? feedbackMessage : (isModuleDisarmed ? "DESARMADO COM SUCESSO" : "")}</div>


      <div style={wiresRowStyle}>
        {wires.map((color, index) => (
          <div
            key={index}
            style={{
              ...wireStyle,
              backgroundColor: color,
              opacity: cutWires[index] ? 0.3 : 1,
              transform: cutWires[index] ? 'scaleY(0.8) translateY(10%)' : 'scaleY(1)', // Efeito de fio cortado
              cursor: (isModuleDisarmed || cutWires[index]) ? 'default' : 'pointer',
            }}
            onMouseEnter={(e) => {
              if (!cutWires[index] && !isModuleDisarmed) {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = `0 0 15px ${color}`;
              }
            }}
            onMouseLeave={(e) => {
              if (!cutWires[index] && !isModuleDisarmed) {
                // Mantém o estado de corte se o fio foi cortado
                e.currentTarget.style.transform = cutWires[index] ? 'scaleY(0.8) translateY(10%)' : 'scaleY(1)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
              }
            }}
            onClick={() => handleCutWire(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default WiresSection;
