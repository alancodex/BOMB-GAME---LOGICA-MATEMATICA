import { useState } from 'react';

const switchesContainerStyle = {
  backgroundColor: '#2a2a2a',
  borderRadius: '15px',
  padding: '25px',
  boxShadow: '0 0 15px rgba(255, 50, 50, 0.3)',
  height: '100%'
};

const switchItemStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '20px 0'
};

const switchLabelStyle = {
  color: '#ddd',
  fontSize: '1.1rem'
};

const switchToggleStyle = {
  width: '60px',
  height: '30px',
  borderRadius: '15px',
  position: 'relative',
  cursor: 'pointer',
  transition: 'all 0.3s'
};

const switchKnobStyle = {
  width: '26px',
  height: '26px',
  borderRadius: '50%',
  position: 'absolute',
  top: '2px',
  transition: 'all 0.3s'
};

export default function SwitchesSection() {
  const [switches, setSwitches] = useState([
    { id: 1, label: 'INTERRUPTOR A', on: false },
    { id: 2, label: 'INTERRUPTOR B', on: false },
    { id: 3, label: 'INTERRUPTOR C', on: false }
  ]);

  const toggleSwitch = (id) => {
    setSwitches(switches.map(sw => 
      sw.id === id ? { ...sw, on: !sw.on } : sw
    ));
  };

  return (
    <div style={switchesContainerStyle}>
      <h2 style={{ margin: '0 0 20px', color: '#ddd' }}>INTERRUPTORES</h2>
      {switches.map((sw) => (
        <div key={sw.id} style={switchItemStyle}>
          <span style={switchLabelStyle}>{sw.label}</span>
          <div 
            style={{ 
              ...switchToggleStyle,
              backgroundColor: sw.on ? '#4CAF50' : '#555'
            }}
            onClick={() => toggleSwitch(sw.id)}
          >
            <div 
              style={{ 
                ...switchKnobStyle,
                left: sw.on ? '32px' : '2px',
                backgroundColor: '#fff'
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}