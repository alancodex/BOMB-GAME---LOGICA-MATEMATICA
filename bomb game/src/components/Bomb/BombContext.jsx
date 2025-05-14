import { createContext, useState } from 'react';

export const BombContext = createContext();

export const BombProvider = ({ children }) => {
  const [timeLeft, setTimeLeft] = useState(300);
  const [cutWires, setCutWires] = useState([]);
  const [switchStates, setSwitchStates] = useState([false, false, false]);
  const [activeSymbol, setActiveSymbol] = useState('Δ');

  return (
    <BombContext.Provider value={{
      timeLeft,
      setTimeLeft,
      cutWires,
      setCutWires,
      switchStates,
      setSwitchStates,
      activeSymbol
    }}>
      {children}
    </BombContext.Provider>
  );
};