import { BombProvider } from "./components/Bomb/BombContext"; // Caminho corrigido
import BombAssembly from "./components/Bomb/BombAssembly";
import ManualSection from "./components/Manual/ManualSection";

const App = () => {
  return (
    <BombProvider>
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#1a1a1a',
        color: 'white',
        padding: '20px'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          textAlign: 'center',
          color: '#ff5555',
          marginBottom: '30px'
        }}>
          💣 DESAFIO DA BOMBA
        </h1>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 350px',
          gap: '40px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <BombAssembly />
          <ManualSection />
        </div>
      </div>
    </BombProvider>
  );
};

export default App;