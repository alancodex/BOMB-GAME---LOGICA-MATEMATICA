const WiresSection = () => {
  const wires = [
    '#ff5555',  // Vermelho
    '#5555ff',  // Azul
    '#55ff55',  // Verde
    '#ffff55',  // Amarelo
    '#333'      // Preto
  ];

  // Estilo do container principal
  const containerStyle = {
    backgroundColor: '#2a2a2a',
    borderRadius: '15px',
    padding: '35px',
    boxShadow: '0 0 10px rgba(255, 50, 50, 0.2)',
    height: '100%'
  };

  // Estilo da linha de fios
  const wiresRowStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '30px',
    padding: '50px 0',
    height: '100px' // Altura fixa para alinhamento
  };

  // Estilo individual de cada fio
  const wireStyle = {
    width: '13px',
    height: '150px',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'all 0.2s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
    position: 'relative',
    '&:hover': {
      transform: 'scale(1.1)',
      boxShadow: '0 0 10px currentColor'
    }
  };

  return (
    <div style={containerStyle}>
      <h3 style={{ 
        margin: '0 0 15px',
        color: '#eee',
        fontSize: '1rem',
        textAlign: 'center'
      }}>
        SELECIONE O FIO PARA CORTAR
      </h3>
      
      <div style={wiresRowStyle}>
        {wires.map((color, index) => (
          <div 
            key={index}
            style={{ 
              ...wireStyle,
              backgroundColor: color,
              '&:hover': {
                transform: 'scale(1.1)',
                boxShadow: `0 0 10px ${color}`
              }
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.boxShadow = `0 0 10px ${color}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
            }}
            onClick={() => console.log(`Cortou fio ${index + 1}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default WiresSection;