import React from 'react';
import BombAssembly from '../components/Bomb/BombAssembly';
import ManualSection from '../components/Manual/ManualSection';

const GamePage: React.FC = () => {
  return (
    <div style={{ // Estilo da página geral
      minHeight: '100vh',
      backgroundColor: '#1a1a1a',
      color: 'white',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <h1 style={{
        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
        textAlign: 'center',
        color: '#ff5555',
        margin: '10px 0 30px 0',
        textTransform: 'uppercase',
        letterSpacing: '2px',
      }}>
        Desarme a Bomba!
      </h1>

      {/* Este é o contêiner do grid. Dê a ele um ID ou classe para ser alvo do <style>. */}
      <div
        id="gameGridContainer" // Adicionado um ID para ser alvo
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '30px',
          width: '100%',
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 10px',
        }}
      >
        <style>
          {`
            @media (min-width: 900px) {
              #gameGridContainer { /* Alvo direto do contêiner do grid */
                grid-template-columns: 1fr 350px !important;
                gap: 40px !important;
              }
            }
          `}
        </style>

        <div style={{ display: 'contents' }}>
          <BombAssembly />
          <ManualSection />
        </div>
      </div>
    </div>
  );
};

export default GamePage;