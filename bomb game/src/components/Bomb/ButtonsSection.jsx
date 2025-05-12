const buttonsContainerStyle = {
  backgroundColor: '#2a2a2a',
  borderRadius: '15px',
  padding: '25px',
  boxShadow: '0 0 15px rgba(255, 50, 50, 0.3)',
  height: '100%'
};

const buttonGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '15px',
  marginTop: '20px'
};

const buttonStyle = {
  padding: '15px',
  fontSize: '1.2rem',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s',
  fontWeight: 'bold'
};

const numberButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#444',
  color: 'white'
};

const disarmButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#ff5555',
  color: 'white',
  gridColumn: '1 / -1',
  fontSize: '1.3rem'
};

export default function ButtonsSection() {
  return (
    <div style={buttonsContainerStyle}>
      <h2 style={{ margin: '0 0 20px', color: '#ddd' }}>CONTROLES</h2>
      <div style={buttonGridStyle}>
        <button style={numberButtonStyle}>1</button>
        <button style={numberButtonStyle}>2</button>
        <button style={numberButtonStyle}>3</button>
        <button style={numberButtonStyle}>4</button>
        <button style={disarmButtonStyle}>DESARMAR BOMBA</button>
      </div>
    </div>
  );
}