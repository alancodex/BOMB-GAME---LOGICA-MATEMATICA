import { useState, useEffect } from "react";

const BombTimer = ({ initialTime = 300 }) => {
  const [timeLeft, setTimeLeft] = useState({
    totalMs: initialTime * 1000,
    minutes: Math.floor(initialTime / 60),
    seconds: initialTime % 60,
    milliseconds: 0
  });

  useEffect(() => {
    if (timeLeft.totalMs <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newTotalMs = prev.totalMs - 10;
        return {
          totalMs: newTotalMs,
          minutes: Math.floor((newTotalMs / 1000) / 60),
          seconds: Math.floor((newTotalMs / 1000) % 60),
          milliseconds: Math.floor((newTotalMs % 1000) / 10)
        };
      });
    }, 10); // Atualiza a cada 10ms

    return () => clearInterval(timer);
  }, [timeLeft.totalMs]);

  const formatTime = () => {
    const { minutes, seconds, milliseconds } = timeLeft;
    return `0${minutes}:${seconds < 10 ? "0" : ""}${seconds}:${milliseconds < 10 ? "0" : ""}${milliseconds}`;
  };

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