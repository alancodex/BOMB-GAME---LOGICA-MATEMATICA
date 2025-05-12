import { useState, useEffect } from "react";

const timerContainerStyle = {
  backgroundColor: '#2a2a2a',
  borderRadius: '15px',
  padding: '25px',
  boxShadow: '0 0 15px rgba(255, 50, 50, 0.3)',
  height: '100%'
};

const timerDisplayStyle = {
  backgroundColor: '#111',
  color: '#ff5555',
  fontFamily: '"Segment7Standard", monospace',
  fontSize: '3.5rem',
  padding: '20px',
  borderRadius: '10px',
  textAlign: 'center',
  margin: '15px 0',
  letterSpacing: '3px'
};

export default function BombTimer({ initialTime = 300 }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div style={timerContainerStyle}>
      <h2 style={{ margin: '0 0 10px', color: '#ddd' }}>TEMPO RESTANTE</h2>
      <div style={timerDisplayStyle}>{formatTime(timeLeft)}</div>
    </div>
  );
}