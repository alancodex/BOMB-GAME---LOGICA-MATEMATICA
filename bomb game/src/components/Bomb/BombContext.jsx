import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

// Nomes dos módulos como constantes para evitar typos
export const MODULES = {
  WIRES: 'wires',
  SWITCHES: 'switches',
  BUTTONS: 'buttons',
};

const BombContext = createContext(null);

export const useBomb = () => {
  const context = useContext(BombContext);
  if (!context) {
    throw new Error('useBomb must be used within a BombProvider');
  }
  return context;
};

const INITIAL_TIME = 300; // 5 minutos em segundos
const PENALTY_TIME = 30; // Segundos de penalidade por erro

export const BombProvider = ({ children }) => {
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [gameState, setGameState] = useState('playing'); // 'playing', 'won', 'lost'
  const [solvedModules, setSolvedModules] = useState({
    [MODULES.WIRES]: false,
    [MODULES.SWITCHES]: false,
    [MODULES.BUTTONS]: false,
  });
  const [errors, setErrors] = useState(0);
  // const MAX_ERRORS = 3; // Opcional: limite de erros para perder o jogo

  // Lógica do contador regressivo principal
  useEffect(() => {
    if (gameState !== 'playing') {
      return; // Para o timer se o jogo não estiver em andamento
    }

    if (timeLeft <= 0) {
      setGameState('lost');
      return; // Para o timer e define como perdido
    }

    const timerId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId); // Limpa o intervalo ao desmontar ou quando as dependências mudam
  }, [timeLeft, gameState]);

  const disarmModule = useCallback((moduleName) => {
    // Só permite desarmar se o jogo estiver em andamento e o módulo não estiver resolvido
    if (gameState !== 'playing' || solvedModules[moduleName]) return;

    setSolvedModules(prev => {
      const newSolvedModules = { ...prev, [moduleName]: true };
      
      // Verifica condição de vitória
      const allSolved = Object.values(newSolvedModules).every(status => status === true);
      if (allSolved) {
        setGameState('won');
      }
      return newSolvedModules;
    });
  }, [solvedModules, gameState]);

  const registerError = useCallback((moduleName) => {
    if (gameState !== 'playing') return;
    
    setTimeLeft(prevTime => Math.max(0, prevTime - PENALTY_TIME)); // Aplica penalidade
    setErrors(prevErrors => {
      const newErrorCount = prevErrors + 1;
      // Opcional: Lógica de game over por excesso de erros
      // if (newErrorCount >= MAX_ERRORS) {
      //   setGameState('lost');
      // }
      console.log(`Error registered for module: ${moduleName}. Total errors: ${newErrorCount}. Time left: ${timeLeft - PENALTY_TIME}`);
      return newErrorCount;
    });
  }, [gameState, timeLeft]); // Adicionado timeLeft às dependências
  
  const restartGame = useCallback(() => {
    console.log("Restarting game...");
    setTimeLeft(INITIAL_TIME);
    setGameState('playing');
    setSolvedModules({
      [MODULES.WIRES]: false,
      [MODULES.SWITCHES]: false,
      [MODULES.BUTTONS]: false,
    });
    setErrors(0);
    // Os módulos individuais devem usar useEffect para resetar seu estado interno
    // quando solvedModules[MODULE_NAME] voltar para false ou gameState mudar para 'playing'
  }, []);

  return (
    <BombContext.Provider value={{
      timeLeft,
      // setTimeLeft, // Não expor setTimeLeft diretamente, o contexto gerencia
      gameState,
      // setGameState, // gameState é gerenciado internamente
      solvedModules,
      disarmModule,
      registerError,
      errors,
      restartGame,
      MODULES,
    }}>
      {children}
    </BombContext.Provider>
  );
};
