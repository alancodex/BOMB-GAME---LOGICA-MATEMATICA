import { useState, useEffect, useContext } from "react";
import { BombContext } from "./BombContext";

const BombTimer = () => {
  const { timeLeft, setTimeLeft } = useContext(BombContext);

  // Convertendo segundos para milissegundos para a contagem mais precisa
  const [totalMs, setTotalMs] = useState(timeLeft * 1000);

  useEffect(() => {
    setTotalMs(timeLeft * 1000);
  }, [timeLeft]);

  useEffect(() => {
    if (totalMs <= 0) {
      setTimeLeft(0);
      return;
    }

    const timer = setInterval(() => {
      setTotalMs((prev) => {
        const newTotal = prev - 10;
        if (newTotal <= 0) {
          clearInterval(timer);
          setTimeLeft(0);
          return 0;
        }
        setTimeLeft(Math.ceil(newTotal / 1000));
        return newTotal;
      });
    }, 10);

    return () => clearInterval(timer);
  }, [totalMs, setTimeLeft]);

  const minutes = Math.floor(totalMs / 60000);
  const seconds = Math.floor((totalMs % 60000) / 1000);
  const milliseconds = Math.floor((totalMs % 1000) / 10);

  const formatTime = () =>
    `0${minutes}:${seconds < 10 ? "0" : ""}${seconds}:${milliseconds < 10 ? "0" : ""}${milliseconds}`;

  const timerContainerStyle = {
    backgroundColor: '#2a2a2a',
    borderRadius: '15px',
    padding: '25px',
    boxShadow: '0 0 20px rgba(255, 50, 50, 0.3)',
    border: '2px solid #ff5555',
    textAlign: 'center'
  };

  const timerDisplayStyle = {
    backgroundColor: '#111',
    color: '#ff5555',
    fontFamily: '"Segment7Standard", monospace',
    fontSize: '3.5rem',
    padding: '50px',
    borderRadius: '10px',
    margin: '15px 0',
    letterSpacing: '3px'
  };

  return (
    <div style={timerContainerStyle}>
      <h2 style={{ margin: '0 0 10px', color: '#ddd' }}>TEMPO RESTANTE</h2>
      <div style={timerDisplayStyle}>{formatTime()}</div>
    </div>
  );
};

export default BombTimer;
