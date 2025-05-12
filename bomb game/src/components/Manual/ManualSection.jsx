const ManualSection = () => {
  const containerStyle = {
    width: '350px',
    height: '600px',
    overflowY: 'auto',
    paddingRight: '10px'
  };

  const paperStyle = {
    backgroundColor: '#f5f5dc',
    padding: '25px',
    borderRadius: '5px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
    border: '1px solid #d2b48c',
    fontFamily: '"Courier New", monospace',
    color: '#333',
    minHeight: '1000px' // Conteúdo maior que o container para forçar scroll
  };

  return (
    <div style={containerStyle}>
      <div style={paperStyle}>
        <h3 style={{ borderBottom: '2px solid #d2b48c', paddingBottom: '10px' }}>
          MANUAL DE DESARME
        </h3>
        
        {/* Conteúdo do Manual (exemplo) */}
        {[...Array(20)].map((_, i) => (
          <p key={i}>Regra {i+1}: Descrição da regra de desarme...</p>
        ))}
      </div>
    </div>
  );
};

export default ManualSection;