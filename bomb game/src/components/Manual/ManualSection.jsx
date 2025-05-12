const ManualSection = () => {
  const paperStyle = {
    backgroundColor: '#f5f5dc',
    padding: '25px',
    borderRadius: '5px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
    border: '1px solid #d2b48c',
    fontFamily: '"Courier New", monospace',
    color: '#333',
    height: '600px',
    overflowY: 'auto',
    lineHeight: '1.5'
  };

  const ruleStyle = {
    marginBottom: '15px',
    paddingBottom: '15px',
    borderBottom: '1px dashed #d2b48c'
  };

  const symbolStyle = {
    fontWeight: 'bold',
    color: '#8b4513'
  };

  return (
    <div style={paperStyle}>
      <h3 style={{ 
        borderBottom: '2px solid #d2b48c', 
        paddingBottom: '10px',
        textAlign: 'center'
      }}>
        📜 MANUAL DE DESARME (NÍVEL 3)
      </h3>

      {/* Seção de Fios */}
      <div style={ruleStyle}>
        <h4 style={{ color: '#8b4513' }}>REGRAS PARA FIOS:</h4>
        <ul style={{ paddingLeft: '20px' }}>
          <li>Se houver <span>vermelho</span> e <span >azul</span>, corte o <span >amarelo</span></li>
          <li>Se o <span >preto</span> estiver ao lado do <span >verde</span>, corte o <span >preto</span> primeiro</li>
          <li>Se não houver <span >amarelo</span>, corte o último fio</li>
          <li>Se todos os fios forem cores primárias, corte o <span >vermelho</span></li>
        </ul>
      </div>

      {/* Seção de Interruptores */}
      <div style={ruleStyle}>
        <h4 style={{ color: '#8b4513' }}>SÍMBOLOS DOS INTERRUPTORES:</h4>
        <ul style={{ paddingLeft: '20px' }}>
          <li><span style={symbolStyle}>Δ (Delta)</span>: Ative os interruptores 1 e 3</li>
          <li><span style={symbolStyle}>Ω (Omega)</span>: Todos desativados</li>
          <li><span style={symbolStyle}>✛ (Cruz)</span>: Ative apenas o interruptor 2</li>
          <li><span style={symbolStyle}>◯ (Círculo)</span>: Ative todos os interruptores</li>
        </ul>
        <p style={{ fontStyle: 'italic', marginTop: '10px' }}>
          O símbolo aparece aleatoriamente no painel da bomba
        </p>
      </div>

      {/* Seção de Botões */}
      <div style={ruleStyle}>
        <h4 style={{ color: '#8b4513' }}>SEQUÊNCIA DE BOTÕES:</h4>
        <ol style={{ paddingLeft: '20px' }}>
          <li>Pressione na ordem: 2 → 1 → 3 se o timer for maior que 60s</li>
          <li>Pressione na ordem: 3 → 2 → 1 se o timer for menor que 60s</li>
          <li>O botão vermelho só deve ser pressionado quando:
            <ul style={{ paddingLeft: '20px' }}>
              <li>Todos os fios estiverem cortados</li>
              <li>Os interruptores estiverem na posição correta</li>
            </ul>
          </li>
        </ol>
      </div>

      {/* Nota Final */}
      <div style={{ fontStyle: 'italic', marginTop: '20px' }}>
        <p>⚠️ A bomba explodirá se:</p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>Cortar o fio errado</li>
          <li>Pressionar o botão vermelho fora de ordem</li>
          <li>O tempo chegar a 0</li>
        </ul>
      </div>
    </div>
  );
};

export default ManualSection;