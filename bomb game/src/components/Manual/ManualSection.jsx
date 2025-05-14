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
    lineHeight: '1.6'
  };

  const sectionStyle = {
    marginBottom: '25px',
    paddingBottom: '15px',
    borderBottom: '1px dashed #d2b48c'
  };

  const ruleStyle = {
    margin: '15px 0',
    padding: '10px',
    backgroundColor: '#f0e6cc',
    borderRadius: '5px'
  };

  return (
    <div style={paperStyle}>
      <h3 style={{ textAlign: 'center', borderBottom: '2px solid #d2b48c', paddingBottom: '10px' }}>
        📜 MANUAL LÓGICO DE DESARME
      </h3>

      {/* Seção de Fios */}
      <div style={sectionStyle}>
        <h4>REGRAS LÓGICAS PARA FIOS:</h4>
        
        <div style={ruleStyle}>
          <p><strong>Regra 1 (Conjunção):</strong></p>
          <p>P: Existe pelo menos 1 fio vermelho</p>
          <p>Q: O timer mostra número par</p>
          <p><code>P ∧ Q → Corte o 3º fio</code></p>
        </div>

        <div style={ruleStyle}>
          <p><strong>Regra 2 (Disjunção):</strong></p>
          <p>P: Há fio preto</p>
          <p>Q: Há fio amarelo</p>
          <p><code>P ∨ Q → Corte o último fio</code></p>
        </div>

        <div style={ruleStyle}>
          <p><strong>Regra 3 (Negação):</strong></p>
          <p>P: Não há fios verdes</p>
          <p><code>¬P → Corte o primeiro fio</code></p>
        </div>
      </div>

      {/* Seção de Interruptores */}
      <div style={sectionStyle}>
        <h4>LÓGICA DOS INTERRUPTORES:</h4>
        
        <div style={ruleStyle}>
          <p><strong>Padrão Δ (Delta):</strong></p>
          <p>P: Interruptor 1 ativo</p>
          <p>Q: Interruptor 3 ativo</p>
          <p><code>P ↔ Q → Ambos devem ter o mesmo estado</code></p>
          <p><em>Configuração correta: Ativar 1° e 3° interruptores</em></p>
        </div>

        <div style={ruleStyle}>
          <p><strong>Padrão Ω (Omega):</strong></p>
          <p>P: Interruptor 1 desligado</p>
          <p>Q: Interruptor 2 desligado</p>
          <p>R: Interruptor 3 desligado</p>
          <p><code>¬P ∧ ¬Q ∧ ¬R → Todos devem estar desligados</code></p>
          <p><em>Configuração correta: Todos os interruptores desativados</em></p>
        </div>

        <div style={ruleStyle}>
          <p><strong>Padrão ✛ (Cruz):</strong></p>
          <p>P: Interruptor 2 ativo</p>
          <p>Q: Timer {'>'} 30s</p>
          <p><code>P ⊕ Q → Ative apenas se uma condição for verdadeira</code></p>
          <p><em>Configuração correta: Ativar apenas o 2° interruptor</em></p>
        </div>

        <div style={ruleStyle}>
          <p><strong>Padrão ◯ (Círculo):</strong></p>
          <p>P: Interruptor 1 ativo</p>
          <p>Q: Interruptor 2 ativo</p>
          <p>R: Interruptor 3 ativo</p>
          <p><code>P ∧ Q ∧ R → Todos devem estar ativados</code></p>
          <p><em>Configuração correta: Ativar todos os interruptores</em></p>
        </div>
      </div>

      {/* Seção de Botões */}
      <div style={sectionStyle}>
        <h4>ÁLGEBRA BOOLEANA PARA BOTÕES:</h4>
        
        <div style={ruleStyle}>
          <p><strong>Sequência Base:</strong></p>
          <p>P: Número de fios {'>'} 3</p>
          <p>Q: Tempo restante {'<'} 60s</p>
          <p><code>(P ∧ ¬Q) → 2-1-3</code></p>
          <p><code>(¬P ∨ Q) → 3-2-1</code></p>
        </div>

        <div style={ruleStyle}>
          <p><strong>Botão Vermelho:</strong></p>
          <p>P: Todos fios cortados corretamente</p>
          <p>Q: Interruptores configurados</p>
          <p><code>P ∧ Q → Pressione para desarmar</code></p>
        </div>
      </div>

      <div style={{ fontStyle: 'italic', marginTop: '20px' }}>
        <p>Legenda:</p>
        <p>∧ = AND (e)</p>
        <p>∨ = OR (ou)</p>
        <p>¬ = NOT (negação)</p>
        <p>⊕ = XOR (ou exclusivo)</p>
        <p>→ = Então</p>
        <p>↔ = Bicondicional (se e somente se)</p>
      </div>
    </div>
  );
};

export default ManualSection;