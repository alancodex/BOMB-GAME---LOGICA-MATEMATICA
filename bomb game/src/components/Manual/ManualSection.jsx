const ManualSection = () => {
  const paperStyle = {
    backgroundColor: '#f5f5dc',
    padding: '25px',
    borderRadius: '5px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
    border: '1px solid #d2b48c',
    fontFamily: '"Courier New", monospace',
    color: '#333',
    height: '800px',
    overflowY: 'auto',
    lineHeight: '1.6',
    fontSize: '18px',
    boxSizing: 'border-box', 
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

      <div style={sectionStyle}>
  <h4>REGRAS LÓGICAS PARA FIOS (Aplicadas na ordem em que a primeira verdadeira se aplicar):</h4>

  <div style={ruleStyle}>
    <p><strong>Caso 1:</strong></p>
    <p>P: Existe pelo menos 1 fio vermelho</p>
    <p>Q: O timer mostra número par</p>
    <p><code>P ∧ Q → Corte o 3º fio</code></p>
  </div>

  <div style={ruleStyle}>
    <p><strong>Caso 2:</strong></p>
    <p>P: Há fio branco</p>
    <p>Q: Há fio amarelo</p>
    <p><code>P ∧ Q → Corte o último fio</code></p>
  </div>

  <div style={ruleStyle}>
    <p><strong>Caso 3:</strong></p>
    <p>P: Existe mais de 1 fio azul</p>
    <p><code>P → Corte o 2º fio</code></p>
  </div>
</div>

{/* Seção de Interruptores */}
<div style={sectionStyle}>
  <h4>LÓGICA DOS INTERRUPTORES:</h4>

  <div style={ruleStyle}>
    <p><strong>Padrão Δ (Delta):</strong></p>
    <p>P: Símbolo é Δ</p>
    <p>Q: Interruptor 1 ativo</p>
    <p>R: Interruptor 3 ativo</p>
    <p><code>P → (Q ∧ R)</code></p>
  </div>

  <div style={ruleStyle}>
    <p><strong>Padrão Ω (Omega):</strong></p>
    <p>P: Símbolo é Ω</p>
    <p>Q: Todos os interruptores desligados</p>
    <p><code>P → Q</code></p>
  </div>

  <div style={ruleStyle}>
    <p><strong>Padrão ✛ (Cruz):</strong></p>
    <p>P: Símbolo diferente de Ω</p>
    <p>Q: Interruptor 2 ativo</p>
    <p><code>P → Q</code></p>
  </div>

  <div style={ruleStyle}>
    <p><strong>Padrão ◯ (Círculo):</strong></p>
    <p>P: Símbolo é ◯</p>
    <p>Q: Todos os interruptores ativos</p>
    <p><code>P → Q</code></p>
  </div>
</div>


      {/* Nova Seção: A Respeito da Memória */}
      <div style={sectionStyle}>
        <h4>MINIJOGO: A RESPEITO DA MEMÓRIA</h4>

        <div style={ruleStyle}>
          <p><strong>Estágio 1:</strong></p>
          <p>Se o número exibido for:</p>
          <ul>
            <li>1 → Pressione o botão na <strong>2ª posição</strong></li>
            <li>2 → Pressione o botão na <strong>2ª posição</strong></li>
            <li>3 → Pressione o botão na <strong>3ª posição</strong></li>
            <li>4 → Pressione o botão na <strong>4ª posição</strong></li>
          </ul>
        </div>

        <div style={ruleStyle}>
          <p><strong>Estágio 2:</strong></p>
          <p>Se o número exibido for:</p>
          <ul>
            <li>1 → Pressione o botão com o número <strong>"4"</strong></li>
            <li>2 → Pressione o botão na <strong>mesma posição</strong> que você pressionou no estágio 1</li>
            <li>3 → Pressione o botão na <strong>1ª posição</strong></li>
            <li>4 → Pressione o botão na <strong>mesma posição</strong> que você pressionou no estágio 1</li>
          </ul>
        </div>

        <p style={{ fontStyle: 'italic', marginTop: '10px' }}>
          <strong>Regras:</strong> Acertar avança para o próximo estágio. Errar reinicia do estágio 1.
        </p>
      </div>

      <div style={{ fontStyle: 'italic', marginTop: '20px' }}>
        <p>Legenda:</p>
        <p>∧ = AND (e)</p>
        <p>∨ = OR (ou)</p>
        <p>¬ = NOT (negação)</p>
        <p>→ = Então</p>
        <p>↔ = Bicondicional (se e somente se)</p>
      </div>
    </div>
  );
};

export default ManualSection;